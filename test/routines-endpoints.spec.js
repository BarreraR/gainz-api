const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app.js');
const helpers = require('./test-helpers');

describe('Routines Endpoints', function () {
  let db;

  const {
    testExercises,
    testUsers,
    testRoutineExercises,
    testRoutines,
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

  describe(`GET /routines`, () => {
    beforeEach('get routines', () => helpers.seedExercises(db, testExercises));
    beforeEach('get routines', () => helpers.seedUsers(db, testUsers));
    beforeEach('get routines', () => helpers.seedRoutines(db, testRoutines));
    beforeEach('get routines', () =>
      helpers.seedRoutineExercises(db, testRoutineExercises)
    );

    it(`gets all routines for user, responding with 200 and only the routines of authorized user`, function() {
      return supertest(app)
        .get('/routines')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200)
        .expect((res) => {
          for (let i = 0; i < res.body.length; i++) {
            expect(res.body[i].owner).to.eql(testUsers[0].id);
          }
        });
    });
  });

  describe(`POST /routines`, () => {
    beforeEach('get routines', () => helpers.seedExercises(db, testExercises));
    beforeEach('get routines', () => helpers.seedUsers(db, testUsers));
    beforeEach('get routines', () => helpers.seedRoutines(db, testRoutines));
    beforeEach('get routines', () =>
      helpers.seedRoutineExercises(db, testRoutineExercises)
    );

    it(`post routine for user, responding with 201 and newly added routine`, function() {
      const newRoutine = {
        name: 'Beast Day!',
        exercises: [{'id': 1, 'exercise_name': 'Bench Press'}]
      }
      return supertest(app)
        .post('/routines')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(newRoutine)
        .expect(201)
        .expect(res => {
          expect(res.body[0].routine_owner).to.eql(testUsers[0].id);
        });
    });
  });

});
