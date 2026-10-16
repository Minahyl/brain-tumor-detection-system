
from pathlib import Path

import cv2
import numpy as np
import tensorflow as tf
from PIL import Image


# ==========================================
# Configuration
# ==========================================

PROJECT_ROOT = Path(__file__).resolve().parent.parent

MODEL_PATH = PROJECT_ROOT / "models" / "brain_tumor_model.keras"

IMAGE_SIZE = (224, 224)

CLASS_NAMES = [
    "glioma",
    "meningioma",
    "notumor",
    "pituitary",
]


# ==========================================
# Load Existing Model
# ==========================================

model = tf.keras.models.load_model(MODEL_PATH)

# Original preprocessing layer in the saved model
preprocessing_layer = model.get_layer("sequential")

# EfficientNetB0 backbone
base_model = model.get_layer("efficientnetb0")

# Last convolutional feature map
last_conv_layer = base_model.get_layer("top_activation")

# Get the model output after the original preprocessing
preprocessing_model = tf.keras.Model(
    inputs=model.inputs,
    outputs=preprocessing_layer.output,
)

# Get feature maps and backbone output from the same graph
grad_model = tf.keras.Model(
    inputs=base_model.inputs,
    outputs=[
        last_conv_layer.output,
        base_model.output,
    ],
)

# Existing classification head
pooling_layer = model.get_layer("global_average_pooling2d")
dropout_layer = model.get_layer("dropout")
classifier_layer = model.get_layer("dense")


# ==========================================
# Image Preprocessing
# ==========================================

def preprocess_image(image_path):
    """
    Load and preprocess an image using the same
    RGB, 224x224, float32 pipeline as the existing API.
    """

    image = Image.open(image_path).convert("RGB")
    image = image.resize(IMAGE_SIZE)

    image_array = np.array(
        image,
        dtype=np.float32,
    )

    image_batch = np.expand_dims(
        image_array,
        axis=0,
    )

    return image, image_batch


# ==========================================
# Grad-CAM Generation
# ==========================================

def generate_gradcam(image_path):
    """
    Generate a Grad-CAM heatmap for an MRI image.

    Returns:
        image: resized RGB PIL image
        heatmap: normalized 224x224 heatmap
        predicted_class: predicted class name
        confidence: predicted class probability
        probabilities: probabilities for all classes
    """

    image, image_batch = preprocess_image(image_path)

    # Apply the model's original preprocessing layer
    processed_batch = preprocessing_model(
        image_batch,
        training=False,
    )

    # Calculate gradients for the predicted class
    with tf.GradientTape() as tape:

        feature_maps, backbone_output = grad_model(
            processed_batch,
            training=False,
        )

        # Run the original classification head
        x = pooling_layer(backbone_output)
        x = dropout_layer(x, training=False)
        predictions = classifier_layer(x)

        predicted_index = int(
            tf.argmax(predictions[0]).numpy()
        )

        class_score = predictions[:, predicted_index]

    # Gradients of class score with respect to feature maps
    gradients = tape.gradient(
        class_score,
        feature_maps,
    )

    if gradients is None:
        raise RuntimeError(
            "Grad-CAM gradients are unavailable. "
            "Check the model architecture."
        )

    # Average gradients over height and width
    weights = tf.reduce_mean(
        gradients,
        axis=(1, 2),
    )

    # Remove batch dimension
    feature_maps = feature_maps[0]
    weights = weights[0]

    # Weighted sum of feature maps
    cam = tf.reduce_sum(
        feature_maps * weights[tf.newaxis, tf.newaxis, :],
        axis=-1,
    )

    # Keep positive activations
    cam = tf.maximum(cam, 0)

    # Normalize heatmap to the range 0-1
    max_value = tf.reduce_max(cam)

    heatmap = tf.cond(
        max_value > 0,
        lambda: cam / max_value,
        lambda: tf.zeros_like(cam),
    )

    # Resize heatmap to match the input image
    heatmap = cv2.resize(
        heatmap.numpy(),
        IMAGE_SIZE,
        interpolation=cv2.INTER_LINEAR,
    )

    # Ensure values remain between 0 and 1
    heatmap = np.clip(
        heatmap,
        0.0,
        1.0,
    ).astype(np.float32)

    probabilities = predictions[0].numpy()

    return {
        "image": image,
        "heatmap": heatmap,
        "predicted_class": CLASS_NAMES[predicted_index],
        "confidence": float(probabilities[predicted_index]),
        "probabilities": {
            name: float(probability)
            for name, probability in zip(
                CLASS_NAMES,
                probabilities,
            )
        },
    }



# ==========================================
# Run Grad-CAM and Save Visual Results
# ==========================================

if __name__ == "__main__":

    test_image = PROJECT_ROOT / "test_image.jpg"

    output_dir = PROJECT_ROOT / "outputs"
    output_dir.mkdir(parents=True, exist_ok=True)

    if not test_image.exists():
        raise FileNotFoundError(
            f"Test image not found: {test_image}"
        )

    result = generate_gradcam(str(test_image))

    # Original MRI image in RGB format
    original_rgb = np.array(result["image"])

    # OpenCV uses BGR format for saving and color maps
    original_bgr = cv2.cvtColor(
        original_rgb,
        cv2.COLOR_RGB2BGR,
    )

    # Convert normalized heatmap to 8-bit grayscale
    heatmap_uint8 = np.uint8(
        np.clip(result["heatmap"], 0, 1) * 255
    )

    # Apply a color map to the heatmap
    heatmap_color = cv2.applyColorMap(
        heatmap_uint8,
        cv2.COLORMAP_JET,
    )

    # Overlay heatmap on the original MRI
    overlay = cv2.addWeighted(
        original_bgr,
        0.60,
        heatmap_color,
        0.40,
        0,
    )

    # Save all three visualizations
    original_path = output_dir / "original_mri.jpg"
    heatmap_path = output_dir / "gradcam_heatmap.jpg"
    overlay_path = output_dir / "gradcam_overlay.jpg"

    cv2.imwrite(str(original_path), original_bgr)
    cv2.imwrite(str(heatmap_path), heatmap_color)
    cv2.imwrite(str(overlay_path), overlay)

    print("\nGrad-CAM visualization completed!")
    print("Predicted class:", result["predicted_class"])
    print(
        "Confidence:",
        round(result["confidence"] * 100, 2),
        "%",
    )
    print("Heatmap shape:", result["heatmap"].shape)

    print("\nSaved images:")
    print(original_path)
    print(heatmap_path)
    print(overlay_path)
