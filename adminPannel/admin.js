const mongoose = require("mongoose")

const admin = mongoose.Schema({
    name:{
        type:String
    },
    pass:{
        type:Number
    }
})
const login = mongoose.model("admins" , (admin))
module.exports = login