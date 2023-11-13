from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Article
from login_signup_app.models import User

@api_view(["GET"])
def getMostLikedArticles(request):
    section = request.GET.get("section")

    if section == "most-liked-articles":
        users = User.objects.all().order_by("id").values()
        sorted_articles = Article.objects.all().order_by("-claps").values()
        most_liked_articles = []
        user_names = [user["name"] for user in users]

        for i in range(6):
            if (
                i + 1 == 6
                and sorted_articles[i]["claps"] == sorted_articles[i + 1]["claps"]
            ):
                if (
                    sorted_articles[i]["created_at"]
                    > sorted_articles[i + 1]["created_at"]
                ):
                    most_liked_articles.append(
                        {
                            "id": sorted_articles[i]["creator_id"],
                            "author": user_names[sorted_articles[i]["creator_id"] - 1],
                            "article": sorted_articles[i],
                        },
                    )
                else:
                    most_liked_articles.append(
                        {
                            "id": sorted_articles[i + 1]["creator_id"],
                            "author": user_names[
                                sorted_articles[i + 1]["creator_id"] - 1
                            ],
                            "article": sorted_articles[i + 1],
                        },
                    )
            else:
                most_liked_articles.append(
                    {
                        "id": sorted_articles[i]["creator_id"],
                        "author": user_names[sorted_articles[i]["creator_id"] - 1],
                        "article": sorted_articles[i],
                    },
                )

        return Response(most_liked_articles)
    else:
        all_articles = Article.objects.all().order_by("-created_at").values()
        return Response(all_articles)
