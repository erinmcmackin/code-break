const mongoose = require('mongoose');

// adding in simple jokeSchema for testing purposes
const jokeSchema = mongoose.Schema({
  title: String,
  likes: {type: Number, default: 0}
});

const Jokes = mongoose.model('Joke', jokeSchema);

module.exports = Jokes;
