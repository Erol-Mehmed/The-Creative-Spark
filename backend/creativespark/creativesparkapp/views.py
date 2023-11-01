from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import User, Article


@api_view(["GET"])
def getData(request):
    users = User.objects.all()
    articles = Article.objects.all()
    arr = []
    
    for user in users:
        arr.append(user.name)

    for article in articles:
        arr.append(article.content)

    print(arr)

    # return Response('From the server!')
    return Response(arr)
