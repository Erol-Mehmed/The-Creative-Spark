# Generated by Django 4.2.6 on 2023-10-31 18:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('creativesparkapp', '0004_rename_readtime_article_read_time_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='comment',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='creativesparkapp.comment'),
        ),
    ]