import joblib
import numpy as np

model = joblib.load("diabetesmodel/diabetes_pipeline.pkl")

def predict(data):
    input_data = np.array([[
        data.Pregnancies,
        data.Glucose,
        data.BloodPressure,
        data.SkinThickness,
        data.Insulin,
        data.BMI,
        data.DiabetesPedigreeFunction,
        data.Age
    ]])

    probability = model.predict_proba(input_data)[0][1]
    return probability