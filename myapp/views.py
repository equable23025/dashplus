from requests import get
from psycopg2 import connect
from django.shortcuts import render, redirect
from trello import TrelloClient
import requests 
import json
from django.http import JsonResponse
from array import *
from json.decoder import JSONDecodeError
from datetime import date
from datetime import datetime
from myapp.models import change_record   , user_board
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from myapp.forms import register_form , register_token_form , user_board_form
# from django import HttpResponse
from django.http import HttpResponse
import re
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User


def dataToChart(request):
	data = change_record.objects.all()
	return render(request,'project-planning.html',{'data': data})
		
def home_to_register(request):
	return render(request,'home.html')

def register(request):
	if request.method == 'POST':
		# form = UserCreationForm(request.POST)
		form =register_form(request.POST)
		if form.is_valid():
			form.save()
			# username = form.cleaned_data.get('username')
			# messages.success(request , f'success')
			conn = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
			user_database = conn.cursor()
			postgreSQL_select_Query = "select \"username\", \"email\" ,\"password\" from public.myapp_register_id ;"
			user_database.execute(postgreSQL_select_Query)
			create_user = user_database.fetchall()
			u1 = ''
			u2 = ''
			u3 = ''
			for row in create_user :
				u1 = row[0]
				u2 = row[1]
				u3 = row[2]
			# print(u1,u2,u3)
			user = User.objects.create_user(u1,u2,u3)
			user.save()
			# ยังไม่เช็ค id ที่มีอยู่แล้ว
			# user = User.objects.create_user('john', 'lennon@thebeatles.com', 'johnpassword')

			return redirect("/login")
			# return HttpResponseRedirect("https://trello.com/1/authorize?expiration=1day&name=DashPlus&scope=read&response_type=token&key=6aa466b0416e7930b5889b667bbda4ee&callback_method=fragment&return_url=http://localhost:8000/token/")
	else:
		form = register_form()
	return render(request,'regis.html',{'form':form})

def addboard(request):
	user = request.session['member_id']
	if request.method == 'POST':
		# form = UserCreationForm(request.POST)
		form =user_board_form(request.POST)
		if form.is_valid():
			form.save()
	else:
		form = user_board_form()
	# username = request.POST.get('usern')
	# board = request.POST.get('board')
	# board_object = user_board.objects.create(username=username,board=board)
	# board_object.save()
	return render(request,'addboard.html',{'username':user,'form':form})

from django.contrib.auth import authenticate, login as auth_login

def login(request):
    username = request.POST.get('uname')
    password = request.POST.get('psw')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        auth_login(request, user)   
        #save session in site 
        request.session['member_id'] = username 
        if request.session.has_key('member_id'):
        	username = request.session['member_id']
        # Set session as modified to force data updates/cookie to be saved.
        	request.session.modified = True
        	return HttpResponseRedirect("/addboard",{'user':username})
    else:
        messages.info(request, 'เข้าสู่ระบบล้มเหลว')
        return render(request,'login.html')


def logout(request):
    try:
        del request.session['member_id']
    except KeyError:
        pass
    return HttpResponse("ออกจากระบบแล้ว")


    