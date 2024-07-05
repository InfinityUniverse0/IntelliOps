"""
Log Model Retrieval
"""

import os
from django.forms import model_to_dict

# Set the Django settings module
os.environ['DJANGO_SETTINGS_MODULE'] = "IntelliOps.settings"

import django
django.setup()  # Initialize Django
from MainAPP.models import Log, Event


log_attrs = [
    'month',
    'date',
    'time',
    'hostname',
    'component',
    'pid',
    'content',
    'id',  # Primary key
    'event',  # Event
    'event_id'  # Foreign key (Event's primary key)
]


def get_log(attr_dict: dict = None):
    """
    Get logs from the database.

    :param attr_dict: Attribute dictionary in the format of {attr_name: attr_value} (Default: None for all logs)
    :return: Logs
    """
    if attr_dict:
        if all(attr in log_attrs for attr in attr_dict.keys()):
            return Log.objects.filter(**attr_dict)
        else:
            raise ValueError('Invalid attribute name. Valid attribute names: {}'.format(log_attrs))
    return Log.objects.all()


def get_log_by_event(event_id):
    """
    Get logs by event ID. (e.g., 'E1')

    :param event_id: Event ID
    :return: Logs
    """
    # event = Event.objects.get(event_id=event_id)
    # return Log.objects.filter(event=event)
    return Log.objects.filter(event__event_id=event_id)


def queryset_to_list_of_dicts(queryset):
    """
    Convert a Django QuerySet to a list of dictionaries.

    :param queryset: Django QuerySet (here: Log QuerySet)
    :return: List of dictionaries
    """
    list_of_dicts = []
    for instance in queryset:
        log_dict = model_to_dict(instance)
        log_dict['time'] = log_dict['time'].strftime('%H:%M:%S')
        log_dict['event_id'] = instance.event.event_id
        log_dict['timestamp'] = int(instance.timestamp.timestamp())
        list_of_dicts.append(log_dict)
    return list_of_dicts
