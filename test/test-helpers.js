const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { test } = require('mocha');

function makeUsersArray(){
  return [
    {
      'id': 1,
      'username': 'user1',
      'first_name': 'User',
      'last_name': '1',
      'password': 'Password@1'
    },
    {
      'id': 2,
      'username': 'user2',
      'first_name': 'User',
      'last_name': '2',
      'password': 'Password@1'
    },
  ]
}

function makeExercisesArray(){
  return [
    {
      'id': 1,
      'exercise_name': 'Bench press'
    },
    {
      'id': 2,
      'exercise_name': 'Squat'
    },
  ]
}

function makeRecordsArray(users, exercises){
  return [
    {
      'id': 1,
      'sets': 1,
      'exercise_id': exercises[0].id,
      'record_owner': users[0].id
    },
    {
      'id': 2,
      'sets': 1,
      'exercise_id': exercises[1].id,
      'record_owner': users[1].id
    },
    {
      'id': 3,
      'sets': 2,
      'exercise_id': exercises[0].id,
      'record_owner': users[1].id
    },
  ]
}

function makeRecordSetsArray(records){
  return [
    {
      'id': 1,
      'set': 1,
      'reps': 10,
      'weights': 135,
      'record_id': records[0].id
    },
    {
      'id': 2,
      'set': 1,
      'reps': 15,
      'weights': 225,
      'record_id': records[1].id
    },
    {
      'id': 3,
      'set': 1,
      'reps': 15,
      'weights': 225,
      'record_id': records[2].id
    },
    {
      'id': 4,
      'set': 2,
      'reps': 10,
      'weights': 275,
      'record_id': records[2].id
    },
  ]
}

function makeRoutinesArray(users){
  return [
    {
      'id': 1,
      'routine_name': 'Routine 1',
      'routine_owner': users[0].id
    },
    {
      'id': 2,
      'routine_name': 'Routine 2',
      'routine_owner': users[0].id
    },
    {
      'id': 3,
      'routine_name': 'Squat day',
      'routine_owner': users[1].id
    },
  ]
}

function makeRoutineExercisesArray(routines, exercises){
  return [
    {
      'id': 1,
      'routine_id': routines[0].id,
      'exercise_id': exercises[0].id
    },
    {
      'id': 2,
      'routine_id': routines[0].id,
      'exercise_id': exercises[1].id
    },
    {
      'id': 3,
      'routine_id': routines[1].id,
      'exercise_id': exercises[1].id
    },
    {
      'id': 4,
      'routine_id': routines[2].id,
      'exercise_id': exercises[0].id
    },
  ]
}

function makeFixtures(){
  const testUsers = makeUsersArray();
  const testExercises = makeExercisesArray();
  const testRecords = makeRecordsArray(testUsers, testExercises);
  const testRecordSets = makeRecordSetsArray(testRecords);
  const testRoutines = makeRoutinesArray(testUsers, testExercises);
  const testRoutineExercises = makeRoutineExercisesArray(testRoutines, testExercises);
  
  return { 
    testUsers, 
    testExercises, 
    testRecords, 
    testRecordSets, 
    testRoutines,
    testRoutineExercises,
  };
}

function cleanTables(db) {
  return db.transaction(trx => 
    trx.raw(
      `TRUNCATE
        gainz_exercises,
        gainz_record_sets,
        gainz_records,
        gainz_routine_exercises,
        gainz_routines,
        gainz_users
        RESTART IDENTITY CASCADE`
    ));
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user=> {
    const {username, first_name, last_name, password} = user;
    return {
      username,
      first_name,
      last_name,
      password: bcrypt.hashSync(password, 1)
    };
  });

  return db.into('gainz_users').insert(preppedUsers);
}

function seedExercises(db, exercises){
  const preppedExercises = exercises.map(exercise => {
    const {exercise_name} = exercise;
    return { exercise_name };
  });

  return db.into('gainz_exercises').insert(preppedExercises);
}

function seedRoutines(db, routines){
  const preppedRoutines = routines.map(routine => {
    const { routine_name, routine_owner } = routine;
    return { routine_name, routine_owner };
  });

  return db.into('gainz_routines').insert(preppedRoutines);
}

function seedRoutineExercises(db, routineEx){
  const preppedRoutineEx = routineEx.map(rx => {
    const { routine_id, exercise_id } = rx;
    return { routine_id, exercise_id };
  });

  return db.into('gainz_routine_exercises').insert(preppedRoutineEx);
}

function seedRecords(db, records){
  const preppedRecords = records.map(record => {
    const { sets, exercise_id, record_owner } = record;
    return { sets, exercise_id, record_owner };
  });

  return db.into('gainz_records').insert(preppedRecords);
}

function seedRecordSets(db, sets){
  const preppedSets = sets.map(s => {
    const { set, reps, weights, record_id } = s;
    return { set, reps, weights, record_id };
  });

  return db.into('gainz_record_sets').insert(preppedSets);
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign(
    { 
      userId: user.id,
    }, 
    secret, 
    {
      subject: user.username,
      algorithm: 'HS256',
    }
  );
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makeExercisesArray,
  makeRecordsArray,
  makeRecordSetsArray,
  makeRoutinesArray,
  makeRoutineExercisesArray,

  makeFixtures,
  makeAuthHeader,
  cleanTables,

  seedUsers,
  seedExercises,
  seedRecords,
  seedRecordSets,
  seedRoutines,
  seedRoutineExercises,
}