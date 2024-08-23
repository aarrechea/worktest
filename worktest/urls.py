# Imports
from django.contrib import admin
from django.urls import path, include



# Patterns
urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include(("apps.router", "apps"), namespace="apps-api")),
]
