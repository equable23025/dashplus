# Dash+

## Setup

### All import 
``` import all requirements.txt ```

### Database setup
It requires database named `trello_test` with this settings:
```
'NAME': 'trello_test',
'USER': 'postgres',
'PASSWORD' : <SECRET>,
'HOST': 'localhost',
'PORT': 5432,
```

### Django commands

```
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
```

### Development agreement

- Never commit to `master`
- Nerver merge to `master` without be reviewed
- Always put branch name in Trello card

#### How to activate virtual environment

```
cd env
source bin/activate

# for window

pip install virtualenv
virtualenv py34
.\py34\scripts\activate

```
`(env)` should displayed on your terminal

#### How to create new branch

Make sure you are in `master`
```
git branch
```
Create new branch
```
# longer way
git branch branch_name
git checkout branch_name

# shorter way
git checkout -b branch_name
```

#### How to delete branch

```
git branch -D branch_name
```

#### How to see diff

```
git diff
```

#### filter rest_Framwork
	- increase function rest_Framwork  (example to use. localhost:8000/api?id=1)
```
pip install django-filter
pip install djangorestframework-filters
```


#### How to get token trello 

(https://developers.trello.com/page/authorization?)


#### How to django login

(https://wsvincent.com/django-user-authentication-tutorial-login-and-logout/?fbclid=IwAR07__04UdJrnxaCH5TbzMrhJMeDkEWgz_oeoh10ZiOdaQUNelPRK5ZTTf8)


#### Unbolck cors api (unblock protocol broswer block)

```
pip install django-cors-headers
```

<!-- cron job  -->

## Folder
```
	# template folder
	-	keep all file html

	# static css
	=	keep all file css

	# static js
	-	keep all file js

	#	my app 
	=	keep all file project
		1.model.py -> create database model
		2.viewsets.py , serializers -> make rest api send to urls.py
		3.urls.py -> get api url 
		4.views.py -> show content any template
		5.url -> fix name / url to use html project
		6.setting.py -> import , config about django project
		7.filters -> increase filter function rest api
		8.forms -> keep post data from user and send to database by views.py

```

## About script files
```

```