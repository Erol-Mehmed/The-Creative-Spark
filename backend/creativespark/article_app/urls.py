from django.urls import path
from . import views

urlpatterns = [
    path("article/<str:slug>", views.get_article),
]
