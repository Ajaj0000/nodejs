const mongoose = require("mongoose")

const users = mongoose.Schema({
    name:{
        type:String
    },
    pass:{
        type:Number
    }
})

const AdUser = mongoose.model("Adduser" , (users))
module.exports = AdUser