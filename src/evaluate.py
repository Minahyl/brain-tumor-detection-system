import tensorflow as tf
import numpy as np

from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score

import matplotlib.pyplot as plt
import seaborn as sns


# =========================
# Test Dataset
# =========================

TEST_DIR = "dataset/Testing"

IMAGE_SIZE = (224,224)

BATCH_SIZE = 16



test_dataset = tf.keras.utils.image_dataset_from_directory(
    TEST_DIR,
    image_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=False
)



# Class names

class_names = test_dataset.class_names


print("\nClasses:")
print(class_names)



# =========================
# Load Trained Model
# =========================


model = tf.keras.models.load_model(
    "models/brain_tumor_model.keras"
)


print("\nModel loaded successfully")



# =========================
# Predictions
# =========================


y_true = []
y_pred = []


for images, labels in test_dataset:

    predictions = model.predict(images)

    predicted_labels = np.argmax(
        predictions,
        axis=1
    )


    y_true.extend(
        labels.numpy()
    )


    y_pred.extend(
        predicted_labels
    )



# Convert list to numpy

y_true = np.array(y_true)

y_pred = np.array(y_pred)



# =========================
# Accuracy
# =========================


accuracy = accuracy_score(
    y_true,
    y_pred
)


print("\nTest Accuracy:")
print(accuracy)



# =========================
# Classification Report
# =========================


print("\nClassification Report:\n")


print(
    classification_report(
        y_true,
        y_pred,
        target_names=class_names
    )
)



# =========================
# Confusion Matrix
# =========================


cm = confusion_matrix(
    y_true,
    y_pred
)


print("\nConfusion Matrix:")
print(cm)



# =========================
# Plot Confusion Matrix
# =========================


plt.figure(figsize=(8,6))


sns.heatmap(
    cm,
    annot=True,
    fmt="d",
    xticklabels=class_names,
    yticklabels=class_names
)


plt.xlabel("Predicted")

plt.ylabel("Actual")

plt.title("Brain Tumor Classification Confusion Matrix")


plt.show()