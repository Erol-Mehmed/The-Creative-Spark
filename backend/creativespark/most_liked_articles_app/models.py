from django.db import models
from login_signup_app.models import User


class Comment(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(default=None)
    claps = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)


class Article(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=500, default=None)
    content = models.TextField(default=None)
    claps = models.IntegerField(default=0)
    comment = models.ForeignKey(
        Comment, on_delete=models.CASCADE, blank=True, null=True
    )
    read_time = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
