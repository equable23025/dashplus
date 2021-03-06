# Generated by Django 2.0.6 on 2019-03-13 10:50

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0049_auto_20190313_1748'),
    ]

    operations = [
        migrations.CreateModel(
            name='changeReq',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amountChange', django.contrib.postgres.fields.jsonb.JSONField()),
                ('timestamp', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.timeStamp')),
            ],
        ),
    ]
