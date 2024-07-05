from django import forms
from .models import Alert

# 定义 AlertForm 类，基于 Django 的 ModelForm
class AlertForm(forms.ModelForm):
    class Meta:
        # 指定表单基于的模型
        model = Alert
        # 指定表单包含的字段
        fields = ['level', 'title', 'event_id', 'time', 'group', 'status']
