const mongoose = require('mongoose');
const notesSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    tag: {
        type: String,
       
    },
    bookmark:{
        type:Boolean
    }
})
const Notes=mongoose.mongoose.model("notes", notesSchema);
module.exports = Notes;