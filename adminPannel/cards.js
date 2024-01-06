const mongoose = require("mongoose")

const products = mongoose.Schema({
    title:{
        type:String
    },
    quantity:{
        type:Number
    },
    price:{
        type:Number
    },

})

const addPro = mongoose.model("Products" , (products))
module.exports = addPro