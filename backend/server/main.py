from fastapi import FastAPI
from pydantic import BaseModel
from server.prepare_data import prepare_input_data
from server.model_loader import load_model
from fastapi.middleware.cors import CORSMiddleware
import traceback

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = load_model()

class CarFeatures(BaseModel):
    model: str
    motor_type: str
    wheel: str
    color: str
    type: str
    status: str
    motor_volume: float
    running: str
    year: int

@app.post("/predict")
def predict_price(car: CarFeatures):
    try:
        input_df = prepare_input_data(car.model_dump())

        prediction = model.predict(input_df)[0]

        return {"predicted_price": int(round(prediction))}
    
    except Exception as e:
        traceback.print_exc()
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    print("---Starting FastAPI server---")
    uvicorn.run("server.main:app", host="127.0.0.1", port=8000, reload=True)
