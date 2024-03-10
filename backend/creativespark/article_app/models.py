from django.db import models
from users_app.models import User
from autoslug import AutoSlugField


class Article(models.Model):
    author = models.ForeignKey(User, on_delete=models.PROTECT)
    title = models.CharField(max_length=500, default=None)
    slug = AutoSlugField(populate_from="title")
    content = models.TextField(default=None)
    topic = models.CharField(max_length=100, default=None)
    image = models.ImageField(upload_to="article_images/")
    claps = models.IntegerField(default=0)
    read_time = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(default=None, blank=True, null=True)
