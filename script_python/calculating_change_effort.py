from requests import get
from psycopg2 import connect
from trello import TrelloClient
import requests 
import json
from array import *
from datetime import date
from datetime import datetime

# เน้น size
# เน้น category

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
	postgreSQL_select_Query_timeStamp = "SELECT DISTINCT timestamp_id FROM public.myapp_card_effort_record where username = '"+user_board[0]+"' and board = '"+user_board[1]+"' ORDER BY timestamp_id;"
	demoDatabases.execute(postgreSQL_select_Query_timeStamp)
	idtimeStamp = demoDatabases.fetchall()
	use_idtimeStamp = []
	for row in idtimeStamp :
		use_idtimeStamp.append(row[0])
	# print(use_idtimeStamp)

	conn3 = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	demoDatabases3 = conn3.cursor()
		
	# connect to compare table 1
	conntable1 = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	table1 = conntable1.cursor()
	# connect to compare table 2
	conntable2 = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	table2 = conntable2.cursor()

	fixloop = len(use_idtimeStamp)-1
	# print(fixloop) 
	arrayJson = []
	arrayJson.append(0)
	arrayJsonTimeStamp = []

	for i in range(fixloop):
		if len(use_idtimeStamp) != 1 :
			sum_of_card = 0

			demoDatabases3.execute("SELECT DISTINCT \"id_card\" FROM public.myapp_card_effort_record where username = '"+user_board[0]+"' and board = '"+user_board[1]+"' ")	
			for row in demoDatabases3 :
				# print(row)
				countlastHistory = 0
				countlastertHistory = 0

				postgreSQL_select_Query2 = "select \"id_card\", \"action_card\" ,\"timestamp_id\" ,\"custom_name\" ,\"current_value\" ,\"old_value\" from public.myapp_card_effort_record  where \"username\" = '"+user_board[0]+"' and \"board\" = '"+user_board[1]+"' and \"id_card\" = "+ "'"+row[0]+ "' and \"timestamp_id\" ="+str(use_idtimeStamp[i])+";"
				table2.execute(postgreSQL_select_Query2)
				id_cardCheck2 = table2.fetchall()
				for lastertHistory  in id_cardCheck2 :
				# 	print(lastertHistory[0],lastertHistory[1],lastertHistory[2])
				# print("####################")
					if lastertHistory[1] == 'addMemberToCard' or lastertHistory[1] == 'removeMemberFromCard' :
						countlastertHistory += 1

					elif lastertHistory[1] == 'updateCustomFieldItem' :
						# no set category , size
						if lastertHistory[4] == 'N/A' and lastertHistory[5] == 'N/A': 
							pass
						# first set size , category
						elif lastertHistory[4] != 'N/A' and lastertHistory[5] == 'N/A': 
							pass
						#last first
						else:
							countlastertHistory += 1

				postgreSQL_select_Query1 = "select \"id_card\", \"action_card\" ,\"timestamp_id\" ,\"custom_name\" ,\"current_value\" ,\"old_value\" from public.myapp_card_effort_record  where \"username\" = '"+user_board[0]+"' and \"board\" = '"+user_board[1]+"' and \"id_card\" = "+ "'"+row[0]+ "' and \"timestamp_id\" ="+str(use_idtimeStamp[i+1])+";"
				table1.execute(postgreSQL_select_Query1)
				id_cardCheck = table1.fetchall()
				for lastHistory  in id_cardCheck :

					if lastHistory[1] == 'addMemberToCard' or lastHistory[1] == 'removeMemberFromCard' :
						countlastHistory += 1

					elif lastHistory[1] == 'updateCustomFieldItem' :
						# no set category , size
						if lastHistory[4] == 'N/A' and lastHistory[5] == 'N/A': 
							pass
						# first set size , category
						elif lastHistory[4] != 'N/A' and lastHistory[5] == 'N/A': 
							pass
						#last first
						else:
							countlastHistory += 1

				# print(countlastertHistory,countlastHistory)
				# print("####################")
				if countlastertHistory == countlastHistory :
					sum_of_card = sum_of_card+0
				else :
					sum_of_card = sum_of_card+1

			print(sum_of_card)




					






						


	conn3.close()
	conn.close()	
conntable2.close()
conntable1.close()
con_user_board.close()