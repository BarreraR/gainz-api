const RoutinesService = {
  getAllRoutines(knex){
    return knex('gainz_routines')
      .select(['gainz_routines.id', 'routine_name', knex
        .raw("json_agg(json_build_object('id', gainz_routine_exercises.exercise_id, 'name', gainz_exercises.exercise_name)) as exercises")])
      .innerJoin('gainz_routine_exercises', 'gainz_routines.id', '=', 'gainz_routine_exercises.routine_id' )
      .innerJoin('gainz_exercises', 'gainz_routine_exercises.exercise_id', '=', 'gainz_exercises.id')
      .groupBy('gainz_routines.id', 'gainz_routines.routine_name');
  },
};

module.exports = RoutinesService;