const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const forumSchema = new Schema (
    {
        image: String,
        caption: String
    },
    {timestamps:true}
);

const Forums = mongoose.model('Forum', forumSchema);

module.exports = Forums;
