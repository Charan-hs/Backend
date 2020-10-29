
const mongoose = require('mongoose');
const {success,error} = require('consola');

module.exports = function conntectToMongo() {
    mongoose.connect(process.env.DBL,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true}, (err) => {
        if(!err){
            success({message:`mongodb connected`})
        }else{
            error({message:err})
        }
    } )
}

