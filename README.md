# NDIS Compliance Tool 🛡️

A full-stack web application built to help NDIS service providers generate a **Participant Rights Policy** dynamically based on user inputs.

## ✨ Features

- Simple form to collect provider details (Name, Email, Service Type)
- Validates input before submission
- Generates a tailored Participant Rights Policy using the **Google Gemini API**
- Stores submitted data securely in **Firebase Firestore**
- Fully responsive and deployed live on Render

## 🚀 Live Demo

👉 [Click here to use the app](https://ndis-compliance-tool.onrender.com)

## 🛠️ Tech Stack

### Frontend
- **React** (with Vite)
- **Axios** for API calls
- **Form validation** using built-in logic

### Backend
- **Flask** (Python)
- **Google Generative AI (Gemini API)** for policy generation
- **Firebase Admin SDK** for saving data to Firestore
- **CORS** and environment configuration for secure communication

## 🔧 Installation

### Clone the repository

```bash
git clone https://github.com/harshit0101s/NDIS_Compliance_Tool.git
cd NDIS_Compliance_Tool

