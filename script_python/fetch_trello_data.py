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

# date - time
from datetime import time
datetimes = datetime.now()
todayzone = datetimes.strftime("%x")
formatedDate = datetimes.strftime("%Y-%m-%d %H:%M:%S")

# Insert to database time_stamp
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
	# insert to database card_record
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

		demoDatabases2.execute("INSERT INTO myapp_card_record  (\"id_card\", \"action_card\", \"desc_card\", \"comment_card\", \"listafter_card\" ,\"timestamp_id\")VALUES ('{}', '{}', '{}', '{}', '{}', '{}')".format(r1,r2,r3,r4,r5,r6))
		conn2.commit()
	except KeyError as e:
		pass
	finally:
		pass

conn.close()
conn2.close()
