const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app.js');
const helpers = require('./test-helpers');

describe('Records Endpoints', function () {
  let db;

  const {
    testExercises,
    testUsers,
    testRecordSets,
    testRecords,
  } = helpers.makeFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe(`GET /records`, () => {
    beforeEach('get records', () => helpers.seedExercises(db, testExercises));
    beforeEach('get records', () => helpers.seedUsers(db, testUsers));
    beforeEach('get records', () => helpers.seedRecords(db, testRecords));
    beforeEach('get records', () => helpers.seedRecordSets(db, testRecordSets));

    it(`gets all records for user, responding with 200 and only the records of authorized user`, function() {
      return supertest(app)
        .get('/records')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200)
        .expect((res) => {
          for (let i = 0; i < res.body.length; i++) {
            expect(res.body[i].userId).to.eql(testUsers[0].id);
          }
        });
    });
  });

  describe(`POST /records`, () => {
    beforeEach('get records', () => helpers.seedExercises(db, testExercises));
    beforeEach('get records', () => helpers.seedUsers(db, testUsers));
    beforeEach('get records', () => helpers.seedRecords(db, testRecords));
    beforeEach('get records', () => helpers.seedRecordSets(db, testRecordSets));

    it(`post record for user, responding with 201 and newly added record`, function() {
      const newRoutine = {
        sets: 3,
        reps: [{'set': 1, 'reps': 10}, {'set': 2, 'reps': 10}, {'set': 3, 'reps': 5}],
        weights: [{'set': 1, 'weights': 135}, {'set': 2, 'weights': 185}, {'set': 3, 'weights': 225}],
        exercise: {'id': 1, 'exercise_name': 'Bench Press'}
      }
      return supertest(app)
        .post('/records')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(newRoutine)
        .expect(201)
        .expect(res => {
          // expect(res.body[0].routine_owner).to.eql(testUsers[0].id);
        });
    });
  });

});
