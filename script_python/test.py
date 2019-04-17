from requests import get
from psycopg2 import connect
from trello import TrelloClient
import requests 
import json
from array import *
from datetime import date
from datetime import datetime

# connection database user_board
con_user_board = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
con_user_board_database = con_user_board.cursor()



# for all user and muti board 
postgreSQL_select_Query_user_board = "select \"username\" ,\"board\"  from myapp_user_board "
con_user_board_database.execute(postgreSQL_select_Query_user_board)
ub = con_user_board_database.fetchall()

# for all user and muti board
for user in ub :
	print(user[0])
	print(user[1])
	# get token user == user
	# connection database gettoken
	con_register_id = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	con_register_id_database = con_register_id.cursor()
	postgreSQL_select_Query_register= "select \"trello_token\"  from myapp_register_id  where \"username\" = "+"'"+user[0]+"'"
	con_register_id_database.execute(postgreSQL_select_Query_register)
	rg = con_register_id_database.fetchall()
	token =rg[0][0]
	# for token in rg :
	# 	print(token[0])
	# token = token[0]
	print(token)