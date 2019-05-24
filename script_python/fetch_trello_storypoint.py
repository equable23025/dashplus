from requests import get
from psycopg2 import connect
from trello import TrelloClient
import requests 
import json
from array import *
from datetime import date
from datetime import datetime

#ย้่ายสถานะของงาน


# connection database user_board
con_user_board = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
con_user_board_database = con_user_board.cursor()
# for all user and muti board 
postgreSQL_select_Query_user_board = "select \"username\" ,\"board\"  from myapp_user_board "
con_user_board_database.execute(postgreSQL_select_Query_user_board)
ub = con_user_board_database.fetchall()
for user_board in ub :
	# connection database timeStamp
	conn = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	demoDatabases = conn.cursor()

	# select id timeStamp
	postgreSQL_select_Query_timeStamp = "SELECT max(timestamp_id) FROM public.myapp_card_movement_record where username = '"+user_board[0]+"' and board = '"+user_board[1]+"';"
	#  ORDER BY timestamp_id;
	demoDatabases.execute(postgreSQL_select_Query_timeStamp)
	idtimeStamp = demoDatabases.fetchall()
	use_idtimeStamp = []
	for row in idtimeStamp :
		use_idtimeStamp.append(row[0])
		# print(row[0])
	# print(len(use_idtimeStamp))
	# print(user_board[0],user_board[1])

	conn3 = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	demoDatabases3 = conn3.cursor()
		
	# connect to compare table 1
	conntable1 = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	table1 = conntable1.cursor()
	# connect to compare table 2
	conntable2 = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	table2 = conntable2.cursor()

	# connection database gettoken
	con_register_id = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	con_register_id_database = con_register_id.cursor()
	
	# get token user == user
	postgreSQL_select_Query_register= "select \"trello_token\"  from myapp_register_id  where \"username\" = '"+user_board[0]+"'"
	con_register_id_database.execute(postgreSQL_select_Query_register)
	rg = con_register_id_database.fetchall()
	token = rg[0][0]

	# customfield in bord
	id_size_storypoint = []
	size_storypoint = []
	url_custom = 'https://api.trello.com/1/board/'+str(user_board[1])+'/customFields?key=6aa466b0416e7930b5889b667bbda4ee&token='+str(token);
	apiTrello_custom = requests.get(url_custom)
	data_json_custom = apiTrello_custom.json()
	for custom_field in data_json_custom :
		if str(custom_field['name']) == 'size' or str(custom_field['name']) == 'Size' or str(custom_field['name']) == 'SIZE' :
			lenth = len(custom_field['options'])
			for i in range(lenth) :
				id_size_storypoint.append(custom_field['options'][i]['id'])
				size_storypoint.append(custom_field['options'][i]['value']['text'])

	# print(id_size_storypoint)
	# print(size_storypoint)
	# seleact all card DISTINCT
	demoDatabases3.execute("SELECT DISTINCT \"id_card\" FROM public.myapp_card_movement_record where username = '"+user_board[0]+"' and board = '"+user_board[1]+"' and timestamp_id ='"+str(use_idtimeStamp[0])+"' ")		
	for row in demoDatabases3 :

		# check list [state]
		list_card = ''
		try :
			url = 'https://api.trello.com/1/card/'+str(row[0])+'/list?key=6aa466b0416e7930b5889b667bbda4ee&token='+str(token);
			apiTrello = requests.get(url)
			data_json = apiTrello.json()
			# print(data_json['name'])
			list_card = str(data_json['name'])
		except Exception as e:
			list_card = "N/A"
		finally:
			pass


		# get_name card 
		name_card = ''
		try :
			url_name = 'https://api.trello.com/1/card/'+str(row[0])+'?key=6aa466b0416e7930b5889b667bbda4ee&token='+str(token);
			apiTrello_name = requests.get(url_name)
			data_json_name = apiTrello_name.json()
			name_card = str(data_json_name['name'])
			# print(name_card)		
		except Exception as e:
			pass
		finally:
			pass

		# check value storypoint_id 
		storypoint = ''
		if list_card != 'done' and list_card != 'N/A':
			# print(list_card)
			

			# บางการ์ดมี custom บางการ์ดไม่มี
			try :
				url_storypoint_id = 'https://api.trello.com/1/card/'+str(row[0])+'/customFieldItems?key=6aa466b0416e7930b5889b667bbda4ee&token='+str(token);
				apiTrello_storypoint_id = requests.get(url_storypoint_id)
				data_json_storypoint_id = apiTrello_storypoint_id.json()
				print(str(row[0]))
				try :
					for data in data_json_storypoint_id :
						for i in range(len(id_size_storypoint)):
							if str(id_size_storypoint[i]) == str(data['idValue']):
								storypoint = str(size_storypoint[i])
						# print("idValue")
						# print(data['idValue'])
						# keep_check_storypoint_id.append(data['idValue'])
					if storypoint != '' :
						storypoint = storypoint.upper()
						# print("Story point " + str(storypoint))
						# connect to card_storypoint
						connChange = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
						tableChange = connChange.cursor()

						tableChange.execute("INSERT INTO myapp_card_storypoint  (\"username\", \"board\" , \"card_name\" , \"storypoint\" , timestamp)VALUES ('{}','{}', '{}','{}','{}')".format(user_board[0],user_board[1],name_card,storypoint,str(use_idtimeStamp[0])))
						connChange.commit()
	
				except Exception as e:
					pass
				finally:
					pass


			except Exception as e:
				storypoint_id = "N/A"
			finally:
				pass
	

	conn.close()
	conntable1.close()
	conntable2.close()
conn3.close()
connChange.close()
con_user_board.close()