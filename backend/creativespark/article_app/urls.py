from django.urls import path
from . import views

urlpatterns = [
    path("/article-details", views.get_article),
]
