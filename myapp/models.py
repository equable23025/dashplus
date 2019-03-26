from django.db import models
from django.contrib.postgres.fields import JSONField

class time_stamp(models.Model):

	datetime = models.DateTimeField(auto_now_add=True)

class card_record(models.Model):

	idCard=models.CharField(max_length=100)
	actionCard=models.CharField(max_length=50)
	descCard=models.CharField(max_length=400)
	commentCard=models.CharField(max_length=200)
	listafterCard =models.CharField(max_length=50)
	timestamp=models.ForeignKey(time_stamp,on_delete=models.CASCADE)


class change_record(models.Model):
	amountChange=models.IntegerField(default=0)
	# amountChange = JSONField()
	timestamp=models.ForeignKey(time_stamp,on_delete=models.CASCADE)
