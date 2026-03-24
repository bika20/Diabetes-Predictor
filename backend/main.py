from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import DiabetesInput
from model import predict

app = FastAPI()

# 🔥 VERY IMPORTANT (frontend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Diabetes Prediction API running"}

@app.post("/predict")
def predict_diabetes(data: DiabetesInput):
    probability = predict(data)

    return {
        "probability": probability
    }