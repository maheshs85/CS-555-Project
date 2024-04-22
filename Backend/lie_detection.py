import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset
from sklearn.model_selection import train_test_split
import os
import json
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix, classification_report


def load_data(filepath):
    try:
        with open(filepath, 'r') as file:
            
            eeg_data = json.load(file)  #  load the file as a JSON  array
            if isinstance(eeg_data, dict):  
                return [eeg_data]  
            return eeg_data
    except json.JSONDecodeError:
        
        with open(filepath, 'r') as file:
            eeg_data = [json.loads(line) for line in file if line.strip()]
            return eeg_data


def preprocess_data(eeg_data, include_labels=True):
    features = np.array([[entry['EEG.AF3'], entry['EEG.T7'], entry['EEG.Pz'],
                          entry['EEG.T8'], entry['EEG.AF4']] for entry in eeg_data])
    if include_labels:
        labels = np.array([1 if entry['label'] == 'False' else 0 for entry in eeg_data])
        return features, labels
    else:
        return features, None


def split_data(features, labels):
    x_train, x_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)
    return x_train, x_test, y_train, y_test


def normalize_data(x_train, x_test):
    mean = x_train.mean(axis=0)
    std = x_train.std(axis=0)
    x_train = (x_train - mean) / std
    x_test = (x_test - mean) / std
    return x_train, x_test


def create_datasets_loaders(x_train, y_train, x_test, y_test):
    x_train_tensor = torch.tensor(x_train, dtype=torch.float32)
    y_train_tensor = torch.tensor(y_train, dtype=torch.long)
    x_test_tensor = torch.tensor(x_test, dtype=torch.float32)
    y_test_tensor = torch.tensor(y_test, dtype=torch.long)

    train_dataset = TensorDataset(x_train_tensor, y_train_tensor)
    train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
    print(f"Batch size from DataLoader: {next(iter(train_loader))[0].shape[0]}")

    test_dataset = TensorDataset(x_test_tensor, y_test_tensor)
    test_loader = DataLoader(test_dataset, batch_size=64, shuffle=False)
    print(f"Batch size from DataLoader: {next(iter(train_loader))[0].shape[0]}")

    return train_loader, test_loader


class EEG_BiLSTM(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim, num_layers, dropout_prob):
        super(EEG_BiLSTM, self).__init__()
        self.hidden_dim = hidden_dim
        self.num_layers = num_layers
        self.bilstm = nn.LSTM(input_dim, hidden_dim, num_layers,
                              batch_first=True, dropout=dropout_prob, bidirectional=True)
        self.linear = nn.Linear(hidden_dim * 2, output_dim)

    def forward(self, x):
        x = x.unsqueeze(1) if x.dim() == 2 else x  # Ensures [batch, sequence, features]
        h0 = torch.zeros(self.num_layers * 2, x.size(0), self.hidden_dim, device=x.device)
        c0 = torch.zeros(self.num_layers * 2, x.size(0), self.hidden_dim, device=x.device)
        out, _ = self.bilstm(x, (h0, c0))
        out = self.linear(out[:, -1, :])
        return out


def train_model(model, train_loader, device, criterion, optimizer, num_epochs,save_path):
    for epoch in range(num_epochs):
        model.train()
        for data, labels in train_loader:
            data, labels = data.to(device), labels.to(device)
            optimizer.zero_grad()
            outputs = model(data)
            print(f"Output shape: {outputs.shape}, Labels shape: {labels.shape}")

            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
        print(f'Epoch {epoch + 1}/{num_epochs}, Loss: {loss.item()}')
    torch.save(model.state_dict(), save_path)
    print(f'Model saved to {save_path}')


def evaluate_model(model, data_loader, device, has_labels=True):
    model.eval()
    correct = 0
    total = 0
    all_predictions = []
    all_labels = []
    with torch.no_grad():
        for batch in data_loader:
            if has_labels:
                data, labels = batch
                labels = labels.to(device)
            else:
                data = batch[0] if isinstance(batch, tuple) else batch  
                labels = None

            data = data.to(device)
            outputs = model(data)
            _, predicted = torch.max(outputs, 1)
            all_predictions.extend(predicted.cpu().numpy())

            if labels is not None:
                total += labels.size(0)
                correct += (predicted == labels).sum().item()
                all_labels.extend(labels.cpu().numpy())

    if has_labels:
        accuracy = 100.0 * correct / total if total > 0 else 0
        print(f'Calculated Test Accuracy: {accuracy:.2f}%')
        return np.array(all_labels), np.array(all_predictions), accuracy
    else:
        return np.array(all_predictions)  # Return only predictions if no labels are present
    
def plot_results(all_labels, all_predictions):
    # Calculate the number of predictions for each class present below
    labels = ['Truth', 'Lie']
    values = [np.sum(all_predictions == 0), np.sum(all_predictions == 1)]

    plt.figure(figsize=(8, 5))
    plt.bar(labels, values, color=['blue', 'red'])
    plt.xlabel('Class')
    plt.ylabel('Number of Predictions')
    plt.title('Distribution of Predictions')
    plt.show()


    conf_matrix = confusion_matrix(all_labels, all_predictions)
    sns.heatmap(conf_matrix, annot=True, fmt="d", cmap='Blues', xticklabels=labels, yticklabels=labels)
    plt.xlabel('Predicted Labels')
    plt.ylabel('Actual Labels')
    plt.title('Confusion Matrix')
    plt.show()

    print(classification_report(all_labels, all_predictions, target_names=labels))

def main():
    print("Current Working Directory: ", os.getcwd())
    eeg_data = load_data('C:/SSW-555 Agile/CS-555-Project/frontend/public/eeg_data_labeled.json')
    features, labels = preprocess_data(eeg_data, include_labels=True)
    x_train, x_test, y_train, y_test = split_data(features, labels)
    print(f"Features shape: {x_train.shape}, Labels shape: {y_train.shape}")

    x_train, x_test = normalize_data(x_train, x_test)
    train_loader, test_loader = create_datasets_loaders(x_train, y_train, x_test, y_test)

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = EEG_BiLSTM(input_dim=5, hidden_dim=50, output_dim=2, num_layers=1, dropout_prob=0.5).to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)
    model_save_path = 'models/model.pth'
    os.makedirs('models', exist_ok=True)  

    train_model(model, train_loader, device, criterion, optimizer, num_epochs=20, save_path=model_save_path)

    all_labels, all_predictions, accuracy = evaluate_model(model, test_loader, device)
    print(f'Test Accuracy: {accuracy:.2f}%')
    plot_results(all_labels, all_predictions)


if __name__ == "__main__":
    main()