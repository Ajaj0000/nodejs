const express = require("express")
const fs = require("fs")
const myserver = express()
const bodyparser = require("body-parser")
const cors = require("cors")
const port = 7000
const mongoose = require("mongoose")
const usermodel = require("./schema")
// const userlogin = require("./login")
// const usermol = require("./cartschema")

mongoose.connect("mongodb://localhost:27017/Nodeee", { family: 4 })
    .then(() => {
        console.log("database is connected")
    }).catch((e) => {
        console.log(e)
    })
myserver.listen(port, (req, res) => {
    try {
        console.log(`successfully server running on ${port}`)
    } catch {
        console.log("error")
    }
})

myserver.use(cors({ origin: "*" }));
myserver.use(bodyparser.urlencoded({ extended: false }))
myserver.use(bodyparser.json())
myserver.set('view engine', 'ejs')


// myserver.get("/home" , (req ,res)=>{
//     res.render("home")
// })
// myserver.post("/signup" ,(req ,res)=>{
//     res.send(req.body)
//     const sig = new userlogin(req.body)
//     sig.save()    
// })

// myserver.get("/logdata" ,async(req,res)=>{
//     const ent = await userlogin.find()
//     res.send(ent)
// })



// celibrity data..................................

myserver.patch("/formdata/:id", async (req, res) => {
    const id = req.params.id
    const updatedata = await usermodel.findByIdAndUpdate(id, req.body)
    console.log(updatedata)
    console.log(req.body)
    res.json(req.body)
})

myserver.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id
        const deletedata = await usermodel.findByIdAndDelete(id)
        if (deletedata) {
            res.status(200).json({
                deletedata: deletedata,
                status: true,
                massage: "user deleted..."
            })
        } else {
            res.status(404).json({
                error: e,
                massage: "users not delete"
            })
        }
    } catch (e) {
        console.log(e, "error")
    }

})

myserver.get("/", (req, res) => {
    res.render("detail")
})
myserver.post("/formdata", (req, res) => {
    res.send(req.body)
    const newdata = new usermodel(req.body)
    newdata.save()
    if (newdata) {
        res.status(200).json({
            newdata,
            status: true,
            massage: "user successfuly"
        })
    } else {
        console.log("something went wrong")
    }
})
myserver.get("/formdatausers", async (req, res) => {
    const data = await usermodel.find()
    res.send(data)
})










// .......................................................admin pannel .............................................................................//

const login = require("./adminPannel/admin")
const addPro = require("./adminPannel/cards")

// cards 
myserver.post("/pro" , (req ,res)=>{
   const admin = new addPro(req.body)
   admin.save()
})
myserver.get("/allcard" ,async(req,res)=>{
    const get = await addPro.find()
    res.send(get)
})

// admin

myserver.post("/admin" ,(req ,res)=>{
    const card = new login(req.body)
    card.save()
})
myserver.get("/alladmin" ,async(req ,res)=>{
    const pro = await login.find()
    res.send(pro)
})


// users 

const Adduser = require("./adminPannel/users")
myserver.post("/adUser" , (req ,res)=>{
    const aduser = new Adduser(req.body)
    aduser.save()
})
myserver.get("/alluser" , async(req ,res)=>{
    const get = await Adduser.find()
    res.send(get)
})

// delete user 
myserver.delete("/deleteuser/:id" , async(req, res)=>{
    const id = req.params.id
    const delUser = await Adduser.findByIdAndDelete(id)
    if(delUser){
        res.status(200).json({
            delUser,
            status:true,
            massage:"user deleted success"
        })
    }else{
        res.status(404).json({
            error:e,
            status:false,
            massage:"try again"
        })
    }
})



// delete products

myserver.delete("/deleteuser/:id" , async(req ,res)=>{
    const ids = req.params.id
    const deletedata = await addPro.findByIdAndDelete(ids)
    if(deletedata){
        res.status(200).json({
            deletedata,
            status:true,
            massage:"deleted"
        })
    }
    else{
        res.status(404).json({
            deletedata,
            status:false,
            massage:"try again"
        })
    }
})


// update products

myserver.patch("/updatepro/:id" ,async(req ,res)=>{
    const id = req.params.id
    const update = await addPro.findByIdAndUpdate(id , req.body)
    console.log(update)
    console.log(req.body)
})
myserver.get("/getupdate/:id" , async(req , res)=>{
    const id = req.params.id
    const edit = await addPro.findOne({_id : id})
    res.json({"pro" : edit})
    console.log(edit)
})