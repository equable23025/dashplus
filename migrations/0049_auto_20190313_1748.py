# Generated by Django 2.0.6 on 2019-03-13 10:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0048_changereq'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='changereq',
            name='timestamp',
        ),
        migrations.DeleteModel(
            name='changeReq',
        ),
    ]
