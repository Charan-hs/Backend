const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    stuName:{
        type:String,
        required:true,
        default:"",
    },
    stuId:{
        type:String,
        required:true,
        default:"",
    },
    stuEmail:{
        type:String,
        required:true,
        default:"",
    },
    stuPhone:{
        type:String,
        required:true,
        default:"",
    },
    stuCat:{
        type:String,
        required:true,
        default:"",
    },
    stuSubCat:{
        type:String,
        required:true,
        default:"",
    },
    stuParentName:{
        type:String,
        required:true,
        default:"",
    },
    stuRelation:{
        type:String,
        required:true,
        default:"",
    },
    stuParentNumber:{
        type:String,
        required:true,
        default:"",
    },
    stuParentEmail:{
        type:String,
        required:true,
        default:"",
    },
    active:{
        type:Boolean,
        default:false,
    }

})

module.exports = studentSchema;