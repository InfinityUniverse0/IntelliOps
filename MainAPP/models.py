from django.db import models
from django.utils import timezone


class Log(models.Model):
    """
    Log model.
    """
    month = models.CharField(max_length=3, verbose_name='Month')
    date = models.IntegerField(verbose_name='Date')
    time = models.TimeField(default=timezone.now, verbose_name='Time')
    hostname = models.CharField(max_length=255, verbose_name='Hostname')
    component = models.CharField(max_length=255, verbose_name='Component')
    pid = models.IntegerField(null=True, blank=True, verbose_name='PID')
    content = models.TextField(verbose_name='Content')
    event = models.ForeignKey('Event', on_delete=models.CASCADE, verbose_name='Event')

    def __str__(self):
        return f"{self.month} {self.date} {self.time} {self.hostname} {self.component} {self.pid} {self.content}"


class Event(models.Model):
    """
    Log Event model.
    """
    event_id = models.CharField(max_length=10, unique=True, verbose_name='Event ID')
    event_template = models.TextField(verbose_name='Event Template')

    def __str__(self):
        return self.event_id


class Alert(models.Model):
    """
    Alert model.
    """
    # Alert level choices
    LEVEL_CHOICES = [
        ('emergency', '紧急'),
        ('severe', '严重'),
        ('minor', '次要'),
        ('warning', '警告'),
        ('info', '信息'),
    ]

    # Alert status choices
    STATUS_CHOICES = [
        ('unconfirmed', '未确认'),
        ('confirmed', '已确认'),
    ]

    # Alert fields
    level = models.CharField(max_length=10, choices=LEVEL_CHOICES)  # 警报级别
    title = models.CharField(max_length=255)  # 警报标题
    event_id = models.CharField(max_length=10, default='')  # 事件ID
    time = models.DateTimeField(default=timezone.now)  # 时间
    group = models.CharField(max_length=255, null=True, blank=True)  # 分组
    status = models.CharField(max_length=11, choices=STATUS_CHOICES)  # 状态

    def __str__(self):
        return self.title
