from django.urls import path
from . import views

urlpatterns = [
    path("<str:author_slug>/<str:article_slug>/", views.get_article),
]
