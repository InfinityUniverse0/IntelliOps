from django.shortcuts import render


def index(request):
    return render(request, 'index.html')  # Render the index.html template


def monitor(request):
    return render(request, 'monitor.html')  # Render the monitor.html template


# def alert(request):
#     return render(request, 'alert.html')
from django.shortcuts import render
from django.http import JsonResponse
from .models import Alert

def alert(request):
    # 获取筛选条件
    status_filter = request.GET.get('status_filter', 'all')
    keyword = request.GET.get('keyword')
    event_id = request.GET.get('event_id')
    level = request.GET.get('level')

    # 处理 POST 请求
    if request.method == 'POST':
        alert_id = request.POST.get('alert_id')
        action = request.POST.get('action')
        if alert_id and action:
            try:
                alert_instance = Alert.objects.get(event_id=alert_id)
                if action == 'confirm' and alert_instance.status == 'unconfirmed':
                    alert_instance.status = 'confirmed'  # 将状态设置为已确认
                    alert_instance.save()
                    return JsonResponse({'status': 'success', 'message': '已确认'})
                elif action == 'delete' and alert_instance.status == 'confirmed':
                    alert_instance.delete()  # 删除警报
                    return JsonResponse({'status': 'success', 'message': '已删除'})
                else:
                    return JsonResponse({'status': 'error', 'message': '无效的操作'})
            except Alert.DoesNotExist:
                return JsonResponse({'status': 'error', 'message': '警报不存在'})
        return JsonResponse({'status': 'error', 'message': '无效的请求'})

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
    empty_rows = [None] * num_empty_rows  # 生成空行列表以补充表格

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
