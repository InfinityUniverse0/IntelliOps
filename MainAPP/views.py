from django.shortcuts import render


def index(request):
    return render(request, 'index.html')  # Render the index.html template


def monitor(request):
    return render(request, 'monitor.html')  # Render the monitor.html template


# def alert(request):
#     return render(request, 'alert.html')
# views.py


from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.conf import settings
from .models import Alert
from django.utils import timezone

from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from .models import Notification


def add_alert(level='警告', title='Warning', time=None, event_id='Null', status='unconfirmed'):
    """
    向数据库中插入一条新的警报记录。

    :param level: 警报级别 (默认: '警告')
    :param title: 警报标题 (默认: 'Warning')
    :param time: 时间 (默认: 当前时间)
    :param event_id: 事件ID (默认: 'Null')
    :param status: 状态 (默认: 'unconfirmed')
    """
    if time is None:
        time = timezone.now().strftime('%Y-%m-%d %H:%M:%S')  # 格式化时间为 年-月-日 时:分:秒

    alert = Alert(level=level, title=title, time=time, event_id=event_id, status=status)
    alert.save()


def send_notification_email(level='警告', title='标题', content='警告，我们在您的系统中检测到一个警告信息', recipient_email='3541131660@qq.com'):
    time = timezone.now().strftime('%Y-%m-%d %H:%M:%S')  # 格式化时间为 年-月-日 时:分:秒
    status = '成功'
    send_mail(
        subject='告警通知',
        message=f'级别: {level}\n时间: {time}\n内容: {content}\n',
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[recipient_email],  # QQ邮箱地址
        fail_silently=False,
    )

    # 记录到数据库
    notification = Notification(level=level, title=title, time=timezone.now(), status=status)
    notification.save()

from django.shortcuts import render, redirect
from django.utils import timezone
from .models import Alert, Notification

def delete_notification(notification_id):
    try:
        notification_instance = Notification.objects.get(id=notification_id)
        notification_instance.delete()
    except Notification.DoesNotExist:
        pass

def alert(request):
    # 获取筛选条件
    status_filter = request.GET.get('status_filter', 'all')
    keyword = request.GET.get('keyword', '').strip()  # 去除空格
    event_id = request.GET.get('event_id', '').strip()  # 去除空格
    level = request.GET.get('level', '')

    # 处理 POST 请求
    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'send_email':
            level = request.POST.get('level', '警告')
            title = request.POST.get('title', '标题')
            send_notification_email(level, title)
        elif action == 'add_alert':
            level = request.POST.get('level', '警告')
            title = request.POST.get('title', 'Warning')
            add_alert(level, title)
        elif action == 'delete_notification':
            notification_id = request.POST.get('notification_id')
            if notification_id:
                delete_notification(notification_id)
        else:
            alert_id = request.POST.get('alert_id')
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
    if status_filter == 'unconfirmed':
        alerts = alerts.filter(status='unconfirmed')
    elif status_filter == 'confirmed':
        alerts = alerts.filter(status='confirmed')
    if level:
        alerts = alerts.filter(level=level)
    if keyword:
        alerts = alerts.filter(title__icontains=keyword)
    if event_id:
        alerts = alerts.filter(event_id__icontains=event_id)

    notifications = Notification.objects.all()

    num_alerts = alerts.count()
    num_empty_rows = max(5 - num_alerts, 0)
    empty_rows = [None] * num_empty_rows

    return render(request, 'alert.html', {
        'alerts': alerts,
        'notifications': notifications,
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
