import io

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