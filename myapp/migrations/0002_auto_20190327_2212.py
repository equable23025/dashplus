# Generated by Django 2.0.6 on 2019-03-27 15:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='cardRecord',
            new_name='card_record',
        ),
        migrations.RenameModel(
            old_name='changeReq',
            new_name='change_record',
        ),
        migrations.RenameModel(
            old_name='timeStamp',
            new_name='time_stamp',
        ),
        migrations.RenameField(
            model_name='card_record',
            old_name='actionCard',
            new_name='action_card',
        ),
        migrations.RenameField(
            model_name='card_record',
            old_name='commentCard',
            new_name='comment_card',
        ),
        migrations.RenameField(
            model_name='card_record',
            old_name='descCard',
            new_name='desc_card',
        ),
        migrations.RenameField(
            model_name='card_record',
            old_name='idCard',
            new_name='id_card',
        ),
        migrations.RenameField(
            model_name='card_record',
            old_name='listafterCard',
            new_name='listafter_card',
        ),
        migrations.RenameField(
            model_name='change_record',
            old_name='amountChange',
            new_name='amount_change',
        ),
    ]
