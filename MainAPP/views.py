import json
from django.shortcuts import render
from django.http import JsonResponse
from .utils.query_log import get_log, get_log_by_event, queryset_to_list_of_dicts
from .models import Log, Event, AnomalyLog
from model.anomaly_detection import detector
from random import choice


def index(request):
    return render(request, 'index.html')  # Render the index.html template


def monitor(request):
    if request.method == 'POST' and request.is_ajax():
        # TODO: Add AJAX POST method logic
        event_id = request.POST.get('event_id', None)
        logs = get_log_by_event(event_id)
        logs = queryset_to_list_of_dicts(logs)
        return JsonResponse({'logs': json.dumps(logs, ensure_ascii=False)}, status=200)
    elif request.method == 'POST':
        # TODO: Add POST method logic
        print(request.POST)
        return JsonResponse({'method': 'POST'}, status=400)
    elif request.method == 'GET':
        logs = get_log()
        logs = queryset_to_list_of_dicts(logs)
        return render(request, 'monitor.html', {'logs': json.dumps(logs)}, status=200)
    print('Invalid request:', request.method)
    return render(request, 'monitor.html', status=400)


def alert(request):
    return render(request, 'alert.html')  # Render the alert.html template


def get_anomaly_logs(request):
    if request.method == 'POST' or request.method == 'GET':
        # month_to_number = {
        #     'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
        #     'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
        # }
        #
        # case_statements = " ".join([
        #     f"WHEN '{month}' THEN '{number}'"
        #     for month, number in month_to_number.items()
        # ])

        data = json.loads(request.body)
        status_filter = data.get('status_filter')
        level = data.get('level')

        logs_to_predict = Log.objects.filter(anomalylog__isnull=True)
        logs_to_predict = logs_to_predict.first()
        if logs_to_predict:
        # logs = logs_to_predict
        # for logs_to_predict in logs:
            anomaly = detector.predict_online(logs_to_predict.event.event_id)
            if anomaly:
                AnomalyLog.objects.update_or_create(
                    month=logs_to_predict.month,
                    date=logs_to_predict.date,
                    time=logs_to_predict.time,
                    hostname=logs_to_predict.hostname,
                    component=logs_to_predict.component,
                    pid=logs_to_predict.pid,
                    content=logs_to_predict.content,
                    event=logs_to_predict.event,
                    severity_level=choice(AnomalyLog.SEVERITY_LEVEL_CHOICES)[0],
                    error_code=choice(AnomalyLog.ERROR_CODE_CHOICES)[0]
                )
                print('Anomaly detected:', logs_to_predict)
            else:
                if anomaly is None:
                    print('Not enough data:', logs_to_predict)
                else:
                    print('Normal:', logs_to_predict)
        anomaly_logs = AnomalyLog.objects.all()

        # print(status_filter)
        # print(type(status_filter))
        # print(level)
        # print(type(level))

        if status_filter and status_filter != 'all':
            anomaly_logs = anomaly_logs.filter(confirmation_status=status_filter)
        if level and level != 'all':
            anomaly_logs = anomaly_logs.filter(severity_level=level)

        anomaly_logs = anomaly_logs.order_by('-alert_time')

        # print(len(anomaly_logs))  # For Debugging
        alerts = [
            {
                'month': anomaly_log.month,
                'date': anomaly_log.date,
                'time': anomaly_log.time.strftime('%H:%M:%S'),
                'hostname': anomaly_log.hostname,
                'component': anomaly_log.component,
                'pid': anomaly_log.pid,
                'content': anomaly_log.content,
                'severity_level': anomaly_log.severity_level,
                'error_code': anomaly_log.error_code,
                'alert_time': anomaly_log.alert_time.strftime('%Y-%m-%d %H:%M:%S'),
                'confirmation_status': anomaly_log.confirmation_status,
                'event_id': anomaly_log.event.event_id,
            }
            for anomaly_log in anomaly_logs
        ]
        return JsonResponse({'anomaly_logs': json.dumps(alerts, ensure_ascii=False)}, status=200)
    return JsonResponse({'error': 'Invalid request'}, status=400)


def about(request):
    return render(request, 'about.html')  # Render the about.html template


def page_not_found(request, exception):
    """
    404 error handler.
    """
    return render(request, '404.html', status=404)  # Render the 404.html template
