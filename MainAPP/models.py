from django.db import models
from django.utils import timezone
import datetime


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

    @property
    def timestamp(self):
        month_to_number = {
            'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
            'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
        }
        month_num = month_to_number[self.month]
        current_year = timezone.now().year  # Assumes logs are from the current year
        return datetime.datetime(current_year, month_num, self.date, self.time.hour, self.time.minute, self.time.second)


class Event(models.Model):
    """
    Log Event model.
    """
    event_id = models.CharField(max_length=10, unique=True, verbose_name='Event ID')
    event_template = models.TextField(verbose_name='Event Template')

    def __str__(self):
        return self.event_id
