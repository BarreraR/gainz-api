// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// function makeUsersArray(){
//   return [
//     {
//       'id': 1,
//       'username': 'user1',
//       'first_name': 'User',
//       'last_name': '1',
//       'password': 'Password@1'
//     },
//     {
//       'id': 2,
//       'username': 'user2',
//       'first_name': 'User',
//       'last_name': '2',
//       'password': 'Password@1'
//     },
//   ]
// }

// function makeExercisesArray(){
//   return [
//     {
//       'id': 1,
//       'exercise': 'Bench press'
//     },
//     {
//       'id': 2,
//       'exercise': 'Squat'
//     },
//   ]
// }

// function makeRecordsArray(users, exercises){
//   return [
//     {
//       'userId': users[0].id,
//       'recordId': 1,
//       'firstName': users[0].first_name,
//       'lastNmae': users[0].last_name,
//       'date': '2020-11-26T04:35:41.049Z',
//       'exercise': exercises[0],
//       'sets': 1,
//       'reps': {'set':1, 'reps':10},
//       'weights': {'set':1, 'weights': 135}
//     },
//     {
//       'userId': users[0].id,
//       'recordId': 2,
//       'firstName': users[0].first_name,
//       'lastNmae': users[0].last_name,
//       'date': '2020-11-26T04:35:41.049Z',
//       'exercise': exercises[1],
//       'sets': 2,
//       'reps': {'set':1, 'reps':10, 'set':2, 'reps':10},
//       'weights': {'set':1, 'weights': 135, 'set':2, 'weights': 135}
//     },
//     {
//       'userId': users[1].id,
//       'recordId': 3,
//       'firstName': users[1].first_name,
//       'lastNmae': users[1].last_name,
//       'date': '2020-11-26T04:35:41.049Z',
//       'exercise': exercises[1],
//       'sets': 2,
//       'reps': {'set':1, 'reps':10, 'set':2, 'reps':10},
//       'weights': {'set':1, 'weights': 135, 'set':2, 'weights': 135}
//     }
//   ]
// }

// function makeRoutinesArray(users, exercises){
//   return [
//     {
//       'id': 1,
//       'owner': users[0].id,
//       'name': 'Leg Day',
//       'exercises': [
//         exercises[1]
//       ]
//     },
//     {
//       'id': 2,
//       'owner': users[0].id,
//       'name': 'Full body day',
//       'exercises': [
//         exercises[1],
//         exercises[2]
//       ]
//     },
//     {
//       'id': 3,
//       'owner': users[1].id,
//       'name': 'Full body day',
//       'exercises': [
//         exercises[1],
//         exercises[2]
//       ]
//     }
//   ]
// }

// // function makeExpectedExercise(exercise, exercises=[]){  


// // }

// function makeFixtures{
//   const testUsers = makeUsersArray();
//   const testExercises = makeExercisesArray();
//   const testRecords = makeRecordsArray(testUsers, testExercises);
//   const testRoutines = makeRoutinesArray(testUsers, testExercises);

//   return { testUsers, testExercises, testRecords, testRoutines };
// }

// function cleanTables(db) {
//   return db.transaction(trx => 
//     trx.raw(
//       `TRUNCATE
//         gainz_exercises`
//     ))
// }