const express = require('express');
const xss = require('xss');
const RoutinesService = require('./routines-service');

const routinesRouter = express.Router();
const jsonParser = express.json();

const serializeRoutine = routine => ({
  id: routine.id,
  owner: routine.routine_owner,
  name: routine.routine_name,
  // exercise_id: routine.exercise_id,
  exercises: routine.exercises
});

routinesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    RoutinesService.getAllRoutines(knexInstance)
      .then(routines => {
        res.json(routines.map(serializeRoutine));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const {
      owner,
      name,
      exercises
    } = req.body;

    const newRoutine = {
      owner,
      name,
      exercises
    };

    for(const [key, value] of Object.entries(newRoutine)) {
      if(value == null){
        return res.status(400).json({
          error: {message: `Missing '${key}' in request body`}
        });
      }
    }

    RoutinesService.insertRoutine(
      req.app.get('db'),
      newRoutine
    )
    .then(routine=> {
      res
        .status(201)
        .json(routine);
    })
    .catch(next);
  });

module.exports = routinesRouter;