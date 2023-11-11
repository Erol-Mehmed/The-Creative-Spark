from django.db import models


class User(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(default=None)
    password = models.CharField(default=None)
    photo = models.ImageField(default=None, blank=True, null=True)
    bio = models.CharField(max_length=2000, default=None, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


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
