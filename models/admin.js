const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required:true,
        default:"",
    },
    adminEmail: {
        type: String,
        required:true,
        default:"",
    },
    adminPhone: {
        type: String,
        required:true,
        default:"",
    },
    adminUserName: {
        type: String,
        required:true,
        default:"",
    },

    adminEmplyDes: {
        type: String,
        required:true,
        default:"",
    },
    adminEmplyId:{
        type:String,
        required:true,
        default:"",
    },
    adminId:{
        type:String,
        required:true,
        default:"",
    },
    role:{
        type:String,
        default:"admin",
        enum:["admin","superAdmin"]
    }

})

module.exports = adminSchema;
