const express = require('express');
const app = express();
const join = require('path').join;

const { port, useDB } = require('./app/config');
const db = require('./app/models');
const populateDB = require('./app/dev/populateDB');

const router = require('./app/routes');

// Static files directory
// Should remain before any middlewares or other routes
app.use(express.static(join(__dirname, 'public')));

// Template engine
app.set('views', join('.', 'app', 'views', 'pages'));
app.set('view engine', 'ejs');

app.use(router);

if ( useDB ) {
  db.sequelize.sync({ force: true })
  .then(populateDB)
  .then(serverListen);
} else {
  serverListen();
}

function serverListen() {
  app.listen(port, err => {
    if(err) throw err;
    console.log(`Server listening on port: ${port}`);
  });
}
