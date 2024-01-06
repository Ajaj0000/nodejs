const mongoose = require("mongoose")

const cartschema = mongoose.Schema({
    email:{
        type:String
    },
    number:{
        type:Number
    },
    image:{
        type:String
    }
})

const usermol = mongoose.model("cart" ,(cartschema))
module.exports = usermol