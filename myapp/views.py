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
from myapp.models import change_record   , user_board , change_effort_record , change_movement_record
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from myapp.forms import register_form , register_token_form , user_board_form , email_form
# from django import HttpResponse
from django.http import HttpResponse
# import re
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
# from django.utils import simplejson as json
import json



def dataToChart(request):
	user = request.session['member_id']
	data = change_record.objects.all()

	con_register_id = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	con_register_id_database = con_register_id.cursor()
	# get token user == user
	postgreSQL_select_Query_register= "select \"trello_token\"  from myapp_register_id  where \"username\" = '"+str(user)+"'"
	con_register_id_database.execute(postgreSQL_select_Query_register)
	rg = con_register_id_database.fetchall()
	token = ''
	for token_check in rg :
		token = str(token_check[0])
		print(token)
	# name board
	conn = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	user_board_database = conn.cursor()
	postgreSQL_select_Query = "select DISTINCT \"board\" from public.myapp_user_board where username = '"+str(user)+"';"
	user_board_database.execute(postgreSQL_select_Query)
	check_board = user_board_database.fetchall()
	# check user and board
	board_name = []
	board_id = []
	for row in check_board :
		url =  'https://api.trello.com/1/board/'+str(row[0])+'?key=6aa466b0416e7930b5889b667bbda4ee&token='+str(token)
		# print(url)
		apiTrello = requests.get(url)
		data_json = apiTrello.json()
		board_name.append(data_json['name'])
		board_id.append(row[0])

	return render(request,'scope-change.html',{'username':user,'data': data,'board_name' : board_name,'board_id': board_id})

def dataEffortToChart(request):
	user = request.session['member_id']
	data = change_effort_record.objects.all()

	con_register_id = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	con_register_id_database = con_register_id.cursor()
	# get token user == user
	postgreSQL_select_Query_register= "select \"trello_token\"  from myapp_register_id  where \"username\" = '"+str(user)+"'"
	con_register_id_database.execute(postgreSQL_select_Query_register)
	rg = con_register_id_database.fetchall()
	token = ''
	for token_check in rg :
		token = str(token_check[0])
		print(token)
	# name board
	conn = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	user_board_database = conn.cursor()
	postgreSQL_select_Query = "select DISTINCT \"board\" from public.myapp_user_board where username = '"+str(user)+"';"
	user_board_database.execute(postgreSQL_select_Query)
	check_board = user_board_database.fetchall()
	# check user and board
	board_name = []
	board_id = []
	for row in check_board :
		url =  'https://api.trello.com/1/board/'+str(row[0])+'?key=6aa466b0416e7930b5889b667bbda4ee&token='+str(token)
		# print(url)
		apiTrello = requests.get(url)
		data_json = apiTrello.json()
		board_name.append(data_json['name'])
		board_id.append(row[0])

	return render(request,'effort-change.html',{'username':user,'data': data ,'board_name' : board_name,'board_id': board_id})	

def dataMovementToChart(request):
	user = request.session['member_id']
	data = change_movement_record.objects.all()

	con_register_id = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	con_register_id_database = con_register_id.cursor()
	# get token user == user
	postgreSQL_select_Query_register= "select \"trello_token\"  from myapp_register_id  where \"username\" = '"+str(user)+"'"
	con_register_id_database.execute(postgreSQL_select_Query_register)
	rg = con_register_id_database.fetchall()
	token = ''
	for token_check in rg :
		token = str(token_check[0])
		print(token)
	# name board
	conn = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	user_board_database = conn.cursor()
	postgreSQL_select_Query = "select DISTINCT \"board\" from public.myapp_user_board where username = '"+str(user)+"';"
	user_board_database.execute(postgreSQL_select_Query)
	check_board = user_board_database.fetchall()
	# check user and board
	board_name = []
	board_id = []
	for row in check_board :
		url =  'https://api.trello.com/1/board/'+str(row[0])+'?key=6aa466b0416e7930b5889b667bbda4ee&token='+str(token)
		# print(url)
		apiTrello = requests.get(url)
		data_json = apiTrello.json()
		board_name.append(data_json['name'])
		board_id.append(row[0])
		
	return render(request,'movement-change.html',{'username':user,'data': data,'board_name' : board_name,'board_id': board_id})

def home_to_register(request):
	user = request.session['member_id']
	conn = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	user_board_database = conn.cursor()
	postgreSQL_select_Query = "select DISTINCT \"board\" from public.myapp_user_board where username = '"+user+"';"
	user_board_database.execute(postgreSQL_select_Query)
	check_board = user_board_database.fetchall()
	# check user and board
	board = []
	for row in check_board :
		board.append(row[0])
	# json_board = json.dumps(board)
	# json_board.strip().split('"')
	# print(json_board)

	conn.close()
	return render(request,'home.html',{'username':user,'board':board})

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
			conn.close()
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
		return HttpResponseRedirect("/scope-change",{'user':user})
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
        	return HttpResponseRedirect("/introduction",{'user':username})
    else:
        messages.warning(request, 'เข้าสู่ระบบล้มเหลว')
        return render(request,'login.html')


def logout(request):
    try:
        del request.session['member_id']
    except KeyError:
        pass
    return HttpResponseRedirect("/login")

def introduction(request):
	user = request.session['member_id']
	con_register_id = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	con_register_id_database = con_register_id.cursor()
	# get token user == user
	postgreSQL_select_Query_register= "select \"trello_token\"  from myapp_register_id  where \"username\" = '"+str(user)+"'"
	con_register_id_database.execute(postgreSQL_select_Query_register)
	rg = con_register_id_database.fetchall()
	token = ''
	for token_check in rg :
		token = str(token_check[0])
		print(token)
	# name board
	conn = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	user_board_database = conn.cursor()
	postgreSQL_select_Query = "select DISTINCT \"board\" from public.myapp_user_board where username = '"+str(user)+"';"
	user_board_database.execute(postgreSQL_select_Query)
	check_board = user_board_database.fetchall()
	# check user and board
	board_name = []
	for row in check_board :
		url =  'https://api.trello.com/1/board/'+str(row[0])+'?key=6aa466b0416e7930b5889b667bbda4ee&token='+str(token)
		# print(url)
		apiTrello = requests.get(url)
		data_json = apiTrello.json()
		board_name.append(data_json['name'])

	return render(request,'introduction.html',{'username':user,'board_name' : board_name})	

from django.core.mail import BadHeaderError, send_mail
from django.conf import settings
from django.core.mail import EmailMessage

def forgetpassword(request):
	
	if request.method == 'POST':
		# form = UserCreationForm(request.POST)
		form = email_form(request.POST)
		email = request.POST.get("email")

		con_register_id = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
		con_register_id_database = con_register_id.cursor()
		# get token user == user
		postgreSQL_select_Query_register= "select \"password\"  from myapp_register_id  where \"email\" = '"+str(email)+"'"
		con_register_id_database.execute(postgreSQL_select_Query_register)
		rg = con_register_id_database.fetchall()
		password = ''
		for password_check in rg :
			password = str(password_check[0])
			print(password)

		# print(user)
		subject = 'Your password in Application DashPlus.....'
		message = 'Your password in Application DashPlus.....\n' + "password : " + password
		email_from = settings.EMAIL_HOST_USER
		recipient_list = [email,'']
		try:
			send_mail( subject, message, email_from, recipient_list, fail_silently =False)
			return redirect("/login")
		except BadHeaderError:
		# except Exception:
			return HttpResponse('Invalid header found.')
	else:
		form = email_form()
	return render(request,'forgetpassword.html',{'form':form})
