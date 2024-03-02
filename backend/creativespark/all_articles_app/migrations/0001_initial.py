# Generated by Django 4.2.6 on 2023-12-10 00:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default=None, max_length=500)),
                ('content', models.TextField(default=None)),
                ('topic', models.CharField(default=None, max_length=100)),
                ('image', models.ImageField(upload_to='article_images/')),
                ('claps', models.IntegerField(default=0)),
                ('read_time', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='users_app.user')),
            ],
        ),
    ]