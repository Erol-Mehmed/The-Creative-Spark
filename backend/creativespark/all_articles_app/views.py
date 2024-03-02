from rest_framework.response import Response
from rest_framework.decorators import api_view

from all_articles_app.models import Article
from users_app.models import User


@api_view(["GET"])
def get_articles(request):
    section = request.GET.get("section")
    current_author_articles = []
    users = User.objects.all().order_by("id").values()
    user_names = [user["name"] for user in users]
    author_articles = []

    if section == "most-liked-articles":
        current_author_articles = Article.objects.all().order_by("-claps").values()
    else:
        current_author_articles = Article.objects.all().order_by("-created_at").values()

    current_author_articles_length = (
        6 if section == "most-liked-articles" else len(current_author_articles)
    )

    for i in range(current_author_articles_length):
        if (
            i + 1 == 6
            and section == "most-liked-articles"
            and current_author_articles[i]["claps"]
            == current_author_articles[i + 1]["claps"]
        ):
            if (
                current_author_articles[i]["created_at"]
                > current_author_articles[i + 1]["created_at"]
            ):
                author_articles.append(
                    {
                        "author": {
                            "name": user_names[
                                current_author_articles[i]["author_id"] - 1
                            ],
                            "slug": User.objects.filter(
                                id=current_author_articles[i]["author_id"]
                            ).values()[0]["slug"],
                        },
                        "article": current_author_articles[i],
                    },
                )
            else:
                author_articles.append(
                    {
                        "author": {
                            "name": user_names[
                                current_author_articles[i + 1]["author_id"] - 1
                            ],
                            "slug": User.objects.filter(
                                id=current_author_articles[i + 1]["author_id"]
                            ).values()[0]["slug"],
                        },
                        "article": current_author_articles[i + 1],
                    },
                )
        else:
            author_articles.append(
                {
                    "author": {
                        "name": user_names[current_author_articles[i]["author_id"] - 1],
                        "slug": User.objects.filter(
                            id=current_author_articles[i]["author_id"]
                        ).values()[0]["slug"],
                    },
                    "article": current_author_articles[i],
                },
            )

    return Response(author_articles)


@api_view(["GET"])
def get_articles_by_user(request, slug):
    author_id = User.objects.filter(slug=slug).values()[0]["id"]
    author_data = User.objects.filter(id=author_id).values()[0]
    articles = (
        Article.objects.filter(author_id=author_id).order_by("-created_at").values()
    )
    author_articles = []

    for i in range(len(articles)):
        author_articles.append(
            {
                "author": author_data,
                "article": articles[i],
            }
        )

    return Response(author_articles)
