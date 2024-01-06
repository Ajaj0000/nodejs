const mongoose = require("mongoose")

const logindata = mongoose.Schema({
    name:{
        type:String
    },
    pass:{
        type:Number
    }
})
const userlogin = mongoose.model("userlogin" , (logindata))
module.exports = userlogin
