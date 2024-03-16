from rest_framework.response import Response
from rest_framework.decorators import api_view

from article_app.models import Article
from users_app.models import User


@api_view(["GET"])
def get_articles(request):
    section = request.GET.get("section")
    articles = Article.objects.all()
    author_ids = [article.author_id for article in articles]
    users = User.objects.filter(id__in=author_ids).values()
    user_names = {user["id"]: user["name"] for user in users}
    author_articles = []
    current_articles_length = len(articles) if len(articles) < 6 else 6

    if section == "most-liked-articles":
        articles = articles.order_by("-claps").values()
    else:
        articles = articles.order_by("-created_at").values()

    if section == "most-liked-articles":
        for i in range(current_articles_length):
            next_article_claps = articles[i + 1]["claps"] if i + 1 < len(articles) else False

            if (
                i == 5
                and articles[i]["claps"]
                == next_article_claps
            ):
                if (
                    articles[i]["created_at"]
                    > articles[i + 1]["created_at"]
                ):
                    author_articles.append(
                        {
                            "author": {
                                "name": user_names[articles[i]["author_id"]],
                                "slug": User.objects.filter(
                                    id=articles[i]["author_id"]
                                ).values()[0]["slug"],
                            },
                            "article": articles[i],
                        },
                    )
                else:
                    author_articles.append(
                        {
                            "author": {
                                "name": user_names[articles[i + 1]["author_id"]],
                                "slug": User.objects.filter(
                                    id=articles[i + 1]["author_id"]
                                ).values()[0]["slug"],
                            },
                            "article": articles[i + 1],
                        },
                    )
            elif i < len(articles):
                author_articles.append(
                    {
                        "author": {
                            "name": user_names[articles[i]["author_id"]],
                            "slug": User.objects.filter(
                                id=articles[i]["author_id"]
                            ).values()[0]["slug"],
                        },
                        "article": articles[i],
                    },
                )
            else:
                print("i is greater than len(articles", i)
                return Response(author_articles)

        return Response(author_articles)
    else:
        for i in range(len(articles)):
            author_articles.append(
                {
                    "author": {
                        "name": user_names[articles[i]["author_id"]],
                        "slug": User.objects.filter(
                            id=articles[i]["author_id"]
                        ).values()[0]["slug"],
                    },
                    "article": articles[i],
                },
            )

        return Response(author_articles)


@api_view(["GET"])
def get_articles_by_user(request, author_username):
    author_id = User.objects.filter(slug=author_username).values()[0]["id"]
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
