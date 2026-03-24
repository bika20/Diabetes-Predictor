import joblib
import numpy as np

# Load model once
model = joblib.load("diabetesmodel/diabetes_pipeline.pkl")

def predict(data):
    input_data = np.array([[
        data.pregnancies,
        data.glucose,
        data.bloodPressure,
        data.skinThickness,
        data.insulin,
        data.bmi,
        data.dpf,
        data.age
    ]])

    probability = model.predict_proba(input_data)[0][1]
    return probability