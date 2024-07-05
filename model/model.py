"""
DeepLog Model

Reference:
    [1] Du, M., Li, F., Zheng, G., & Srikumar, V. (2017).
        Deeplog: Anomaly detection and diagnosis from system logs through deep learning.
        In Proceedings of the 2017 ACM SIGSAC Conference on Computer and Communications Security (CCS) (pp. 1285-1298).
"""

import torch
import torch.nn as nn


class DeepLog(nn.Module):
    """
    DeepLog Model
    """
    def __init__(self, input_size, hidden_size, num_layers, num_keys):
        super(DeepLog, self).__init__()
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, num_keys)

    def forward(self, x):
        h0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(x.device)
        c0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(x.device)
        out, _ = self.lstm(x, (h0, c0))
        out = self.fc(out[:, -1, :])
        return out
