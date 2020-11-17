const ExercisesService = {
  getAllExercises(knex){
    return knex
      .select('*')
      .from('gainz_exercises');
  },
  
  // Would i need to get by id if i am already getting 
  // all? Can't I search for it client side in context?
  getById(knex, id){
    return knex
      .from('gainz_exercises')
      .select('*')
      .where('id', id)
      .first();
  }
};

module.exports = ExercisesService;