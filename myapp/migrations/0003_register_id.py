# Generated by Django 2.0.6 on 2019-04-08 14:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_auto_20190327_2212'),
    ]

    operations = [
        migrations.CreateModel(
            name='register_id',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('trello_token', models.CharField(max_length=100)),
            ],
        ),
    ]
