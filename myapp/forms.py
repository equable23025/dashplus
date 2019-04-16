from django import forms
# from django.contrib.auth.models import register_id
from django.contrib.auth.forms import UserCreationForm
from myapp.models import register_id , user_board

class register_form(forms.ModelForm):
	class Meta:
		model = register_id
		fields = ['first_name','last_name','birth_date','telephone','email','trello_token','username','password']

# save token
class register_token_form(forms.ModelForm):
	class Meta:
		model = register_id
		fields = ['trello_token']

class user_board_form(forms.ModelForm):
	class Meta:
		model = user_board
		fields = ['username','board']
