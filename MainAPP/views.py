from django.shortcuts import render


def index(request):
    return render(request, 'index.html')  # Render the index.html template


def monitor(request):
    return render(request, 'monitor.html')  # Render the monitor.html template


def alert(request):
    return render(request, 'alert.html')  # Render the alert.html template


def about(request):
    return render(request, 'about.html')  # Render the about.html template


def page_not_found(request, exception):
    """
    404 error handler.
    """
    return render(request, '404.html', status=404)  # Render the 404.html template
