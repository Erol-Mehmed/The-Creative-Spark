# Generated by Django 4.2.6 on 2023-12-17 14:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='updated_at',
            field=models.DateTimeField(blank=True, default=None, null=True),
        ),
    ]
