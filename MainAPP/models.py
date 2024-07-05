from django.db import models
from django.utils import timezone
import uuid

# 定义 Alert 模型
from django.db import models
from django.utils import timezone
import uuid

# 定义 Alert 模型
class Alert(models.Model):
    # 定义警报级别的选项
    LEVEL_CHOICES = [
        ('emergency', '紧急'),
        ('severe', '严重'),
        ('minor', '次要'),
        ('warning', '警告'),
        ('info', '信息'),
    ]

    # 定义警报状态的选项
    STATUS_CHOICES = [
        ('unconfirmed', '未确认'),
        ('confirmed', '已确认'),
    ]

    # 定义模型字段
    level = models.CharField(max_length=10, choices=LEVEL_CHOICES)  # 警报级别
    title = models.CharField(max_length=255)  # 警报标题
    event_id = models.CharField(max_length=10, default='')  # 事件ID
    time = models.DateTimeField(default=timezone.now)  # 时间
    status = models.CharField(max_length=11, choices=STATUS_CHOICES)  # 状态

    def __str__(self):
        return self.title  # 返回警报的标题




from django.db import models
from django.utils import timezone

class Notification(models.Model):
    LEVEL_CHOICES = [
        ('emergency', '紧急'),
        ('severe', '严重'),
        ('minor', '次要'),
        ('warning', '警告'),
        ('info', '信息'),
    ]

    level = models.CharField(max_length=10, choices=LEVEL_CHOICES)  # 通知级别
    title = models.CharField(max_length=255)  # 通知标题
    time = models.DateTimeField(default=timezone.now)  # 通知时间
    status = models.CharField(max_length=11, default='成功')  # 通知状态

    def __str__(self):
        return self.title
