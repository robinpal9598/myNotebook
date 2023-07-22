const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique:true
       
    },
    password: {
        type: String,
       
    },
})
const User=mongoose.mongoose.model("users", userSchema);
module.exports = User;