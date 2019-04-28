from requests import get
from psycopg2 import connect
from trello import TrelloClient
import requests 
import json
from array import *
from datetime import date
from datetime import datetime

# xSw17uMm
# prywNT4Y
url = 'https://api.trello.com/1/board/prywNT4Y/actions?key=86dea335c1203f4164c12d4a22905cf7&token=6ddeefb4235c59a2ebe43f64048774d61c55684b98c72b78bd4c6415cff05c94'
print(url)
apiTrello = requests.get(url)
data_json = apiTrello.json()

for historycard in data_json :
	try:
		# insert to database card_effort_record
		if str(historycard['type']) == 'addMemberToCard' or str(historycard['type']) == 'removeMemberFromCard' or str(historycard['type']) == 'updateCustomFieldItem' :
			r1 = str(historycard['type'])
			r2 = str(historycard['data']['card']['id'])
			r3 = ''

			try:
				r3 = str(historycard['data']['customField']['name'])
			except KeyError as e:
				r3 = "N/A"
			finally:
				pass

			r4 = ''
			try:
				r4 = str(historycard['data']['customFieldItem']['idValue'])
			except KeyError as e:
				r4 = "N/A"
			finally:
				pass

			r5 = ''
			try:
					r5 = str(historycard['data']['old']['idValue'])
					if str(historycard['data']['old']['idValue']) == '' or str(historycard['data']['old']['idValue']) == 'null' or str(historycard['data']['old']['idValue']) == 'None' :
						r5 = "N/A"
			except KeyError as e:
				r5 = "N/A"
			finally:
				pass

			print(r1,r2,r3,r4,r5)
					
	except KeyError as e:
		pass
	finally:
		pass



