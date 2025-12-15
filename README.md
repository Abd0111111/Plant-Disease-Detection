# 🌱 Plant Disease Detection System

An end-to-end Machine Learning project for detecting plant diseases from leaf images using Deep Learning.  
The system includes data preprocessing, model training, evaluation, and a user-friendly web application.

---

## 📌 Project Overview

Plant diseases significantly affect agricultural productivity.  
This project aims to build a **complete AI-powered solution** that allows users to upload a plant leaf image and receive:

- Disease prediction
- Severity estimation
- Treatment recommendations

The system is designed as a **production-ready application**, not just a research experiment.

---

## 🧠 Machine Learning Pipeline

### 1️⃣ Data Pipeline
- Dataset: **PlantVillage**
- Data loading and cleaning
- Stratified split into:
  - Training
  - Validation
  - Testing

### 2️⃣ Exploratory Data Analysis (EDA)
- Class distribution analysis
- Visualization of label imbalance
- Sample image inspection
- Image size distribution

(See `ml/eda.ipynb`)

---

### 3️⃣ Baseline Model
- Feature extraction using **MobileNetV2**
- Classifier: **Logistic Regression**
- Metrics:
  - Accuracy
  - F1-score (Macro)

---

### 4️⃣ Deep Learning Model
- Transfer Learning using **MobileNetV2**
- Fine-tuned classification head
- Optimizer: Adam
- Loss: Categorical Cross-Entropy

---

### 5️⃣ Model Evaluation
- Classification Report
- Confusion Matrix
- Validation accuracy monitoring

---

## 🌡️ Severity Detection
Severity is estimated by analyzing infected regions in the leaf image using color-based segmentation:

- Mild
- Moderate
- Severe

---

## 💊 Treatment Recommendation
Each disease has predefined treatment strategies based on severity level:
- Mild → Preventive actions
- Moderate → Fungicides / treatments
- Severe → Pruning or systemic treatment

---

## 🌐 Web Application

### Features:
- Image upload
- Real-time prediction
- Severity & treatment display
- Clean and responsive UI

### Backend:
- **FastAPI**
- REST API endpoint: `/predict`

### Frontend:
- HTML
- CSS
- JavaScript

---

## 🚀 Deployment & MLOps

- Dockerized backend
- API exposed for production use
- Ready for cloud deployment (Render / Railway / AWS)

---

## 📂 Project Structure

