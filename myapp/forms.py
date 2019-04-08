from django import forms
# from django.contrib.auth.models import register_id
from django.contrib.auth.forms import UserCreationForm
from myapp.models import register_id

class register_form(forms.ModelForm):
	class Meta:
		model = register_id
		fields = ['username','password','trello_token','first_name','last_name','birth_date','telephone','email']
    