import pandas as pd
import numpy as np

from sklearn.preprocessing import LabelEncoder

def preprocess_runing(df):
    def convert(value):
        value = value.lower().replace(',', '').strip()
        if 'km' in value:
            return float(value.replace('km', '').strip())
        elif 'miles' in value:
            miles = float(value.replace('miles', '').strip())
            return round(miles * 1.60934, 2)
        return np.nan
    df['running'] = df['running'].apply(convert)
    return df

def car_age(df):
    df['car_age'] = 2023 - df['year'].astype(int)
    return df

def covert_to_float(df):
    df['motor_volume'] = pd.to_numeric(df['motor_volume'], errors='coerce')
    return df

def encode_categorical(df):
    encoders = {}
    lable_encoder = LabelEncoder()
    categorical_columns = ['model', 'motor_type', 'wheel', 'color', 'type', 'status']
    for column in categorical_columns:
        df[column] = lable_encoder.fit_transform(df[column].astype(str))
        encoders[column] = lable_encoder
    return df, encoders

def preprocess(df, isTraining=True):
    df = preprocess_runing(df)
    df = car_age(df)
    df = covert_to_float(df)
    
    # df, encoders = encode_categorical(df)
    if isTraining:
        df, encoders = encode_categorical(df)
        df.dropna(inplace=True)
        return df, encoders
    