from django.db import models
from django.contrib.postgres.fields import JSONField

class timeStamp(models.Model):

	datetime = models.DateTimeField(auto_now_add=True)

class cardRecord(models.Model):

	idCard=models.CharField(max_length=100)
	actionCard=models.CharField(max_length=50)
	descCard=models.CharField(max_length=400)
	commentCard=models.CharField(max_length=200)
	listafterCard =models.CharField(max_length=50)
	timestamp=models.ForeignKey(timeStamp,on_delete=models.CASCADE)


class changeReq(models.Model):
	amountChange=models.IntegerField(default=0)
	# amountChange = JSONField()
	timestamp=models.ForeignKey(timeStamp,on_delete=models.CASCADE)
