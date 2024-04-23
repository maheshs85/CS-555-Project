from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
import torch
from torch.utils.data import DataLoader, TensorDataset
from lie_detection import EEG_BiLSTM, load_data, preprocess_data, evaluate_model

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'json', 'csv'}
app.config['MODEL_PATH'] = 'models/model.pth'  # Path to the model

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = EEG_BiLSTM(input_dim=5, hidden_dim=50, output_dim=2, num_layers=1, dropout_prob=0.5).to(device)
model.load_state_dict(torch.load(app.config['MODEL_PATH'], map_location=device))
print("Model loaded successfully.")

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part in the request'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        try:
            eeg_data = load_data(filepath)
            features, _ = preprocess_data(eeg_data, include_labels=False)
            features_tensor = torch.tensor(features, dtype=torch.float32)

            # Check initial tensor dimensions and reshape them  correctly
            if features_tensor.dim() == 2:
                features_tensor = features_tensor.unsqueeze(0)  

            print(f"Tensor shape before LSTM: {features_tensor.shape}")  

            
            if features_tensor.dim() != 3:
                raise ValueError("Tensor must be 3D for LSTM processing.") ## Confirm the tensor is in the correct shape for LSTM

            
            inference_loader = DataLoader(TensorDataset(features_tensor), batch_size=1)  # Ensure batch_size is 1
            predictions = []
            model.eval()
            with torch.no_grad():
                for data, in inference_loader:
                    data = data.to(device)  # Ensure data is on the correct device
                    outputs = model(data)
                    _, predicted = torch.max(outputs, 1)
                    predictions.extend(predicted.cpu().tolist())  # Convert to Python int list

            return jsonify({'message': 'Processed successfully', 'predictions': predictions})
        finally:
            os.remove(filepath)  
    return jsonify({'message': 'Invalid file type'}), 400


if __name__ == '__main__':
    app.run(debug=True, port=5000)