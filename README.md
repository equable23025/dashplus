# Dash+

## Setup

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