"""
Anomaly Detection
"""

import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import TensorDataset, DataLoader
import os
import time
from collections import deque
from datetime import datetime
from model import DeepLog as Model
from preprocessing.preprocessing import get_event_templates, log2eid


class AnomalyDetector:
    """
    Anomaly Detector
    """
    def __init__(self, templates_file_path, model_path, train=False, train_file_path=None, device='cpu'):
        """
        Initialize Anomaly Detector.

        :param templates_file_path: Event templates CSV file path
        :param model_path: Model file path
        :param train: Train the model (Default: False)
        :param train_file_path: Train data file path
        :param device: Device (Default: 'cpu')
        """
        self.templates = get_event_templates(templates_file_path)

        # Model parameters
        self.window_size = 10
        self.num_classes = len(self.templates)
        self.num_epochs = 300
        self.batch_size = 2000
        self.input_size = 1
        self.num_layers = 2
        self.hidden_size = 64
        self.device = device

        self.model = Model(self.input_size, self.hidden_size, self.num_layers, self.num_classes).to(self.device)
        if train:
            self.model.load_state_dict(torch.load(self._train(train_file_path)))
        else:
            self.model.load_state_dict(torch.load(model_path))

        # Initialize queue
        self.q = deque()

    def predict(self, log, k=9):
        """
        Predict whether the log is an anomaly.

        :param log: Log
        :param k: Top-k predictions used for anomaly detection (Default: 9)
        :return: Anomaly (True), Normal (False) or None (Not enough data)
        """
        self.model.eval()
        with torch.no_grad():
            eid = log2eid(log, self.templates)
            if len(self.q) < self.window_size:
                self.q.append(eid)
                return None
            else:
                seq = torch.tensor(list(self.q), dtype=torch.float).view(-1, self.window_size, self.input_size).to(
                    self.device)
                label = torch.tensor(eid).view(-1).to(self.device)
                output = self.model(seq)
                preds = torch.argsort(output, 1)[0][-k:]
                self.q.popleft()
                self.q.append(eid)
                return not (label in preds)

    def _train(self, train_file_path):
        dataLoader = DataLoader(
            self._generate_dataset(train_file_path), batch_size=self.batch_size, shuffle=True, pin_memory=True
        )
        criterion = nn.CrossEntropyLoss().to(self.device)
        optimizer = optim.Adam(self.model.parameters())

        start_time = time.time()
        for epoch in range(self.num_epochs):
            train_loss = 0
            for seq, label in dataLoader:
                seq = seq.clone().detach().view(-1, self.window_size, self.input_size).to(self.device)
                output = self.model(seq)
                loss = criterion(output, label.to(self.device))
                optimizer.zero_grad()
                loss.backward()
                train_loss += loss.item()
                optimizer.step()
            print('Epoch [{}/{}], train_loss: {:.4f}'.format(epoch + 1, self.num_epochs, train_loss / len(dataLoader)))
        elapsed_time = time.time() - start_time
        print('elapsed_time: {:.3f}s'.format(elapsed_time))
        # Save model
        model_path = os.path.join(os.path.dirname(__file__), 'ckpt')
        if not os.path.exists(model_path):
            os.makedirs(model_path)
        model_path = os.path.join(model_path, datetime.now().strftime("%Y_%m_%d-%H_%M_%S") + '.pth')
        torch.save(self.model.state_dict(), model_path)
        print('Finished Training')
        print('Model saved at: {}'.format(model_path))
        return model_path

    def _generate_dataset(self, train_file_path):
        """
        Generate Dataset.
        """
        seqs = []
        labels = []
        queue = deque()
        with open(train_file_path, mode='r') as file:
            for log in file.readlines():
                eid = log2eid(log, self.templates)
                if len(queue) < self.window_size:
                    queue.append(eid)
                else:
                    seqs.append(list(queue))
                    labels.append(eid)
                    queue.popleft()
                    queue.append(eid)
        dataset = TensorDataset(torch.tensor(seqs, dtype=torch.float), torch.tensor(labels))
        return dataset


if __name__ == "__main__":

    device = 'cpu'
    if torch.cuda.is_available():
        device = 'cuda'
    elif torch.backends.mps.is_available():
        device = 'mps'
    print('Using {} device'.format(device))

    templates_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'Linux_2k.log_templates.csv')
    train_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'Linux_2k.log')

    detector = AnomalyDetector(templates_path, None, True, train_path, device)

    # 测试效果
    with open(train_path, 'r') as file:
        for log in file.readlines():
            print(detector.predict(log))
