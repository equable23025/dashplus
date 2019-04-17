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

# connection database timeStamp
conn = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
demoDatabases = conn.cursor()

# select id timeStamp
postgreSQL_select_Query_timeStamp = "select \"id\"  from myapp_time_stamp "
demoDatabases.execute(postgreSQL_select_Query_timeStamp)
idtimeStamp = demoDatabases.fetchall()
use_idtimeStamp = ''
for row in idtimeStamp :
	use_idtimeStamp = row[0]
# idLength 
idLength = int(use_idtimeStamp) + 1

conn3 = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
demoDatabases3 = conn3.cursor()
	
# connect to compare table 1
conntable1 = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
table1 = conntable1.cursor()
# connect to compare table 2
conntable2 = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
table2 = conntable2.cursor()

changeQ = []
# table1-ID
loopRetroact = idLength - 1

# table2-ID
loopRetroact2 = idLength - 2

# loop for calculate
fixloop = loopRetroact 

# changeRQ
changeRQ = 0
arrayJson = []
arrayJsonTimeStamp = []
	
# demoDatabases3.execute("SELECT \"id_card\" , \"action_card\" , \"timestamp_id\"  , \"dates\" FROM public.myapp_time_stamp inner join public.myapp_card_record on public.myapp_card_record.timestamp_id =  public.myapp_time_stamp.id where public.myapp_time_stamp.id ="+ str(x) +";")
for i in range(fixloop):
	if loopRetroact != 1 :
		fix = 1
		# count to calculate
		sumcountlastHistory = 0
		sumcountlastertHistory = 0
		# check Delete / MoveCard
		deleteHistory = 0
		deleteLaster = 0
		beforeDelete = 0

		# seleact all card DISTINCT
		demoDatabases3.execute("SELECT DISTINCT \"id_card\" FROM public.myapp_card_record")		
		for row in demoDatabases3 :
			chklastHistory = 0
			chklastertHistory= 0
			countlastHistory = 0
			countlastertHistory = 0
			chkdeleteCard = 0
			postgreSQL_select_Query2 = "select \"id_card\", \"action_card\" ,\"timestamp_id\" ,\"desc_card\" ,\"listafter_card\" from public.myapp_card_record  where \"id_card\" = "+ "'"+row[0]+ "' and \"timestamp_id\" ="+str(loopRetroact2)+";"
			table2.execute(postgreSQL_select_Query2)
			id_cardCheck2 = table2.fetchall()
			for lastertHistory  in id_cardCheck2 :
				if lastertHistory[1] == 'deleteCard' or lastertHistory[1] == 'moveCardFromBoard' :
					# pass
					chkdeleteCard = 1
					countlastertHistory = 1
				elif lastertHistory[1] == 'updateCard' :
					if lastertHistory[3] == 'N/A':
						if lastertHistory[4] == 'N/A':
							pass
						else :
							countlastertHistory = countlastertHistory+1 
					else :
						chklastertHistory = chklastertHistory+1
						if chklastertHistory > 1 :
							countlastertHistory = countlastertHistory+1
				elif lastertHistory[1] == 'comment_card' :
					countlastertHistory = countlastertHistory	
				elif lastertHistory[1] == 'createCard' :
					countlastertHistory = countlastertHistory+1 
				else :
					countlastertHistory = countlastertHistory+1

			postgreSQL_select_Query1 = "select \"id_card\", \"action_card\" ,\"timestamp_id\" ,\"desc_card\" , \"listafter_card\" from public.myapp_card_record  where \"id_card\" = "+ "'"+row[0]+ "' and \"timestamp_id\" ="+str(loopRetroact)+";"
			table1.execute(postgreSQL_select_Query1)
			id_cardCheck = table1.fetchall()
			for lastHistory  in id_cardCheck :
				if lastHistory[1] == 'deleteCard' or lastHistory[1] == 'moveCardFromBoard':
					countlastHistory = 1
					if chkdeleteCard == 0:
						countlastHistory += countlastertHistory
				elif lastHistory[1] == 'updateCard' :
					if lastHistory[3] == 'N/A':
						if lastHistory[4] == 'N/A':
							pass
						else :
							countlastHistory = countlastHistory	+1 
					else :
						chklastHistory = chklastHistory+1
						if chklastHistory > 1 :
							countlastHistory = countlastHistory+1
				elif lastHistory[1] == 'comment_card' :				
					countlastHistory = countlastHistory	
				elif lastHistory[1] == 'createCard' :
					countlastHistory = countlastHistory	+1 
				else :
					countlastHistory = countlastHistory+1

			sumcountlastHistory += countlastHistory
			sumcountlastertHistory += countlastertHistory
		

		changeRQ = sumcountlastHistory - sumcountlastertHistory
		# print(changeRQ)
		arrayJson.append(changeRQ)	
		arrayJsonTimeStamp.append(loopRetroact)	
		loopRetroact = loopRetroact -1
		loopRetroact2 = loopRetroact2 -1



# connect to insert database change_record
my_json_string = json.dumps(arrayJson)
connChange = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
tableChange = connChange.cursor()
# change id 1 = 0
arrayJson.append(0)
arrayJsonTimeStamp.append(1)

arrayJsonChange = []
arrayJsonIdTimeStamp = []
tableChange.execute("DELETE FROM myapp_change_record where  id != -1 ") 
for i in reversed(arrayJson):
	arrayJsonChange.append(i)
# print(arrayJsonChange)

for i in reversed(arrayJsonTimeStamp):
	arrayJsonIdTimeStamp.append(i)
# print(arrayJsonIdTimeStamp)

for i in range(fixloop):
	tableChange.execute("INSERT INTO myapp_change_record  (\"amount_change\", \"timestamp_id\")VALUES ('{}', '{}')".format(int(arrayJsonChange[i]),int(arrayJsonIdTimeStamp[i])))
				
connChange.commit()
connChange.close()
conn3.close()