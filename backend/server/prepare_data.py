import pandas as pd
import numpy as np
from server.model_loader import load_encoders

encoders = load_encoders()
features = ['model', 'motor_type', 'wheel', 'color', 'type', 'status', 'motor_volume', 'running_km', 'car_age']

def clean_running(df, column_name='running'):
    def convert(val):
        val = val.lower().replace(',', '').strip()
        if 'km' in val:
            return float(val.replace('km', '').strip())
        elif 'miles' in val:
            miles = float(val.replace('miles', '').strip())
            return round(miles * 1.60934, 2)
        return np.nan
    
    df['running_km'] = df[column_name].apply(convert)
    return df

def add_car_age(df, year_col='year', current_year=2025):
    df['car_age'] = current_year - df[year_col].astype(int)
    return df

def convert_to_numeric(df):
    df['motor_volume'] = pd.to_numeric(df['motor_volume'], errors='coerce')
    return df
    
def encode_categoricals(df):
    for col, le in encoders.items():
        if col in df.columns:
            df[col] = df[col].map(lambda x: le.transform([x])[0] if x in le.classes_ else -1)
    return df

def prepare_input_data(data_dict):
    df = pd.DataFrame([data_dict])

    df = clean_running(df)
    df = add_car_age(df)
    df = convert_to_numeric(df)
    df = encode_categoricals(df)
    
    df = df[features]

    return df