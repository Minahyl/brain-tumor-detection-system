# 🧠 NeuroScanAI — Brain Tumor Classification System

NeuroScanAI is an AI-powered brain MRI classification system that uses a deep learning model to classify MRI scans into different brain tumor categories. The application provides a modern web dashboard where users can upload an MRI image and receive the predicted tumor type along with class probabilities.

> ⚠️ **Medical Disclaimer:** This project is developed for educational and research purposes only. It is not intended to provide medical diagnosis or replace professional medical advice.

Dataset: The model was trained using a brain MRI tumor classification dataset obtained from Kaggle. The dataset is not included in this repository.

## ✨ Features

- Upload brain MRI images in PNG/JPG format
- Brain tumor classification using **EfficientNetB0**
- Softmax-based class probabilities
- Displays predicted tumor type and confidence
- Interactive probability visualization
- FastAPI backend for model inference
- Next.js responsive frontend
- Modern dark dashboard built with Tailwind CSS

## 🧬 Supported Classes

The model classifies MRI images into four categories:

- **Glioma**
- **Meningioma**
- **Pituitary**
- **NoTumor**

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend | Python, FastAPI, Uvicorn |
| Machine Learning | TensorFlow / Keras, EfficientNetB0 |
| Image Processing | Pillow, NumPy |
| Model Output | Softmax Classification |
| Dataset | Brain MRI Tumor Dataset from Kaggle |
| API Communication | REST API |

## 🔄 How It Works

```text
MRI Image Upload
       ↓
Next.js + TypeScript Frontend
       ↓
FastAPI Backend
       ↓
Image Preprocessing
       ↓
EfficientNetB0 Model
       ↓
Softmax Probabilities
       ↓
Tumor Class + Confidence
       ↓
Result Displayed in Dashboard
```

## 📊 Example Result

After uploading an MRI scan and running the neural diagnosis, the dashboard displays the predicted tumor class and probability for each supported class.

For example:

```text
Detected Tumor: Pituitary
Confidence: 99.53%

Glioma      0.06%
Meningioma  0.37%
NoTumor     0.04%
Pituitary   99.53%
```

### 🖥️ Application Preview

![NeuroScanAI Result](screenshots/output.png)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <repo>
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
```

Windows PowerShell:

```powershell
venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the FastAPI server:

```bash
uvicorn main:app --reload
```
```

### 3. Frontend Setup

Open another terminal and navigate to the frontend folder:

```bash
cd frontend
npm install
npm run dev
```

```

## 📁 Project Structure

```text
brain-tumor-detection/
├── backend/
│   ├── main.py
│   └── ...
├── frontend/
│   ├── app/
│   ├── components/
│   └── ...
├── screenshots/
│   └── output.png
├── requirements.txt
└── README.md
```

## 📌 Project Status

**Completed Working Prototype** — The system supports MRI image upload, AI-based classification, probability visualization, and result display through a web interface.

## 👩‍💻 Author

**Minahil Shah**
