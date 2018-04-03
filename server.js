const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Jokes = require('./models/jokes.js');
const session = require('express-session');

// DEPENDENCIES
app.use(express.json());
app.use(express.static('public'));
app.use(session({
  secret: 'feedmeseymour',
  resave: false,
  saveUninitialized: false
}));

// CONTROLLERS
const jokesController = require('./controllers/jokes.js');
app.use('/jokes', jokesController);

const usersController = require('./controllers/users.js');
app.use('/users', usersController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

app.get('/app', (req, res)=>{
  if(req.session.currentuser){
    res.json(req.session.currentuser);
  } else {
    res.status(401).json({
      status: 401,
      message: 'not logged in'
    });
  };
});


mongoose.connect('mongodb://localhost:27017/jokes');

mongoose.connection.on('open', ()=>{
  console.log('connected to mongoose');
});


app.listen(3000, ()=>{
  console.log('I\'m listening...');
});
