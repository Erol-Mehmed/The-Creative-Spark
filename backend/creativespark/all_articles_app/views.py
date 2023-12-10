from rest_framework.response import Response
from rest_framework.decorators import api_view

from all_articles_app.models import Article
from users_app.models import User


@api_view(["GET"])
def get_articles(request):
    section = request.GET.get("section")
    current_articles_arr = []
    users = User.objects.all().order_by("id").values()
    user_names = [user["name"] for user in users]
    articles_arr = []

    if section == "most-liked-articles":
        current_articles_arr = Article.objects.all().order_by("-claps").values()
    else:
        current_articles_arr = Article.objects.all().order_by("-created_at").values()

    current_articles_arr_length = (
        6 if section == "most-liked-articles" else len(current_articles_arr)
    )

    for i in range(current_articles_arr_length):
        if (
            i + 1 == 6
            and section == "most-liked-articles"
            and current_articles_arr[i]["claps"] == current_articles_arr[i + 1]["claps"]
        ):
            if (
                current_articles_arr[i]["created_at"]
                > current_articles_arr[i + 1]["created_at"]
            ):
                articles_arr.append(
                    {
                        "id": current_articles_arr[i]["author_id"],
                        "author": user_names[current_articles_arr[i]["author_id"] - 1],
                        "article": current_articles_arr[i],
                    },
                )
            else:
                articles_arr.append(
                    {
                        "id": current_articles_arr[i + 1]["author_id"],
                        "author": user_names[
                            current_articles_arr[i + 1]["author_id"] - 1
                        ],
                        "article": current_articles_arr[i + 1],
                    },
                )
        else:
            articles_arr.append(
                {
                    "id": current_articles_arr[i]["author_id"],
                    "author": user_names[current_articles_arr[i]["author_id"] - 1],
                    "article": current_articles_arr[i],
                },
            )

    return Response(articles_arr)
