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

# dri2ZNet

# for all user and muti board 
postgreSQL_select_Query_user_board = "select \"username\" ,\"board\"  from myapp_user_board "
con_user_board_database.execute(postgreSQL_select_Query_user_board)
ub = con_user_board_database.fetchall()

# for all user and mutiple board

for user in ub :
	
	# username
	print(user[0])
	# board
	print(user[1])
	

	# connection database gettoken
	con_register_id = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	con_register_id_database = con_register_id.cursor()
	# get token user == user
	postgreSQL_select_Query_register= "select \"trello_token\"  from myapp_register_id  where \"username\" = '"+user[0]+"'"
	con_register_id_database.execute(postgreSQL_select_Query_register)
	rg = con_register_id_database.fetchall()
	token = rg[0][0]
	# connection database timeStamp
	conn = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	demoDatabases = conn.cursor()
	# connect  database CardRecord
	conn2 = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	demoDatabases2 = conn2.cursor()

	# date - time
	from datetime import time
	datetimes = datetime.now()
	todayzone = datetimes.strftime("%x")
	formatedDate = datetimes.strftime("%Y-%m-%d %H:%M:%S")

	# Insert to database time_stamp
	demoDatabases.execute("INSERT INTO myapp_time_stamp_movement  (\"datetime\"  )VALUES ('{}')".format(formatedDate))
	conn.commit()

	# connection API Trello

	url = 'https://api.trello.com/1/board/'+str(user[1])+'/actions?key=6aa466b0416e7930b5889b667bbda4ee&token='+str(token)
	print(url)
	apiTrello = requests.get(url)
	data_json = apiTrello.json()

	# select id timeStamp
	postgreSQL_select_Query_timeStamp = "select \"id\"  from myapp_time_stamp_movement "
	demoDatabases.execute(postgreSQL_select_Query_timeStamp)
	idtimeStamp = demoDatabases.fetchall()
	use_idtimeStamp = ''
	for row in idtimeStamp :
		use_idtimeStamp = row[0]
	# idLength 
	idLength = int(use_idtimeStamp) + 1
	# getJson + addData to cardRecord
	for historycard in data_json :
		try:
		# insert to database card_record
			r1 = str(historycard['data']['card']['id'])
			r2 = str(historycard['type'])
			r3 = ''
				
			try:
				r3 = str(historycard['data']['listAfter']['name'])
			except KeyError as e:
				r3 = "N/A"
			finally:
				pass
					
			r4 = ''
			try:
				r4 = str(historycard['data']['listBefore']['name'])
			except KeyError as e:
				r4 = "N/A"
			finally:
				pass

			r5 = str(use_idtimeStamp)
			r6 = str(user[0])
			r7 = str(user[1])

			print(r1,r2,r3,r4,r5,r6,r7)

			demoDatabases2.execute("INSERT INTO myapp_card_movement_record  (\"id_card\", \"action_card\", \"listafter_movement_card\", \"listbefore_movement_card\" ,\"timestamp_id\" ,\"username\" , \"board\")VALUES ('{}', '{}', '{}', '{}', '{}', '{}', '{}')".format(r1,r2,r3,r4,r5,r6,r7))
			conn2.commit()
		except KeyError as e:
			pass
		finally:
			pass


	conn.close()
	conn2.close()
	con_register_id.close()

con_user_board.close()
