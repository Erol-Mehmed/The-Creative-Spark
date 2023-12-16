from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_articles),
    path("author/", views.get_articles_by_user),
]
