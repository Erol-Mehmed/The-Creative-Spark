from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import User, Article


@api_view(["GET"])
def getData(request):
    users = User.objects.all()
    articles = Article.objects.all()

    for user in users:
        print(user.name)

    for article in articles:
        print(article.content)
        print(article.created_at)

    return Response("It works!")
