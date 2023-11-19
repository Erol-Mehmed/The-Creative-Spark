from django.db import models
from login_signup_app.models import User


class Comment(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(default=None)
    claps = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
