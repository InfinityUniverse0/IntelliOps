from django.shortcuts import render


def index(request):
    return render(request, 'index.html')  # Render the index.html template


def page_not_found(request, exception):
    """
    404 error handler.
    """
    return render(request, '404.html', status=404)  # Render the 404.html template
