# Generated by Django 4.2.6 on 2023-10-31 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('creativesparkapp', '0002_comment_article_commentid'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='readTime',
            field=models.IntegerField(default=0),
        ),
    ]
