const join = require('path').join;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { port } = require('./app/config');

const { session } = require('./app/middleware');
const router = require('./app/routes');
const db = require('./app/database/models');

// Static files directory
// Should remain before any middlewares or other routes
app.use(express.static(join(__dirname, 'public')));

// Template engine
app.set('views', join('.', 'app', 'views', 'pages'));
app.set('view engine', 'ejs');

// Populate session and request body data to "req" object
app.use(session);
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

db.sequelize.sync()
.then(() => serverListen(app, port));

function serverListen(app, port) {
  app.listen(port, err => {
    if(err) throw err;
    console.log(`Server listening on port: ${port}`);
  });
}
