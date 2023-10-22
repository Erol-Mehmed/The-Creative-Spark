from django.db import models

class User(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField
    photo = models.ImageField
    bio = models.CharField

class Article(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField
    content = models.TextField
    claps = models.IntegerField
    comments = models.TextField
    readTime = models.IntegerField
    date = models.DateField
