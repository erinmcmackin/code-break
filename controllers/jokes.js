const express = require('express');
const router = express.Router();
const Jokes = require('../models/jokes.js');

// find all jokes
router.get('/', (req, res)=>{
  Jokes.find({}, (err, foundJokes)=>{
    res.json(foundJokes);
  });
});
// TESTED with:
// curl http://localhost:3000/jokes


// create a new joke
router.post('/', (req, res)=>{
  Jokes.create(req.body, (err, createdJoke)=>{
    res.json(createdJoke);
  });
});
// TESTED with:
// curl -X POST -H "Content-Type: application/json" -d '{"title":"TestcURL", "likes":12}' http://localhost:3000/jokes


// delete a joke
router.delete('/:id', (req, res)=>{
  Jokes.findByIdAndRemove(req.params.id, (err, deletedJoke)=>{
    res.json(deletedJoke);
  });
});
// TESTED with:
// curl -X DELETE http://localhost:3000/jokes/5ac2cf355bce8c1dcd6dc9eb


// edit a joke
router.put('/:id', (req, res)=>{
  Jokes.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedJoke)=>{
    res.json(updatedJoke);
  });
});
// TESTED with:
// curl -X PUT -H "Content-Type: application/json" -d '{"title":"TestcURL2", "likes":15}' http://localhost:3000/jokes/5ac2ce275bce8c1dcd6dc9ea





module.exports = router;
