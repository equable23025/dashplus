from requests import get
from psycopg2 import connect
from trello import TrelloClient
import requests 
import json
from array import *
from datetime import date
from datetime import datetime

# เพิ่มลบการ์ด
# เพื่มลบเชคลิส
# เดสคริปชั่น


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
	postgreSQL_select_Query_timeStamp = "SELECT DISTINCT timestamp_id FROM public.myapp_card_movement_record where username = '"+user_board[0]+"' and board = '"+user_board[1]+"' ORDER BY timestamp_id;"
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

		# all change per timestamp
		planning_doing_all =0 
		planning_testing_all=0
		planning_done_all=0
		doing_planning_all=0
		doing_testing_all=0
		doing_done_all=0
		testing_planning_all=0
		testing_doing_all=0
		testing_done_all=0
		done_planning_all=0
		done_doing_all=0
		done_testing_all=0
		# all change per timestamp [end] #

		if len(use_idtimeStamp) != 1 :

			# count data to change 
			planning_doing = 0  
			planning_doing_last = 0
			planning_testing = 0 
			planning_testing_last = 0
			planning_done= 0 
			planning_done_last= 0
			# count data to change 
			doing_planning = 0 
			doing_planning_last = 0 
			doing_testing = 0 
			doing_testing_last = 0
			doing_done = 0  
			doing_done_last = 0 
			# count data to change 
			testing_planning = 0 
			testing_planning_last = 0
			testing_doing = 0 
			testing_doing_last = 0
			testing_done = 0 
			testing_done_last = 0
			# count data to change 
			done_planning = 0  
			done_planning_last = 0 
			done_doing = 0  
			done_doing_last = 0
			done_testing = 0 
			done_testing_last = 0

			# seleact all card DISTINCT
			demoDatabases3.execute("SELECT DISTINCT \"id_card\" FROM public.myapp_card_movement_record where username = '"+user_board[0]+"' and board = '"+user_board[1]+"' ")		
			for row in demoDatabases3 :

				postgreSQL_select_Query2 = "select \"id_card\", \"action_card\" ,\"timestamp_id\" ,\"listbefore_movement_card\" ,\"listafter_movement_card\" from public.myapp_card_movement_record  where \"username\" = '"+user_board[0]+"' and \"board\" = '"+user_board[1]+"' and \"id_card\" = "+ "'"+row[0]+ "' and \"timestamp_id\" ="+str(use_idtimeStamp[i])+";"
				table2.execute(postgreSQL_select_Query2)
				id_cardCheck2 = table2.fetchall()
				for lastertHistory  in id_cardCheck2 :
					# print(lastertHistory)
					# planning move to ...
					if  str(lastertHistory[3]) == 'planning' and  str(lastertHistory[4]) == 'doing' :
						planning_doing_last +=1

					elif  str(lastertHistory[3]) == 'planning' and  str(lastertHistory[4]) == 'testing' :
						planning_testing_last+=1

					elif  str(lastertHistory[3]) == 'planning' and  str(lastertHistory[4]) == 'done' :
						planning_done_last+=1

					# doing move to ...
					elif  str(lastertHistory[3]) == 'doing' and  str(lastertHistory[4]) == 'planning' :
						doing_planning_last+=1

					elif  str(lastertHistory[3]) == 'doing' and  str(lastertHistory[4]) == 'testing' :
						doing_testing_last+=1

					elif  str(lastertHistory[3]) == 'doing' and  str(lastertHistory[4]) == 'done' :
						doing_done_last+=1

					# testing move to ...
					elif  str(lastertHistory[3]) == 'testing' and  str(lastertHistory[4]) == 'planning' :
						testing_planning_last+=1

					elif  str(lastertHistory[3]) == 'testing' and  str(lastertHistory[4]) == 'doing' :
						testing_doing_last+=1

					elif  str(lastertHistory[3]) == 'testing' and  str(lastertHistory[4]) == 'done' :
						testing_done_last+=1

					# done move to ...
					elif  str(lastertHistory[3]) == 'done' and  str(lastertHistory[4]) == 'planning' :
						done_planning_last+=1

					elif  str(lastertHistory[3]) == 'done' and  str(lastertHistory[4]) == 'doing' :
						done_doing_last+=1

					elif  str(lastertHistory[3]) == 'done' and  str(lastertHistory[4]) == 'testing' :
						done_testing_last+=1

					# elif str(lastertHistory[2]) == 'deleteCard' 
					# 		planning_doing_last=0
					# 		planning_testing_last=0
					# 		planning_done_last=0
					# 		doing_planning_last=0
					# 		doing_testing_last=0
					# 		doing_done_last=0
					# 		testing_planning_last=0
					# 		testing_doing_last=0
					# 		testing_done_last=0
					# 		done_planning_last=0
					# 		done_doing_last=0
					# 		done_testing_last=0

				postgreSQL_select_Query1 = "select \"id_card\", \"action_card\" ,\"timestamp_id\" ,\"listbefore_movement_card\" , \"listafter_movement_card\" from public.myapp_card_movement_record  where \"username\" = '"+user_board[0]+"' and \"board\" = '"+user_board[1]+"' and \"id_card\" = "+ "'"+row[0]+ "' and \"timestamp_id\" ="+str(use_idtimeStamp[i+1])+";"
				table1.execute(postgreSQL_select_Query1)
				id_cardCheck = table1.fetchall()
				for lastHistory  in id_cardCheck :
				# 	print(lastHistory)

					if  str(lastHistory[3]) == 'planning' and  str(lastHistory[4]) == 'doing' :
						planning_doing +=1

					elif  str(lastHistory[3]) == 'planning' and  str(lastHistory[4]) == 'testing' :
						planning_testing+=1

					elif  str(lastHistory[3]) == 'planning' and  str(lastHistory[4]) == 'done' :
						planning_done+=1

					# doing move to ...
					elif  str(lastHistory[3]) == 'doing' and  str(lastHistory[4]) == 'planning' :
						doing_planning+=1

					elif  str(lastHistory[3]) == 'doing' and  str(lastHistory[4]) == 'testing' :
						doing_testing+=1

					elif  str(lastHistory[3]) == 'doing' and  str(lastHistory[4]) == 'done' :
						doing_done+=1

					# testing move to ...
					elif  str(lastHistory[3]) == 'testing' and  str(lastHistory[4]) == 'planning' :
						testing_planning+=1

					elif  str(lastHistory[3]) == 'testing' and  str(lastHistory[4]) == 'doing' :
						testing_doing+=1

					elif  str(lastHistory[3]) == 'testing' and  str(lastHistory[4]) == 'done' :
						testing_done+=1

					# done move to ...
					elif  str(lastHistory[3]) == 'done' and  str(lastHistory[4]) == 'planning' :
						done_planning+=1

					elif  str(lastHistory[3]) == 'done' and  str(lastHistory[4]) == 'doing' :
						done_doing+=1

					elif  str(lastHistory[3]) == 'done' and  str(lastHistory[4]) == 'testing' :
						done_testing+=1

						
			# planning ############################
			# planning[0]
			if planning_doing_last == planning_doing :
				planning_doing_all = planning_doing_all+0
			elif planning_doing_last > planning_doing and planning_doing ==0 :
				planning_doing_all = planning_doing_all+0
			else :
				planning_doing_all = planning_doing - planning_doing_last
			if planning_doing_all < 0 :
				planning_doing_all = 0
			# print(planning_doing_all)
			# planning[1]
			if planning_testing_last == planning_testing :
				planning_testing_all = planning_testing_all+0
			elif planning_testing_last > planning_testing and planning_testing ==0 :
				planning_testing_all = planning_testing_all+0
			else :
				planning_testing_all = planning_testing - planning_testing_last
			if planning_testing_all < 0 :
				planning_testing_all = 0
			# print(planning_testing_all)
			# planning[2]
			if planning_done_last == planning_done :
				planning_done_all = planning_done_all+0
			elif planning_done_last > planning_done and planning_done ==0 :
				planning_done_all = planning_done_all+0
			else :
				planning_done_all = planning_done - planning_done_last
			if planning_done_all < 0 :
				planning_done_all = 0
			# print(planning_done_all)
			# doing ############################
			# doing[0]
			if doing_planning_last == doing_planning :
				doing_planning_all = doing_planning_all+0
			elif doing_planning_last > doing_planning and doing_planning ==0 :
				doing_planning_all = doing_planning_all+0
			else :
				doing_planning_all = doing_planning - doing_planning_last
			if doing_planning_all < 0 :
				doing_planning_all = 0
			# print(doing_planning_all)
			# doing[1]
			if doing_testing_last == doing_testing :
				doing_testing_all = doing_testing_all+0
			elif doing_testing_last > doing_testing and doing_testing ==0 :
				doing_testing_all = doing_testing_all+0
			else :
				doing_testing_all = doing_testing - doing_testing_last
			if doing_testing_all < 0 :
				doing_testing_all = 0
			# print(doing_testing_all)
			# doing[2]
			if doing_done_last == doing_done :
				doing_done_all = doing_done_all+0
			elif doing_done_last > doing_done and doing_done ==0 :
				doing_done_all = doing_done_all+0
			else :
				doing_done_all = doing_done - doing_done_last
			if doing_done_all < 0 :
				doing_done_all = 0
			# print(doing_done_all)
			# testing[0]
			if testing_planning_last == testing_planning :
				testing_planning_all = testing_planning_all+0
			elif testing_planning_last > testing_planning and testing_planning ==0 :
				testing_planning_all = testing_planning_all+0
			else :
				testing_planning_all = testing_planning - testing_planning_last
			if testing_planning_all < 0 :
				testing_planning_all = 0
			# print(testing_planning_all)
			# testing ############################
			# testing[1]
			if testing_doing_last == testing_doing :
				testing_doing_all = testing_doing_all+0
			elif testing_doing_last > testing_doing and testing_doing ==0 :
				testing_doing_all = testing_doing_all+0
			else :
				testing_doing_all = testing_doing - testing_doing_last
			if testing_doing_all < 0 :
				testing_doing_all = 0
			# print(testing_doing_all)
			# testing[2]
			if testing_done_last == testing_done :
				testing_done_all = testing_done_all+0
			elif testing_done_last > testing_done and testing_done ==0 :
				testing_done_all = testing_done_all+0
			else :
				testing_done_all = testing_done - testing_done_last
			if testing_done_all < 0 :
				testing_done_all = 0
			# print(testing_done_all)
			# done ############################
			# done[0]
			if done_planning_last == done_planning :
				done_planning_all = done_planning_all+0
			elif done_planning_last > done_planning and done_planning ==0 :
				done_planning_all = done_planning_all+0
			else :
				done_planning_all = done_planning - done_planning_last
			if done_planning_all < 0 :
				done_planning_all = 0
			# print(done_planning_all)
			# done[1]
			if done_doing_last == done_doing :
				done_doing_all = done_doing_all+0
			elif done_doing_last > done_doing and done_doing ==0 :
				done_doing_all = done_doing_all+0
			else :
				done_doing_all = done_doing - done_doing_last
			if done_doing_all < 0 :
				done_doing_all = 0
			# print(done_doing_all)
			# done[2]
			if done_testing_last == done_testing :
				done_testing_all = done_testing_all+0
			elif done_testing_last > done_testing and done_testing ==0 :
				done_testing_all = done_testing_all+0
			else :
				done_testing_all = done_testing - done_testing_last
			if done_testing_all < 0 :
				done_testing_all = 0
			# print(done_testing_all)

		# print("planning")
		# print(planning_doing_all,planning_testing_all,planning_done_all)
		# print("doing")
		# print(doing_planning_all,doing_testing_all,doing_done_all)
		# print("testing")
		# print(testing_planning_all,testing_doing_all,testing_done_all)
		# print("done")
		# print(done_planning_all,done_doing_all,done_testing_all)
		


		# arrayJson.append(done_testing_all)	
		# print(sum_of_card_planning_doing,user_board[0],user_board[1])

	# print(use_idtimeStamp,user_board[0],user_board[1],len(use_idtimeStamp))
	# print(arrayJson,user_board[0],user_board[1],len(arrayJson))	
	# connect to insert database change_movement_record
	connChange = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
	tableChange = connChange.cursor()
	# tableChange.execute("DELETE FROM myapp_change_movement_record where  \"username\" = '"+user_board[0]+"' and \"board\" = '"+user_board[1]+"'")
	fix_insert = fixloop+1
	# print(fix_insert)
	# for i in range(fix_insert):
		# print(arrayJson[i],use_idtimeStamp[i])
		# tableChange.execute("INSERT INTO myapp_change_movement_record  (\"amount_change\", timestamp, \"username\" , \"board\")VALUES ('{}','{}', '{}','{}')".format(int(arrayJson[i]),int(use_idtimeStamp[i]),user_board[0],user_board[1]))
	

	conn.close()
	conntable1.close()
	conntable2.close()
	connChange.commit()
	connChange.close()
conn3.close()
con_user_board.close()
