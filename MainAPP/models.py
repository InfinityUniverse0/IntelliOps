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
    group = models.CharField(max_length=255, null=True, blank=True)  # 分组
    status = models.CharField(max_length=11, choices=STATUS_CHOICES)  # 状态

    # 保存方法，生成随机的 event_id
    def save(self, *args, **kwargs):
        if not self.event_id:
            self.event_id = f'E{uuid.uuid4().int % 100 + 1}'  # 生成随机 EventID
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title  # 返回警报的标题
