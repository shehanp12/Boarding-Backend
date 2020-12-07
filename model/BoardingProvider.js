const  mongoose = require('mongoose');

const boardingProvider = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        min:1,
        max:255
    },
    fullName:{
        type:String,
        required:true,
        min:1,
        max:255
    },
    email:{
        type:String,
        required:true,
        min:1,
        max:255
    },
    password:{
        type:String,
        required:true,
        min:1,
        max:255
    },



});

module.exports = mongoose.model('boardingProvider',boardingProvider)
