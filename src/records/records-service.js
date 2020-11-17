const RecordsService = {
  getAllRecords(knex) {
    return knex('gainz_users')
      .select(['gainz_users.id as userId', 'gainz_records.id as recordId', 'gainz_users.first_name', 'gainz_users.last_name', 
        'gainz_records.date_entered', 'gainz_records.sets', 
        knex.raw("json_build_object('id', gainz_exercises.id,'name', gainz_exercises.exercise_name) as exercise"),
        knex.raw("json_agg(json_build_object('set', gainz_record_sets.set, 'reps', gainz_record_sets.reps)) as reps"),
        knex.raw("json_agg(json_build_object('set', gainz_record_sets.set, 'weights', gainz_record_sets.weights)) as weights")])
      .innerJoin('gainz_records', 'gainz_users.id', '=', 'gainz_records.record_owner')
      .innerJoin('gainz_exercises', 'gainz_records.exercise_id', '=', 'gainz_exercises.id')
      .innerJoin('gainz_record_sets', 'gainz_records.id', '=', 'gainz_record_sets.record_id')
      .groupBy('userId', 'recordId', 'gainz_users.first_name', 'gainz_users.last_name', 
        'gainz_records.date_entered', 'gainz_records.sets', 'gainz_exercises.exercise_name','gainz_exercises.id');
  },

  insertRecord(knex, newRecord){
    return knex.transaction(function(trx) {
      const recsRec = {
        exercise_id: newRecord.exercise,
        record_owner: newRecord.userId,
        sets: newRecord.sets
      };
      
      return trx
        .insert(recsRec)
        .into('gainz_records')
        .returning('id')
        .then(function(id) {
          const recSetsRec = [];
          console.log(id, id[0]);
          for(let i = 1; i <= newRecord.sets; i++){
            recSetsRec.push(
              {
                set: i,
                reps: newRecord.reps[newRecord.reps.findIndex(set => set.set === i)].reps,
                weights: newRecord.weights[newRecord.weights.findIndex(set => set.set === i)].weights,
                record_id: id[0]
              }
            );
          }
          
          return trx('gainz_record_sets')
            .insert(recSetsRec)
            .returning('*');
        });
    })
      // .then(function(inserts) {
      //   console.log(inserts.length + ' new record saved.');
      // })
      .catch(function(error){
        console.error(error);
      });
  }
};

module.exports = RecordsService;