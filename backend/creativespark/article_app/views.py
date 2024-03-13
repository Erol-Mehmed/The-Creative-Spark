from rest_framework.response import Response
from rest_framework.decorators import api_view

from article_app.models import Article


@api_view(["GET"])
def get_article(request):
    print("get_articles")

    return Response('works')
