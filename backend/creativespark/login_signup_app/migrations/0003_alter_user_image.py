# Generated by Django 4.2.6 on 2023-12-02 21:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('login_signup_app', '0002_rename_photo_user_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='image',
            field=models.ImageField(blank=True, default=None, null=True, upload_to='user_images/'),
        ),
    ]
