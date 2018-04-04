const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Forums = require('../models/forums.js');





//Routes
//index
router.get('/', (req, res)=>{
    Forums.find({}, (err, allForums)=>{
        res.json(allForums);
    })

})

//post
router.post('/', (req, res)=>{
    Forums.create(req.body, (err, createdForum)=>{
        res.json(createdForum);
    })

})

//put
router.put('/:id', (req, res)=>{
    Forums.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, foundForum)=>{
        res.json(foundForum);
    })

})

//delete
router.delete('/:id', (req, res)=>{
    Forums.findByIdAndRemove(req.params.id, (err, deletedForum)=>{
        res.json(deletedForum);
    })

})

//show
// router.get('/:id', (req, res)=>{
//     Forums.findById(req.params.id, (err, foundForum)=>{
//         res.json(foundForum);
//     })
//
// })


module.exports = router;
