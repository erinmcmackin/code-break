const express = require('express');
const router = express.Router();
const Users = require('../models/users.js');
const bcrypt = require('bcrypt');


// CREATE USER AND ENCRYPT PW
router.post('/', (req, res)=>{
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  Users.create(req.body, (err, createdUser)=>{
    res.status(201).json({
      status: 201,
      message: 'user created'
    });
  });
});






module.exports = router;
