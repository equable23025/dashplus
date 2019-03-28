# Generated by Django 2.1.7 on 2019-03-24 14:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='cardRecord',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idCard', models.CharField(max_length=100)),
                ('actionCard', models.CharField(max_length=50)),
                ('descCard', models.CharField(max_length=400)),
                ('commentCard', models.CharField(max_length=200)),
                ('listafterCard', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='changeReq',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amountChange', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='timeStamp',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('datetime', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AddField(
            model_name='changereq',
            name='timestamp',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.timeStamp'),
        ),
        migrations.AddField(
            model_name='cardrecord',
            name='timestamp',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.timeStamp'),
        ),
    ]