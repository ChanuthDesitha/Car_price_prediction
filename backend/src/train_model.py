import pandas as pd
import os
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import root_mean_squared_error, mean_absolute_error, r2_score

from preprocessing import preprocess

train_df = pd.read_csv('./data/train.csv')

clean_df, encoders = preprocess(train_df, isTraining=True)
fecatures = ['model', 'motor_type', 'wheel', 'color', 'type', 'status', 'running', 'motor_volume', 'car_age']
target = 'price'
X = clean_df[fecatures]
y = clean_df[target]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
random_forest_model = RandomForestRegressor(n_estimators=100, random_state=42)
random_forest_model.fit(X_train, y_train)

os.makedirs('./models', exist_ok=True)
joblib.dump(random_forest_model, './models/random_forest_model.pkl')

joblib.dump(encoders, './models/encoders.pkl')
