const express = require('express');
const ExercisesService = require('./exercises-service');

const exercisesRouter = express.Router();

const serializeExercise = exercise => ({
  id: exercise.id,
  exercise: exercise.exercise_name,
});

exercisesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    ExercisesService.getAllExercises(knexInstance)
      .then(exercises => {
        res.json(exercises.map(serializeExercise));
      })
      .catch(next);
  });

module.exports = exercisesRouter;