// static/js/alert.js

function getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}

function fetchAnomalyLogs() {
    fetch(anomalyLogsUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'X-CSRFToken': getCSRFToken()  // 添加 CSRF 令牌到头部
        },
        body: JSON.stringify({
            'csrf_token': getCSRFToken()
        })
    })
        .then(response => response.json())
        .then(data => {
            const anomalyLogsList = document.getElementById('anomaly-logs-list');
            anomalyLogsList.innerHTML = '';  // 清空当前异常日志列表

            data.anomaly_logs = JSON.parse(data.anomaly_logs);
            data.anomaly_logs.forEach(log => {
                const tableRow = document.createElement('tr');
                const severityLevelCell = document.createElement('td');
                severityLevelCell.textContent = `${log.severity_level}`;
                const errorCodeCell = document.createElement('td');
                errorCodeCell.textContent = `${log.error_code}`;
                const alertTimeCell = document.createElement('td');
                alertTimeCell.textContent = `${log.alert_time}`;
                const eventIDCell = document.createElement('td');
                eventIDCell.textContent = `${log.event_id}`;
                const confirmationStatusCell = document.createElement('td');
                confirmationStatusCell.textContent = `${log.confirmation_status}`;
                const actionCell = document.createElement('td');
                actionCell.textContent = 'TEST';
                tableRow.appendChild(severityLevelCell);
                tableRow.appendChild(errorCodeCell);
                tableRow.appendChild(alertTimeCell);
                tableRow.appendChild(eventIDCell);
                tableRow.appendChild(confirmationStatusCell);
                tableRow.appendChild(actionCell);
                anomalyLogsList.appendChild(tableRow);
                // const logItem = document.createElement('li');
                // logItem.textContent = `${log.month} ${log.date} ${log.time} ${log.hostname} ${log.component} ${log.pid} ${log.content}`;
                // anomalyLogsList.appendChild(logItem);
            });
        })
        .catch(error => console.error('Error fetching anomaly logs:', error));
}

// 初次加载时获取日志
fetchAnomalyLogs();

// 设置定时器每隔5秒获取一次日志
setInterval(fetchAnomalyLogs, 5000);
