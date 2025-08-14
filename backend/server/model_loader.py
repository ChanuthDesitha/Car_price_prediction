import joblib

MODEL_PATH = "models/random_forest_model.pkl"
ENCODERS_PATH = "models/encoders.pkl"

def load_model():
    return joblib.load(MODEL_PATH)

def load_encoders():
    return joblib.load(ENCODERS_PATH)