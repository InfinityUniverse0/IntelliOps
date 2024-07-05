from django.shortcuts import render, redirect
from .models import Alert


def index(request):
    return render(request, 'index.html')  # Render the index.html template


def monitor(request):
    return render(request, 'monitor.html')  # Render the monitor.html template


def alert(request, method=['GET', 'POST']):
    if request.method == 'POST':
        alert_id = request.POST.get('alert_id')
        action = request.POST.get('action')
        if alert_id and action:
            alert_instance = Alert.objects.get(event_id=alert_id)
            if action == 'confirm':
                alert_instance.status = 'confirmed'  # 将状态设置为已确认
            elif action == 'delete':
                alert_instance.delete()  # 删除警报
            alert_instance.save()
        return redirect('alert')

    # 获取所有警报信息
    alerts = Alert.objects.all()
    num_alerts = alerts.count()
    num_empty_rows = max(5 - num_alerts, 0)
    empty_rows = [None] * num_empty_rows  # 生成空行列表以补充表格
    return render(request, 'alert.html', {'alerts': alerts, 'empty_rows': empty_rows})


def about(request):
    return render(request, 'about.html')  # Render the about.html template


def page_not_found(request, exception):
    """
    404 error handler.
    """
    return render(request, '404.html', status=404)  # Render the 404.html template
