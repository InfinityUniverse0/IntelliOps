import json
from django.shortcuts import render
from django.http import JsonResponse
from .utils.query_log import get_log, get_log_by_event, queryset_to_list_of_dicts


def index(request):
    return render(request, 'index.html')  # Render the index.html template


def monitor(request):
    if request.method == 'POST' and request.is_ajax():
        # TODO: Add AJAX POST method logic
        event_id = request.POST.get('event_id', None)
        logs = get_log_by_event(event_id)
        logs = queryset_to_list_of_dicts(logs)
        return JsonResponse({'logs': json.dumps(logs, ensure_ascii=False)}, status=200)
    elif request.method == 'POST':
        # TODO: Add POST method logic
        print(request.POST)
        return JsonResponse({'method': 'POST'}, status=400)
    elif request.method == 'GET':
        logs = get_log()
        logs = queryset_to_list_of_dicts(logs)
        return render(request, 'monitor.html', {'logs': json.dumps(logs)}, status=200)
    return render(request, 'monitor.html', status=400)


def alert(request):
    return render(request, 'alert.html')  # Render the alert.html template


def about(request):
    return render(request, 'about.html')  # Render the about.html template


def page_not_found(request, exception):
    """
    404 error handler.
    """
    return render(request, '404.html', status=404)  # Render the 404.html template
