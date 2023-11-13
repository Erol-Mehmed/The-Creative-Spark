# Generated by Django 4.2.6 on 2023-11-13 22:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('login_signup_app', '0001_initial'),
        ('most_liked_articles_app', '0009_user_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login_signup_app.user'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login_signup_app.user'),
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]
