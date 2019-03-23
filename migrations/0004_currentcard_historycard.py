# Generated by Django 2.0.6 on 2019-02-17 12:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('myapp', '0003_auto_20190217_1934'),
    ]

    operations = [
        migrations.CreateModel(
            name='currentCard',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idCard', models.CharField(max_length=100)),
                ('typeCard', models.CharField(max_length=50)),
                ('date', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='historyCard',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idCard', models.CharField(max_length=100)),
                ('typeCard', models.CharField(max_length=50)),
                ('compare', models.CharField(max_length=50)),
                ('date', models.CharField(max_length=50)),
            ],
        ),
    ]
