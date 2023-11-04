from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import User, Article


@api_view(["GET"])
def getData(request):
    most_liked_articles = []
    users = User.objects.all().order_by("id").values()
    user_names = [user["name"] for user in users]
    articles = Article.objects.all().order_by("-claps").values()
    
    print(user_names)

    for i in range(6):
        if i + 1 == 6 and articles[i]["claps"] == articles[i + 1]["claps"]:
            if articles[i]["created_at"] > articles[i + 1]["created_at"]:
                most_liked_articles.append(
                    {
                        "id": articles[i]["creator_id"],
                        "name": user_names[articles[i]["creator_id"] - 1],
                        "article": articles[i],
                    },
                )
            else:
                most_liked_articles.append(
                    {
                        "id": articles[i + 1]["creator_id"],
                        "name": user_names[articles[i + 1]["creator_id"] - 1],
                        "article": articles[i + 1],
                    },
                )
        else:
            most_liked_articles.append(
                {
                    "id": articles[i]["creator_id"],
                    "name": user_names[articles[i]["creator_id"] - 1],
                    "article": articles[i],
                },
            )

    return Response(most_liked_articles)
