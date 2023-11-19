from django.db import models
from login_signup_app.models import User


class Article(models.Model):
    author = models.ForeignKey(User, on_delete=models.PROTECT)
    title = models.CharField(max_length=500, default=None)
    content = models.TextField(default=None)
    claps = models.IntegerField(default=0)
    read_time = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
