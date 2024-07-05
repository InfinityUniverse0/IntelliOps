from django.contrib import admin
from .models import Alert

# 定义 AlertAdmin 类来定制 Django 管理界面的显示方式
class AlertAdmin(admin.ModelAdmin):
    # 设置在管理界面中显示的字段
    list_display = ('level', 'title', 'event_id', 'time', 'group', 'status')
    # 设置可以搜索的字段
    search_fields = ('title', 'event_id', 'group', 'status')

# 注册 Alert 模型和 AlertAdmin 管理类
admin.site.register(Alert, AlertAdmin)
