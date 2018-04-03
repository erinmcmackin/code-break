const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Jokes = require('./models/jokes.js');

app.use(express.json());
app.use(express.static('public'));

const jokesController = require('./controllers/jokes.js');
app.use('/jokes', jokesController);

mongoose.connect('mongodb://localhost:27017/jokes');

mongoose.connection.on('open', ()=>{
  console.log('connected to mongoose');
});


app.listen(3000, ()=>{
  console.log('I\'m listening...');
});
