const mongoose = require('mongoose');

const adminSchema = require('./admin');
const studentSchema = require('./student')

const addAdminSchema = new mongoose.Schema({
    instName: {
        type: String,
        required: true,
        default:"",
    },
    instEmail: {
        type: String,
        required: true,
        default:"",
    },
    instPhone: {
        type:String,
        required:true,
        default:"",
    },
    instAddress:{
        type:String,
        required:true,
        default:"",
    },
    instWebsite: {
        type:String,
        required:true,
        default:"",
    },
    instLogo : {
        type:String,
        required:true,
        default:"",
    },
    instSubDate : {
        type:String,
        required:true,
        default:"",
    },
    instMaxNumber:{
        type:String,
        required:true,
        default:"",
    },
    instActive:{
        type:Boolean,
        default:false,
    },
    instSubCat:String,
    instCat:String,
    instAdmin:[adminSchema],
    instSutdentDetails:[studentSchema],
        
},{
    timestamps:true
})

module.exports = mongoose.model("institutedetails",addAdminSchema)

