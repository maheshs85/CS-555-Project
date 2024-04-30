from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import numpy as np
import torch
import json
from lie_detection import preprocess_data, EEG_BiLSTM, evaluate_model
from fastapi.middleware.cors import CORSMiddleware
import logging
from torch.utils.data import DataLoader, TensorDataset
from sklearn.metrics import confusion_matrix, classification_report
import base64
from io import BytesIO
import matplotlib.pyplot as plt
import seaborn as sns
from pymongo import MongoClient
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel,Field
from typing import List
from hashlib import sha256
from datetime import datetime
from bson.json_util import dumps



logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mongo_client = AsyncIOMotorClient("mongodb+srv://CyberCoders:CyberCoders@cluster0.exuicpo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = mongo_client['test']
results_data_collection = db['results_data']


device = torch.device("cuda" if torch.cuda.is_available() else "cpu") #LOAD THE MODEL 
model = EEG_BiLSTM(input_dim=5, hidden_dim=100, output_dim=2, num_layers=1, dropout_prob=0.7)
model.load_state_dict(torch.load('models/model.pth', map_location=device))
model.to(device)
model.eval()
logger.info("Model loaded and is currently processing")

for name, param in model.named_parameters():
    if param.requires_grad:
        logger.info(f"{name}: {param.data}")

def plot_results(all_labels, all_predictions):
    labels = ['Truth', 'Lie']
    values = [np.sum(all_predictions == 0), np.sum(all_predictions == 1)]

    plt.figure(figsize=(8, 5))
    plt.bar(labels, values, color=['blue', 'red'])
    plt.xlabel('Class')
    plt.ylabel('Number of Predictions')
    plt.title('Distribution of Predictions')

    
    buf = BytesIO()
    plt.savefig(buf, format='png')
    plt.close()
    buf.seek(0)

    image_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    return image_base64


def plot_confusion_matrix(all_labels, all_predictions):
    labels = ['Truth', 'Lie']
    cm = confusion_matrix(all_labels, all_predictions)
    fig, ax = plt.subplots()
    sns.heatmap(cm, annot=True, fmt="d", cmap='Blues', xticklabels=labels, yticklabels=labels)
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    plt.title('Confusion Matrix')
    
    
    buf = BytesIO()
    plt.savefig(buf, format='png')
    plt.close(fig)
    buf.seek(0)
    
    image_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    return image_base64

class ResultModel(BaseModel):
    accuracy: float
    precision: float
    recall: float
    f1_score: float = Field(..., alias='f1-score')
    confusion_matrix_image: str
    prediction_distribution_image: str  

class Config:
        allow_population_by_field_name = True

@app.post("/api/upload/")
async def create_upload_file(file: UploadFile = File(...)):
    logger.info(f"Received file: {file.filename}")
    try:
        contents = await file.read()
        data_hash = sha256(contents).hexdigest()
        logger.info(f"Data hash: {data_hash}")

        try:
            eeg_data = json.loads(contents.decode())
            if isinstance(eeg_data, dict):
                eeg_data = [eeg_data]  
        except json.JSONDecodeError:
            
            lines = contents.decode().splitlines()
            eeg_data = [json.loads(line) for line in lines if line.strip()]

        logger.info(f"Data received: {eeg_data[:5]}")  

        
        features, labels = preprocess_data(eeg_data, include_labels=True)
        logger.info(f"Features and Labels shapes: {features.shape}, {labels.shape}")
        logger.info(f"Sample features: {features[:1]}")

       
        
       
        features_tensor = torch.tensor(features, dtype=torch.float32).to(device)
        labels_tensor = torch.tensor(labels, dtype=torch.long).to(device)

        


       
        dataset = TensorDataset(features_tensor, labels_tensor)
        data_loader = DataLoader(dataset, batch_size=len(features_tensor), shuffle=False)

        
        with torch.no_grad():  
            outputs = model(features_tensor)
            _, predicted = torch.max(outputs.data, 1)
            logger.info(f"Predictions: {predicted.tolist()}")

       
        all_labels, all_predictions, accuracy = evaluate_model(model, data_loader, device)
        logger.info(f"Calculated Test Accuracy: {accuracy:.2f}%")
        logger.info(f"Model output (sample): {all_predictions[:10]}")

       
        prediction_distribution_image = plot_results(all_labels, all_predictions)

        conf_matrix_image = plot_confusion_matrix(all_labels, all_predictions)

        classification_rep = classification_report(all_labels, all_predictions, target_names=['Truth', 'Lie'], output_dict=True)

        current_date = datetime.now()

        formatted_date = current_date.strftime("%Y-%m-%d %H:%M:%S")
        result_data = {
            "date": formatted_date,
            "filename": file.filename,
            "accuracy": accuracy,
            "precision": classification_rep['weighted avg']['precision'],
            "recall": classification_rep['weighted avg']['recall'],
            "f1-score": classification_rep['weighted avg']['f1-score'],
            "all_labels": all_labels.tolist(), 
            "all_predictions": all_predictions.tolist()  
        }

       
        insert_result = await results_data_collection.insert_one(result_data)
        result_id = insert_result.inserted_id
        
        return JSONResponse(content={
            "result_id": str(result_id),
            "accuracy": accuracy,
            "precision": classification_rep['weighted avg']['precision'],
            "recall": classification_rep['weighted avg']['recall'],
            "f1-score": classification_rep['weighted avg']['f1-score']
            
        })

        
    except Exception as e:
        logger.error(f"Error processing the upload: {str(e)}")
        return HTTPException(status_code=500, detail=str(e))



# @app.get("/results/latest", response_model=ResultModel)
# async def get_latest_result():
#     result = await results_data_collection.find_one({}, sort=[('_id', -1)])
#     if result:
#         logger.info(f"Latest result fetched: {result}")
#     else:
#         logger.info("No results found in database.")
#     return result


@app.get("/results/latest", response_model=ResultModel)
async def get_latest_result():
    result = await results_data_collection.find_one({}, sort=[('_id', -1)])
    if not result:
        raise HTTPException(status_code=404, detail="No results found")

    
    if 'prediction_distribution_image' not in result or 'confusion_matrix_image' not in result:
        all_labels = np.array(result['all_labels'])
        all_predictions = np.array(result['all_predictions'])
        result['prediction_distribution_image'] = plot_results(all_labels, all_predictions)
        result['confusion_matrix_image'] = plot_confusion_matrix(all_labels, all_predictions)

    return result
@app.get("/uploads/")
async def get_all_uploads():
    results = []
    async for result in results_data_collection.find().limit(5):
        result_dict = json.loads(dumps(result))
        results.append(result_dict)
    return results

@app.get("/results/{result_id}", response_model=ResultModel)
async def get_result_by_id(result_id: str):
    try:
        # Convert the string ID to ObjectId
        result_object_id = ObjectId(result_id)
        # Query the database to find the result by its ObjectId
        result = await results_data_collection.find_one({"_id": result_object_id})
        
        if not result:
            raise HTTPException(status_code=404, detail="Result not found")
        
        # Check if images are not present, generate them
        if 'prediction_distribution_image' not in result or 'confusion_matrix_image' not in result:
            all_labels = np.array(result['all_labels'])
            all_predictions = np.array(result['all_predictions'])
            result['prediction_distribution_image'] = plot_results(all_labels, all_predictions)
            result['confusion_matrix_image'] = plot_confusion_matrix(all_labels, all_predictions)
        
        return result
    except Exception as e:
        logger.error(f"Error fetching result: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
