const mongoose = require   ('mongoose');

const Schema = mongoose.Schema;


const forumSchema = new Schema (
    {
        img: String,
        title: String,
        comment:String
    },
    {timestamps:true}
);

const Forums = mongoose.model('Forum', forumSchema);

module.exports = Forums
