# Generated by Django 2.0.6 on 2019-04-15 16:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0016_card_record_timestamp'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='card_record',
            name='timestamp',
        ),
    ]
