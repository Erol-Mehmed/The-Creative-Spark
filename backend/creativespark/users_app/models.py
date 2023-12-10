from django.db import models

class User(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(default=None)
    password = models.CharField(default=None)
    image = models.ImageField(default=None, blank=True, null=True, upload_to='user_images/')
    bio = models.CharField(max_length=2000, default=None, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)