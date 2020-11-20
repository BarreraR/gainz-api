INSERT INTO gainz_exercises (exercise_name)
VALUES
  ('Bench press'),
  ('Bentover row'),
  ('Chest fly'),
  ('Deadlift'),
  ('Decline bench press'),
  ('Dumbbell bench press'),
  ('Dumbbell curl'),
  ('Hammer curl'),
  ('Incline bench press'),
  ('Lat pulldown'),
  ('Leg curl'),
  ('Leg extension'),
  ('Leg press'),
  ('Lunges'),
  ('Seated row'),
  ('Shoulder press'),
  ('Shrug'),
  ('Squat'),
  ('Tricep extension'),
  ('Tricep pushdown'),
  ('Overhead press');

INSERT INTO gainz_users(first_name, last_name, username, password)
VALUES
  ('Ryan', 'Reynalds', 'RayRay123', 'password123');

INSERT INTO gainz_records(sets, exercise_id, record_owner)
VALUES
  (4, 1, 1),
  (3, 7, 1),
  (5, 1, 1),
  (3, 18, 1);

INSERT INTO gainz_record_sets (set, reps, weights, record_id)
VALUES
  (1, 10, 135, 1),
  (2, 15, 185, 1),
  (3, 13, 185, 1),
  (4, 5, 225, 1),
  (1, 20, 45, 2),
  (2, 20, 45, 2),
  (3, 20, 45, 2),
  (1, 10, 135, 3),
  (2, 10, 135, 3),
  (3, 10, 135, 3),
  (4, 10, 135, 3),
  (5, 10, 135, 3),
  (1, 10, 235, 4),
  (2, 10, 245, 4),
  (3, 10, 255, 4);

INSERT INTO gainz_routines(routine_name, routine_owner)
VALUES
  ('Leg Day', 1),
  ('Monday', 1),
  ('Chest Day', 1);

INSERT INTO gainz_routine_exercises(routine_id, exercise_id)
VALUES 
  (1, 4),
  (1, 11),
  (1, 12),
  (1, 13),
  (1, 14),
  (1, 18),
  (2, 1),
  (2, 2),
  (2, 3),
  (2, 4),
  (3, 1),
  (3, 3),
  (3, 19);
