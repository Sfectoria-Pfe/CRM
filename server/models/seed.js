
const data = require("../data/data.json");
const {Product} = require("./models");
const insertMany= async (req,res)=>{
    try{
        await Product.create(data)
        console.log("seeded");
    }catch (error){
        console.log(error);
    }
    }
insertMany()
