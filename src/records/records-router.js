const path = require('path');
const express = require('express');
const xss = require('xss');
const RecordsService = require('./records-service');
const { requireAuth } = require('../middleware/jwt-auth');

const recordsRouter = express.Router();
const jsonParser = express.json();

const serializeRecord = record => ({
  userId: record.userId,
  recordId: record.recordId,
  firstName: record.first_name,
  lastName: record.last_name,
  date: record.date_entered,
  exercise: record.exercise,
  sets: xss(record.sets),
  reps: xss(record.reps),
  weights: xss(record.weights) 
});

recordsRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    RecordsService.getAllRecords(knexInstance, req.user.id)
      .then(records => {
        res.json(records.map(serializeRecord));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) =>  {
    const {
      exercise,
      sets,
      reps,
      weights 
    } = req.body;
    const newRecord = {
      exercise,
      sets,
      reps,
      weights 
    };

    for(const [key, value] of Object.entries(newRecord)) {
      if(value == null){
        return res.status(400).json({
          error: {message: `Missing '${key}' in request body`}
        });
      }
    }
    newRecord.userId = req.user.id;
    RecordsService.insertRecord(
      req.app.get('db'), 
      newRecord
    )
      .then(record =>{
        res.status(201)
          // .location(path.posix.join(req.orginalUrl, `/${record[0].id}`))
          .json(record);
      })
      .catch(next);
  });


module.exports = recordsRouter;