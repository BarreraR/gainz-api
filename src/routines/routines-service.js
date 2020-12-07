const RoutinesService = {
  getAllRoutines(knex, id){
    return knex('gainz_routines')
      .select(['routine_owner', 'gainz_routines.id', 'routine_name', knex
        .raw("json_agg(json_build_object('id', gainz_routine_exercises.exercise_id, 'exercise', gainz_exercises.exercise_name)) as exercises")])
      .innerJoin('gainz_routine_exercises', 'gainz_routines.id', '=', 'gainz_routine_exercises.routine_id' )
      .innerJoin('gainz_exercises', 'gainz_routine_exercises.exercise_id', '=', 'gainz_exercises.id')
      .where('routine_owner', '=', id)
      .groupBy('routine_owner', 'gainz_routines.id', 'gainz_routines.routine_name');
  },

  insertRoutine(knex, newRoutine){
    return knex.transaction(function(trx) {
      const rRoutine = {
        routine_name: newRoutine.name,
        routine_owner: newRoutine.owner
      }

      return trx
        .insert(rRoutine)
        .into('gainz_routines')
        .returning('*')
        .then(routine => {
          const reRoutine = newRoutine.exercises.map(exercise => {
            return {
              routine_id: routine[0].id,
              exercise_id: exercise.id
            }
          });
          return trx  
          .insert(reRoutine)
          .into('gainz_routine_exercises')
          .returning('*')
          .then(r => {
            routine[0].exercises = r;
            return routine;
          });
        })
    })
    .catch(error => console.error(error));
  }
};

module.exports = RoutinesService;