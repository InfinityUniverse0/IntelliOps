// static/js/alert.js

function getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}

// document.addEventListener('DOMContentLoaded', function() {
//     // 获取表单元素
//     const form = document.getElementById('filter-form');
//
//     // 获取隐藏输入字段的值
//     const statusFilter = document.getElementById('status-filter').value;
//     console.log('Status Filter:', statusFilter);
//
//     // 获取所有按钮
//     const buttons = form.querySelectorAll('button[name="level"]');
//
//     // 为每个按钮添加点击事件监听器
//     buttons.forEach(button => {
//         button.addEventListener('click', function(event) {
//             event.preventDefault();  // 防止表单提交
//
//             const levelValue = this.value;
//             console.log('Selected Level:', levelValue);
//
//             // 你可以在这里处理选中的 level 值
//             // 比如发送 AJAX 请求或者更新页面内容等
//         });
//     });
// });


function getFormData() {
    const form = document.querySelector('.filters');
    const formData = new FormData(form);
    const statusFilter = formData.get('status_filter');
    const level = formData.get('level');
    return { statusFilter, level };
}


function fetchAnomalyLogs() {
    const { statusFilter, level } = getFormData();

    fetch(anomalyLogsUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'X-CSRFToken': getCSRFToken()  // 添加 CSRF 令牌到头部
        },
        body: JSON.stringify({
            'status_filter': statusFilter,
            'level': level,
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
                actionCell.innerHTML = `<a href="#" class="btn btn-icon">确认</a>`;
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
