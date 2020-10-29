const mongoose = require('mongoose');

const superSchnema = new mongoose.Schema({
    superUserName: {
        type: String,
        required: true
    },
    superPassword:{
        type: String,
        required: true
    },
    role:{
        type:String,
        default:"superAdmin",
        enum:["admin","superAdmin"]

    }
})

module.exports = mongoose.model("superAdmin",superSchnema)