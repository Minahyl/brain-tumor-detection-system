import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image


# =========================
# Model Load
# =========================

MODEL_PATH = "models/brain_tumor_model.keras"


model = tf.keras.models.load_model(
    MODEL_PATH
)


# =========================
# Classes
# =========================

class_names = [
    "glioma",
    "meningioma",
    "notumor",
    "pituitary"
]


# =========================
# Image Prediction
# =========================

def predict_image(img_path):

    img = image.load_img(
        img_path,
        target_size=(224,224)
    )


    img_array = image.img_to_array(
        img
    )


    img_array = np.expand_dims(
        img_array,
        axis=0
    )


    prediction = model.predict(
        img_array
    )


    predicted_index = np.argmax(
        prediction
    )


    confidence = np.max(
        prediction
    )


    result = class_names[predicted_index]


    print("\nPrediction:")
    print(result)


    print("\nConfidence:")
    print(
        confidence * 100,
        "%"
    )


    print("\nProbabilities:")

    for cls, prob in zip(
        class_names,
        prediction[0]
    ):
        print(
            cls,
            ":",
            round(prob*100,2),
            "%"
        )



# =========================
# Test Image
# =========================


predict_image(
    "test_image.jpg"
)