from django.urls import path
from . import views

urlpatterns = [
    path("<slug:author_username>/<slug:article_name>", views.get_article),
]
