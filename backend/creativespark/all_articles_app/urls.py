from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_articles),
    path("<str:slug>", views.get_articles_by_user),
]
