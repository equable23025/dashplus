from django.db import models
from django.contrib.postgres.fields import JSONField


class time_stamp(models.Model):
	datetime = models.DateTimeField(auto_now_add=True)

class card_record(models.Model):

	id_card=models.CharField(max_length=100)
	action_card=models.CharField(max_length=50)
	desc_card=models.CharField(max_length=400)
	comment_card=models.CharField(max_length=200)
	listafter_card =models.CharField(max_length=50)
	timestamp=models.ForeignKey(time_stamp,on_delete=models.CASCADE)


class change_record(models.Model):
	amount_change=models.IntegerField(default=0)
	timestamp=models.ForeignKey(time_stamp,on_delete=models.CASCADE)

