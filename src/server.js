const app = require('./app');
const  { PORT } = require('./config');

app.listen(PORT, () => {
  console.log(`Server listening in ${process.env.NODE_ENV} at httP://localhost:${PORT}`); // eslint-disable-line no-console
});