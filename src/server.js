const app = require('./app');
const knex = require('knex');
const  { PORT, DATABASE_URL } = require('./config');

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
});

app.set('db', db);

app.listen(PORT, () => {
  console.log(`Server listening in ${process.env.NODE_ENV} at http://localhost:${PORT}`); // eslint-disable-line no-console
});