import io
import base64
import cv2
import numpy as np
import tensorflow as tf

from PIL import Image
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware


# ==========================================
# FastAPI App
# ==========================================

app = FastAPI(
    title="Brain Tumor Detection API",
    description="MRI Brain Tumor Classification using EfficientNetB0",
    version="1.0.0"
)


# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# Model Configuration
# ==========================================

MODEL_PATH = "models/brain_tumor_model.keras"

IMAGE_SIZE = (224, 224)

CLASS_NAMES = [
    "glioma",
    "meningioma",
    "notumor",
    "pituitary"
]


# ==========================================
# Load Model Once
# ==========================================

print("Loading brain tumor model...")

model = tf.keras.models.load_model(MODEL_PATH)

print("Model loaded successfully.")

# ==========================================
# Grad-CAM Configuration
# ==========================================

preprocessing_layer = model.get_layer("sequential")
base_model = model.get_layer("efficientnetb0")
last_conv_layer = base_model.get_layer("top_activation")

preprocessing_model = tf.keras.Model(
    inputs=model.inputs,
    outputs=preprocessing_layer.output,
)

grad_model = tf.keras.Model(
    inputs=base_model.inputs,
    outputs=[
        last_conv_layer.output,
        base_model.output,
    ],
)

pooling_layer = model.get_layer("global_average_pooling2d")
dropout_layer = model.get_layer("dropout")
classifier_layer = model.get_layer("dense")

print("Grad-CAM initialized successfully.")


# ==========================================
# Home Route
# ==========================================

@app.get("/")
def home():

    return {
        "message": "Brain Tumor Detection API is running"
    }


# ==========================================
# Health Check
# ==========================================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "model_loaded": True
    }


# ==========================================
# Prediction Route
# ==========================================

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    # Check file type
    if file.content_type not in [
        "image/jpeg",
        "image/jpg",
        "image/png"
    ]:

        raise HTTPException(
            status_code=400,
            detail="Only JPG, JPEG and PNG images are allowed."
        )


    try:

        # Read uploaded image
        image_bytes = await file.read()

        img = Image.open(
            io.BytesIO(image_bytes)
        ).convert("RGB")


        # Resize
        img = img.resize(
            IMAGE_SIZE
        )


        # Convert image to array
        img_array = np.array(
            img,
            dtype=np.float32
        )


        # Add batch dimension
        img_array = np.expand_dims(
            img_array,
            axis=0
        )


        # ==================================
        # Model Prediction
        # ==================================

        predictions = model.predict(
            img_array,
            verbose=0
        )[0]


        predicted_index = int(
            np.argmax(predictions)
        )


        predicted_class = CLASS_NAMES[
            predicted_index
        ]


        confidence = float(
            predictions[predicted_index] * 100
        )


        # ==================================
        # All Class Probabilities
        # ==================================

        probabilities = {}

        for class_name, probability in zip(
            CLASS_NAMES,
            predictions
        ):

            probabilities[class_name] = round(
                float(probability * 100),
                2
            )


        # ==================================
        # API Response
        # ==================================

        return {

            "prediction": predicted_class,

            "confidence": round(
                confidence,
                2
            ),

            "probabilities": probabilities
        }


    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(error)}"
        )

        # ==========================================
# Prediction + Grad-CAM Route
# ==========================================

@app.post("/predict-with-gradcam")
async def predict_with_gradcam(file: UploadFile = File(...)):

    if file.content_type not in [
        "image/jpeg",
        "image/jpg",
        "image/png",
    ]:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, JPEG and PNG images are allowed.",
        )

    try:
        # Read and preprocess uploaded image
        image_bytes = await file.read()

        img = Image.open(
            io.BytesIO(image_bytes)
        ).convert("RGB")

        img = img.resize(IMAGE_SIZE)

        img_array = np.array(
            img,
            dtype=np.float32,
        )

        img_batch = np.expand_dims(
            img_array,
            axis=0,
        )

        # Apply the original model preprocessing
        processed_batch = preprocessing_model(
            img_batch,
            training=False,
        )

        # Generate predictions and feature maps
        with tf.GradientTape() as tape:

            feature_maps, backbone_output = grad_model(
                processed_batch,
                training=False,
            )

            x = pooling_layer(backbone_output)
            x = dropout_layer(x, training=False)
            predictions_tensor = classifier_layer(x)

            predicted_index = int(
                tf.argmax(predictions_tensor[0]).numpy()
            )

            class_score = predictions_tensor[:, predicted_index]

        # Calculate Grad-CAM gradients
        gradients = tape.gradient(
            class_score,
            feature_maps,
        )

        if gradients is None:
            raise RuntimeError("Grad-CAM gradients are unavailable.")

        weights = tf.reduce_mean(
            gradients,
            axis=(1, 2),
        )

        feature_maps = feature_maps[0]
        weights = weights[0]

        cam = tf.reduce_sum(
            feature_maps * weights[tf.newaxis, tf.newaxis, :],
            axis=-1,
        )

        cam = tf.maximum(cam, 0)

        max_value = tf.reduce_max(cam)

        heatmap = tf.cond(
            max_value > 0,
            lambda: cam / max_value,
            lambda: tf.zeros_like(cam),
        )

        heatmap = cv2.resize(
            heatmap.numpy(),
            IMAGE_SIZE,
            interpolation=cv2.INTER_LINEAR,
        )

        heatmap = np.clip(
            heatmap,
            0.0,
            1.0,
        )

        # Create colored heatmap and overlay
        original_bgr = cv2.cvtColor(
            np.array(img),
            cv2.COLOR_RGB2BGR,
        )

        heatmap_color = cv2.applyColorMap(
            np.uint8(heatmap * 255),
            cv2.COLORMAP_JET,
        )

        overlay = cv2.addWeighted(
            original_bgr,
            0.60,
            heatmap_color,
            0.40,
            0,
        )

        # Encode images as Base64 for the frontend
        def encode_image(image):
            success, buffer = cv2.imencode(".jpg", image)

            if not success:
                raise RuntimeError("Could not encode visualization.")

            encoded = base64.b64encode(
                buffer.tobytes()
            ).decode("utf-8")

            return "data:image/jpeg;base64," + encoded

        probabilities_array = predictions_tensor[0].numpy()

        probabilities = {
            name: round(float(probability * 100), 2)
            for name, probability in zip(
                CLASS_NAMES,
                probabilities_array,
            )
        }

        return {
            "prediction": CLASS_NAMES[predicted_index],
            "confidence": probabilities[CLASS_NAMES[predicted_index]],
            "probabilities": probabilities,
            "original_image": encode_image(original_bgr),
            "heatmap_image": encode_image(heatmap_color),
            "overlay_image": encode_image(overlay),
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction with Grad-CAM failed: {str(error)}",
        )