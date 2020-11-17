const express = require('express');
const RoutinesService = require('./routines-service');

const routinesRouter = express.Router();

const serializeRoutine = routine => ({
  id: routine.id,
  name: routine.routine_name,
  // exercise_id: routine.exercise_id,
  exercise: routine.exercises,
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
  });

module.exports = routinesRouter;