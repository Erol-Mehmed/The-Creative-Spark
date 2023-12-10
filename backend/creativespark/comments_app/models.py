from django.db import models
from users_app.models import User
from all_articles_app.models import Article


class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.PROTECT)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    content = models.TextField(default=None)
    claps = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
