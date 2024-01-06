const mongoose = require("mongoose")

const myschema = mongoose.Schema({
    email:{
        type:String
    },
    number:{
        type:Number
    }
})
const usermodel = mongoose.model("myuser" , (myschema))
module.exports= usermodel