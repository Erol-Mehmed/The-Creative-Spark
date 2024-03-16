from rest_framework.response import Response
from rest_framework.decorators import api_view

from article_app.models import Article


@api_view(["GET"])
def get_article(request, article_slug):
    print("get_articles:", article_slug)

    return Response('works')
