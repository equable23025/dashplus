from requests import get
from psycopg2 import connect
from trello import TrelloClient
import requests 
import json
from array import *
from datetime import date
from datetime import datetime

# connection database user_board
# con_user_board = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
# con_user_board_database = con_user_board.cursor()



# for all user and muti board 
# postgreSQL_select_Query_user_board = "select \"username\" ,\"board\"  from myapp_user_board "
# con_user_board_database.execute(postgreSQL_select_Query_user_board)
# ub = con_user_board_database.fetchall()

# for all user and muti board
# for user in ub :
# 	print(user[0])
# 	print(user[1])
	# get token user == user
	# connection database gettoken
	# con_register_id = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	# con_register_id_database = con_register_id.cursor()
	# postgreSQL_select_Query_register= "select \"trello_token\"  from myapp_register_id  where \"username\" = "+"'"+user[0]+"'"
	# con_register_id_database.execute(postgreSQL_select_Query_register)
	# rg = con_register_id_database.fetchall()
	# token =rg[0][0]
	# for token in rg :
	# 	print(token[0])
	# token = token[0]
	# print(token)

# connection database user_board
# con_user_board = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
# con_user_board_database = con_user_board.cursor()

# postgreSQL_select_Query_user_board = "select \"username\" ,\"board\"  from myapp_user_board where username = 'v1v2v3' and board = 'UzJkBpyY'"
# con_user_board_database.execute(postgreSQL_select_Query_user_board)
# ub = con_user_board_database.fetchall()

# for x in ub :
# 	print(x)



# con_user_board = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
# con_user_board_database = con_user_board.cursor()

# postgreSQL_select_Query_user_board = "SELECT DISTINCT \"id_card\" FROM public.myapp_card_record where username = 'v1v2v3' and board = 'UzJkBpyY' "
# con_user_board_database.execute(postgreSQL_select_Query_user_board)
# ub = con_user_board_database.fetchall()

# for x in ub :
# 	print(x)

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
	postgreSQL_select_Query_timeStamp = "SELECT DISTINCT timestamp_id FROM public.myapp_card_record where username = '"+user_board[0]+"' and board = '"+user_board[1]+"' ORDER BY timestamp_id;"
	demoDatabases.execute(postgreSQL_select_Query_timeStamp)
	idtimeStamp = demoDatabases.fetchall()
	use_idtimeStamp = []
	for row in idtimeStamp :
		use_idtimeStamp.append(row[0])

	# print(len(use_idtimeStamp))

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
	# print(use_idtimeStamp)
	for i in range(fixloop):
		if len(use_idtimeStamp) != 1 :
			sum_of_card = 0
			# seleact all card DISTINCT
			demoDatabases3.execute("SELECT DISTINCT \"id_card\" FROM public.myapp_card_record where username = '"+user_board[0]+"' and board = '"+user_board[1]+"' ")		
			for row in demoDatabases3 :
				chklastHistory = 0
				chklastertHistory= 0
				countlastHistory = 0
				countlastertHistory = 0
				# chkdeleteCard = 0
				postgreSQL_select_Query2 = "select \"id_card\", \"action_card\" ,\"timestamp_id\" ,\"desc_card\" ,\"listafter_card\" from public.myapp_card_record  where \"username\" = '"+user_board[0]+"' and \"board\" = '"+user_board[1]+"' and \"id_card\" = "+ "'"+row[0]+ "' and \"timestamp_id\" ="+str(use_idtimeStamp[i])+";"
				table2.execute(postgreSQL_select_Query2)
				id_cardCheck2 = table2.fetchall()
				for lastertHistory  in id_cardCheck2 :
					# print(lastertHistory)
					if lastertHistory[1] == 'createCard'  or lastertHistory[1] == 'addChecklistToCard' or lastertHistory[1] == 'removeChecklistFromCard':
						countlastertHistory += 1
					elif lastertHistory[1] == 'updateCard' :
						if lastertHistory[3] != 'N/A':
								countlastertHistory += 1 
					elif lastertHistory[1] == 'deleteCard':
						countlastertHistory += 99999

				
				postgreSQL_select_Query1 = "select \"id_card\", \"action_card\" ,\"timestamp_id\" ,\"desc_card\" , \"listafter_card\" from public.myapp_card_record  where \"username\" = '"+user_board[0]+"' and \"board\" = '"+user_board[1]+"' and \"id_card\" = "+ "'"+row[0]+ "' and \"timestamp_id\" ="+str(use_idtimeStamp[i+1])+";"
				table1.execute(postgreSQL_select_Query1)
				id_cardCheck = table1.fetchall()
				for lastHistory  in id_cardCheck :
					# print(lastHistory)
					if lastHistory[1] == 'createCard' or lastHistory[1] == 'addChecklistToCard' or lastHistory[1] == 'removeChecklistFromCard':
						countlastHistory += 1
					elif lastHistory[1] == 'updateCard' :
						if lastHistory[3] != 'N/A':
								countlastHistory += 1 
					elif lastHistory[1] == 'deleteCard':
						countlastHistory += 99999

				if countlastertHistory == countlastHistory :
					sum_of_card = sum_of_card+0
				else :
					sum_of_card = sum_of_card+1

			arrayJson.append(sum_of_card)	
			# print(sum_of_card,user_board[0],user_board[1])

	print(use_idtimeStamp,user_board[0],user_board[1],len(use_idtimeStamp))
	print(arrayJson,user_board[0],user_board[1],len(arrayJson))	
	# connect to insert database change_record
	connChange = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	tableChange = connChange.cursor()
	tableChange.execute("DELETE FROM myapp_change_record where  \"username\" = '"+user_board[0]+"' and \"board\" = '"+user_board[1]+"'")
	fix_insert = fixloop+1
	# print(fix_insert)
	for i in range(fix_insert):
		# print(arrayJson[i],use_idtimeStamp[i])
		tableChange.execute("INSERT INTO myapp_change_record  (\"amount_change\", timestamp, \"username\" , \"board\")VALUES ('{}','{}', '{}','{}')".format(int(arrayJson[i]),int(use_idtimeStamp[i]),user_board[0],user_board[1]))
					
	connChange.commit()
	connChange.close()
conn3.close()




# 0
# 0
# 2
# 1
# 0
# 0
# 2
# 0
# 1
# 1
# 1
# 1
# 0
# 3
# 0