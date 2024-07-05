from django.shortcuts import render


def index(request):
    return render(request, 'index.html')  # Render the index.html template


def monitor(request):
    return render(request, 'monitor.html')  # Render the monitor.html template


# def alert(request):
#     return render(request, 'alert.html')
from django.shortcuts import render, redirect
from .models import Alert

def alert(request):
    # 获取筛选条件
    status_filter = request.GET.get('status_filter', 'all')
    keyword = request.GET.get('keyword', '').strip()  # 去除空格
    event_id = request.GET.get('event_id', '').strip()  # 去除空格
    level = request.GET.get('level', '')

    # 处理 POST 请求
    if request.method == 'POST':
        alert_id = request.POST.get('alert_id')
        action = request.POST.get('action')

        # 打印POST请求的内容
        print("POST请求数据:", request.POST)
        print("alert_id:", alert_id)
        print("action:", action)

        if alert_id and action:
            try:
                alert_instance = Alert.objects.get(id=alert_id)
                if action == 'confirm' and alert_instance.status == 'unconfirmed':
                    alert_instance.status = 'confirmed'
                    alert_instance.save()
                elif action == 'delete' and alert_instance.status == 'confirmed':
                    alert_instance.delete()
            except Alert.DoesNotExist:
                pass
        query_string = request.META.get('QUERY_STRING', '')
        return redirect(f'{request.path}?{query_string}')

    # 根据筛选条件过滤警报信息
    alerts = Alert.objects.all()

    # 先应用状态筛选
    if status_filter == 'unconfirmed':
        alerts = alerts.filter(status='unconfirmed')
    elif status_filter == 'confirmed':
        alerts = alerts.filter(status='confirmed')

    # 然后应用其他筛选条件
    if level:
        alerts = alerts.filter(level=level)
    if keyword:
        alerts = alerts.filter(title__icontains=keyword)
    if event_id:
        alerts = alerts.filter(event_id__icontains=event_id)

    # 计算表格需要的空行数
    num_alerts = alerts.count()
    num_empty_rows = max(5 - num_alerts, 0)
    empty_rows = [None] * num_empty_rows

    return render(request, 'alert.html', {
        'alerts': alerts,
        'empty_rows': empty_rows,
        'status_filter': status_filter,
        'level': level,
        'keyword': keyword,
        'event_id': event_id
    })


def about(request):
    return render(request, 'about.html')  # Render the about.html template


def page_not_found(request, exception):
    """
    404 error handler.
    """
    return render(request, '404.html', status=404)  # Render the 404.html template
