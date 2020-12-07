const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app.js');
const helpers = require('./test-helpers');

describe('Exercises Endpoints', function() {
  let db;

  const {
    testExercises 
  } = helpers.makeFixtures();

  before('make knex instance', ()=> {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', ()=> db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe(`GET /exercises`, () => {
    beforeEach('get exercises', () => 
      helpers.seedExercises(
        db, 
        testExercises,
      )
    )
  
    it(`gets all exercises, responding with 200 and exercises`, function(){
      return supertest(app)
        .get('/exercises')
        .expect(200)
        .expect(res => {
          db
            .from('gainz_exercises')
            .select('*')
            .then((row) =>{
              for(let i = 0; i<row.length; i++){
                expect(row[i].exercise_name).to.eql(testExercises[i].exercise_name);
                expect(row[i]).to.have.property.toString('id');
              }
            });
        });
    })
  })
})