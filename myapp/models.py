from django.db import models
from django.contrib.postgres.fields import JSONField


class time_stamp(models.Model):
	datetime = models.DateTimeField(auto_now_add=True)

class card_record(models.Model):
	username =models.CharField(max_length=100)
	board =models.CharField(max_length=500)
	id_card=models.CharField(max_length=100)
	action_card=models.CharField(max_length=50)
	desc_card=models.CharField(max_length=400)
	comment_card=models.CharField(max_length=200)
	listafter_card =models.CharField(max_length=50)
	timestamp=models.ForeignKey(time_stamp,on_delete=models.CASCADE)
	


class change_record(models.Model):
	username =models.CharField(max_length=100)
	board =models.CharField(max_length=500)
	amount_change=models.IntegerField(default=0)
	# timestamp=models.ForeignKey(time_stamp,on_delete=models.CASCADE)
	timestamp=models.IntegerField(default='0')

class register_id(models.Model):
	username =models.CharField(max_length=100)
	password =models.CharField(max_length=100)
	trello_token =models.CharField(max_length=100)
	first_name=models.CharField(max_length=100)
	last_name=models.CharField(max_length=100)
	birth_date=models.CharField(max_length=100)
	telephone=models.CharField(max_length=100)
	email=models.CharField(max_length=100)

class user_board(models.Model):
	username =models.CharField(max_length=100)
	board =models.CharField(max_length=500)



class card_effort_record(models.Model):
	username =models.CharField(max_length=100)
	board =models.CharField(max_length=100)
	id_card=models.CharField(max_length=100)
	action_card=models.CharField(max_length=100)
	custom_name=models.CharField(max_length=100)
	current_value=models.CharField(max_length=100)
	old_value=models.CharField(max_length=100)
	timestamp=models.ForeignKey(time_stamp,on_delete=models.CASCADE)


class change_effort_record(models.Model):
	username =models.CharField(max_length=100)
	board =models.CharField(max_length=500)
	amount_change=models.IntegerField(default=0)
	timestamp=models.IntegerField(default='0')

