from requests import get
from psycopg2 import connect
import requests 
import json
from array import *

url = 'http://localhost:8000/api/change_effort_record/'

print(url)
apiTrello = requests.get(url)
data_json = apiTrello.json()
# r = data_json
# for row in data_json :
# 	if row['amount_change'] == 1 and row['username'] == 'root':
# 		print(row)

# print(r)

# json = list(filter(lambda r: r['amount_change'] == 1 and r['timestamp'] == 18  ,r))
json = list(filter(lambda data_json: data_json['amount_change'] == 1 ,data_json))
# print(json[0]['username'])
print(json)
print(len(json))

# filtered=r.filter(function(item){
#     return item.type=="ar";         
# });
# console.log(filtered);
# list(filter(lambda x: x.username == 'ni', users))