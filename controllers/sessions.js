const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Users = require('../models/users.js');
const bcrypt = require('bcrypt');

// CREATE SESSION - LOG USER IN
router.post('/', (req, res)=>{
  Users.findOne({username: req.body.username}, (err, foundUser)=>{
    if(bcrypt.compareSync(req.body.password, foundUser.password)){
      req.session.currentuser = foundUser;
      res.status(201).json({
        status: 201,
        message: 'session created'
      });
    } else {
      res.status(401).json({
        status: 401,
        message: 'login failed'
      });
    };
  });
});

// DELETE SESSION - LOG USER OUT
router.delete('/', (req, res)=>{
  req.session.destroy(()=>{
    res.status(200).json({
      status:200,
      message: 'logout complete'
    });
  });
});



module.exports = router;
