const mongoose=require("mongoose")
require ('dotenv').config()
const mongodb=process.env.mongodb
mongoose.connect("mongodb://127.0.0.1/pfe").then(()=>{console.log("db connected")})

const db = mongoose.connection

module.exports=db