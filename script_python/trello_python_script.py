from requests import get
from psycopg2 import connect
from trello import TrelloClient
import requests 
import json
from array import *
from datetime import date
from datetime import datetime

# connection database timeStamp
conn = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
demoDatabases = conn.cursor()
# connect  database CardRecord
conn2 = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
demoDatabases2 = conn2.cursor()
conn3 = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
demoDatabases3 = conn3.cursor()
	
# connect to compare table 1
conntable1 = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
table1 = conntable1.cursor()
# connect to compare table 2
conntable2 = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
table2 = conntable2.cursor()
# connect to count delete
conntableDL = connect("dbname='trello_test' user='postgres' host='localhost' password='1234'")
tableDL = conntableDL.cursor()


# date - time
from datetime import time
datetimes = datetime.now()
todayzone = datetimes.strftime("%x")
formatedDate = datetimes.strftime("%Y-%m-%d %H:%M:%S")
# timezone = datetimes.strftime("%H:%M")
# timezone = timezone.now()
# Insert to database

demoDatabases.execute("INSERT INTO myapp_time_stamp  (\"datetime\"  )VALUES ('{}')".format(formatedDate))
conn.commit()

# connection API Trello
url = 'https://api.trello.com/1/board/prywNT4Y/actions?key=2974a6f5ada96a1fbf515aab92f01b7f&token=4d1a7b32cc933b8b75294c40013c30d9e30e29306fb06a630ce932ed8d26c6d7'
apiTrello = requests.get(url)
data_json = apiTrello.json()

# select id timeStamp
postgreSQL_select_Query_timeStamp = "select \"id\"  from myapp_time_stamp "
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
	# insert to database
		r1 = str(historycard['data']['card']['id'])
		r2 = str(historycard['type'])
		r3 = ''
	
		try:
			r3 = str(historycard['data']['card']['desc'])
		except KeyError as e:
			r3 = "N/A"
		finally:
			pass
			
		r4 = ''
		try:
			r4 = str(historycard['data']['text'])
		except KeyError as e:
			r4 = "N/A"
		finally:
			pass

		r5 = ''
		try:
			r5 = str(historycard['data']['listAfter']['name'])
		except KeyError as e:
			r5 = "N/A"
		finally:
			pass

		r6 = str(use_idtimeStamp)
		# 42 tsmp
		demoDatabases2.execute("INSERT INTO myapp_card_record  (\"id_card\", \"action_card\", \"desc_card\", \"comment_card\", \"listafter_card\" ,\"timestamp_id\")VALUES ('{}', '{}', '{}', '{}', '{}', '{}')".format(r1,r2,r3,r4,r5,r6))
		conn2.commit()
	except KeyError as e:
		pass
	finally:
		pass
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



# connect to insertJson
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
conn.close()
conn2.close()
conn3.close()