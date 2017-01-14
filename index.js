const express = require('express');
const app = express();
const join = require('path').join;

const { port } = require('./app/config');

const router = require('./app/routes');

// Static files directory
// Should remain before any middlewares or other routes
app.use(express.static(join(__dirname, 'public')));

// Template engine
app.set('views', join('.', 'app', 'views', 'pages'));
app.set('view engine', 'ejs');


app.use(router);

app.listen(port, err => {
  if(err) {
    throw err;
  }

  console.log(`Server listening on port: ${port}`);
});
