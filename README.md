# Gainz API Server!

Live Link: https://cryptic-fortress-74151.herokuapp.com

---
## Description:

API for [GAINZ](https://gainz.vercel.app/) application. The API stores exercises, routines, and exercise data (such as number of sets, reps, and the weights used). The Gainz application is used to track weightlifting progress. User registration and login required. Once logged in, token is provided which contains user information in order for specific data to be returned in the response. Without the token, an unathorized request message will be returned.

---
## Stack Used:

Node, PostgreSQL, Express

---
## API Documentation: 

BASE URL: https://cryptic-fortress-74151.herokuapp.com

### GET /exercises

*Responds with an array of exercises.*

Example response: 
```
[
  {
      'id': 1,
    'exercise': 'Bench press'
  },
  {
    'id': 2,
    'exercise': 'Bentover row'
  }
]
```

---
### GET /records

*Responds with an array of user created records. Must also provide the user bearer token provided when logged in.*

Example request:
```
GET https://cryptic-fortress-74151.herokuapp.com/records
  HEADERS: 
    {
      'content-type': 'application/json',
      'authorization': `bearer YOUR_LOGIN_TOKEN`,
    }
```

Example response: 
```
STATUS: 200 OK
[
  {
    'userId': 1,
    'recordId': 1,
    'firstName': 'Test',
    'lastName': 'User',
    'date': '2020-11-30T14:44:44.998Z',
    'exercise': {
      'id': 1,
      'exercise': 'Bench press'
    },
    'sets': 4,
    'reps': [
      {
        'set': 1,
        'reps': 10
      },
      {
        'set': 2,
        'reps': 15
      },
      {
        'set': 3,
        'reps': 13
      },
      {
        'set': 4,
        'reps': 5
      }
    ],
    'weights': [
      {
        'set': 1,
        'weights': 135
      },
      {
        'set': 2,
        'weights': 185
      },
      {
        'set': 3,
        'weights': 185
      },
      {
        'set': 4,
        'weights': 225
      }
    ]
  }
]
```

---
### GET /routines

*Responds with an array of user created routines. Must also provide the user bearer token provided when logged in.*

Example request:
```
GET https://cryptic-fortress-74151.herokuapp.com/routines
  HEADERS: 
    {
      'content-type': 'application/json',
      'authorization': `bearer YOUR_LOGIN_TOKEN`,
    }
```

Example response:
```
STATUS: 200 OK
[
  {
    'id': 1,
    'owner': 1,
    'name': 'Leg Day',
    'exercises': [
      {
        'id': 4,
        'exercise': 'Deadlift'
      },
      {
        'id': 11,
        'exercise': 'Leg curl'
      },
      {
        'id': 12,
        'exercise': 'Leg extension'
      },
      {
        'id': 13,
        'exercise': 'Leg press'
      },
      {
        'id': 14,
        'exercise': 'Lunges'
      },
      {
        'id': 18,
        'exercise': 'Squat'
      }
    ]
  }
]
```

---
### POST /records

*Responds with an array containing only the inserted record. Must also provide the user bearer token provided when logged in.*

Example request: 
```
POST https://cryptic-fortress-74151.herokuapp.com/records
  HEADERS: 
    {
      'content-type': 'application/json',
      'authorization': `bearer YOUR_LOGIN_TOKEN`,
    },
  REQ BODY: 
    {
      'exercise': {'id': 1, 'exercise_name': 'Bench press'},
      'sets': 1,
      'reps': [{'set:1, 'reps':15}],
      'weights': [{'set':1, 'weights':135}] 
    }
```
Example response: 
```
STATUS: 201 Created
[
  {
    'id': 9,
    'sets': [
      {
        'id': 17,
        'set': 1,
        'reps': 15,
        'weights': 135,
        'record_id': 9
      }
    ],
    'date_entered': '2020-12-07T19:07:48.618Z',
    'exercise_id': 1,
    'record_owner': 1
  }
]
```

---
### POST /routines

*Responds with an array containing only the inserted routine. Must also provide the user bearer token provided when logged in.*

Example request: 
```
POST https://cryptic-fortress-74151.herokuapp.com/routines
  HEADERS: 
    {
      'content-type': 'application/json',
      'authorization': `bearer YOUR_LOGIN_TOKEN`,
    },
  REQ BODY: 
    {
      'name': 'Test Day',
      'exercises': [
        {'id':1, 'Bench press'},
        {'id':2, 'Bentover row'}
      ]
    }
```
Example response: 
```
STATUS: 201 Created
[
  {
    'id': 5,
    'routine_name': 'Test Day',
    'routine_owner': 1,
    'exercises': [
      {
        'id': 15,
        'routine_id': 5,
        'exercise_id': 1
      },
      {
        'id': 16,
        'routine_id': 5,
        'exercise_id': 2
      }
    ]
  }
]
```

---
### POST /auth/login

*Responds with the created token after successfully logging in. This token is required for most CRUD functions.*

Example request:
```
POST https://cryptic-fortress-74151.herokuapp.com/auth/login
  HEADERS: 
    {
      'content-type': 'application/json',
    },
  REQ BODY: 
    {
      'username': 'User1',
      'password': 'Password@1'
    }
```
Example response:
```
STATUS: 200 OK
{
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0X25hbWUiOiJUZXN0IiwibGFzdF9uYW1lIjoiVXNlciIsImlhdCI6MTYwNzM3MDYyOSwic3ViIjoiVXNlcjEifQ.TIezoUW8z7cku11lsr4sazYk7Bpc3OwCUggNf1c4Puk"
}
```

---
### POST /users

*Responds with user if successfully created.*

Example request:
```
POST https://cryptic-fortress-74151.herokuapp.com/users
  HEADERS: 
    {
      'content-type': 'application/json',
    },
  REQ BODY: 
    {
      'first_name': 'First',
      'last_name': 'Last',
      'username': 'Username1',
      'password': 'Password@1'
    }
```
Example response:
```
STATUS: 201 Created
{
  'id': 2,
  'first_name': 'First',
  'last_name': 'Last',
  'username': 'Username1',
}
```