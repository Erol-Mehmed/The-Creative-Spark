# Generated by Django 4.2.6 on 2023-11-25 22:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('all_articles_app', '0002_alter_article_author'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='image',
            field=models.ImageField(default='NULL', upload_to=''),
            preserve_default=False,
        ),
    ]