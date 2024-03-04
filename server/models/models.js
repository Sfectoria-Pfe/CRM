const mongoose= require("mongoose")
const db = require("./index")

const productSchema = new mongoose.Schema({
    id: Number,
    image:String,
    title:String,
    text:String,
})
const Product = mongoose.model("products",productSchema)
const orderSchema = new mongoose.Schema({
    id:Number,
    price:Number,
    clientInformation:String,
})
const Order = mongoose.model("products",productSchema)
module.exports={Product,Order}