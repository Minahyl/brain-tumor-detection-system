import os

import tensorflow as tf

from tensorflow.keras import layers
from tensorflow.keras import models

from tensorflow.keras.applications import EfficientNetB0

from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.callbacks import ModelCheckpoint


# =========================
# Dataset paths
# =========================

TRAIN_DIR = "dataset/Training"
TEST_DIR = "dataset/Testing"


# =========================
# Image configuration
# =========================

IMAGE_SIZE = (224, 224)

BATCH_SIZE = 16

SEED = 42


# =========================
# Load training dataset
# =========================

train_dataset = tf.keras.utils.image_dataset_from_directory(
    TRAIN_DIR,
    image_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    seed=SEED,
    validation_split=0.2,
    subset="training"
)


# =========================
# Load validation dataset
# =========================

validation_dataset = tf.keras.utils.image_dataset_from_directory(
    TRAIN_DIR,
    image_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    seed=SEED,
    validation_split=0.2,
    subset="validation"
)


# =========================
# Load testing dataset
# =========================

test_dataset = tf.keras.utils.image_dataset_from_directory(
    TEST_DIR,
    image_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=False
)


# =========================
# Classes
# =========================

class_names = train_dataset.class_names

print("\nClasses:")
print(class_names)



# =========================
# Performance optimization
# =========================

AUTOTUNE = tf.data.AUTOTUNE


train_dataset = train_dataset.prefetch(
    buffer_size=AUTOTUNE
)

validation_dataset = validation_dataset.prefetch(
    buffer_size=AUTOTUNE
)

test_dataset = test_dataset.prefetch(
    buffer_size=AUTOTUNE
)



# =========================
# Data Augmentation
# =========================

data_augmentation = tf.keras.Sequential(
    [
        layers.RandomFlip("horizontal"),
        layers.RandomRotation(0.05),
        layers.RandomZoom(0.1)
    ]
)



# =========================
# EfficientNetB0 Transfer Learning
# =========================

base_model = EfficientNetB0(
    include_top=False,
    weights="imagenet",
    input_shape=(224,224,3)
)


# Freeze pretrained layers

base_model.trainable = False



# =========================
# Build Model
# =========================

inputs = layers.Input(
    shape=(224,224,3)
)


x = data_augmentation(inputs)


x = base_model(
    x,
    training=False
)


x = layers.GlobalAveragePooling2D()(x)


x = layers.Dropout(0.3)(x)


outputs = layers.Dense(
    len(class_names),
    activation="softmax"
)(x)



model = models.Model(
    inputs=inputs,
    outputs=outputs
)



# =========================
# Compile Model
# =========================

model.compile(
    optimizer=tf.keras.optimizers.Adam(
        learning_rate=0.001
    ),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)



model.summary()



# =========================
# Create model folder
# =========================

os.makedirs(
    "models",
    exist_ok=True
)



# =========================
# Callbacks
# =========================


# Save best accuracy model

checkpoint = ModelCheckpoint(
    "models/brain_tumor_model.keras",
    monitor="val_accuracy",
    save_best_only=True,
    mode="max"
)



# Stop if learning stops improving

early_stopping = EarlyStopping(
    monitor="val_loss",
    patience=3,
    restore_best_weights=True
)



# =========================
# Training
# =========================

history = model.fit(
    train_dataset,
    validation_data=validation_dataset,
    epochs=8,
    callbacks=[
        checkpoint,
        early_stopping
    ]
)



# =========================
# Evaluation
# =========================

test_loss, test_accuracy = model.evaluate(
    test_dataset
)


print("\nTest Accuracy:")
print(test_accuracy)



print("\nTraining completed.")

print(
    "\nModel saved at:"
    " models/brain_tumor_model.keras"
)