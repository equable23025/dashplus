# Generated by Django 2.0.6 on 2019-04-25 09:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0020_auto_20190425_1556'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='card_record_effort',
            name='timestamp',
        ),
        migrations.DeleteModel(
            name='change_effort_record',
        ),
        migrations.DeleteModel(
            name='card_record_effort',
        ),
    ]
