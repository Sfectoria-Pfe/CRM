const { Product } = require("../models/models");

const selectAll = async (request, response) => {
  try{
    const result = await Product.find()
    response.send(result);
  }catch (error){
    console.log(error);
  }
  
};

const search = async (req, res) => {
  try {
    const { text } = req.body;
    const upperCaseText = text.toUpperCase(); // Convertir le texte en majuscules
    
    // Recherche insensible à la casse pour le titre et le texte
    const result = await Product.find({
      $or: [
        { title: { $regex: upperCaseText, $options: 'i' } },
        { text: { $regex: upperCaseText, $options: 'i' } }
      ]
    });

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Une erreur s'est produite lors de la recherche.");
  }
};


const createProduct = async (req, res) => {
  try {
     let result = await Product.create(req.body)
     res.status(201).send(result)
  } catch (error) {
   console.log(error);
  }
 };

 const findOne = async (req, res) => {
  
  try {
    const found = await Product.findOne({id: +req.params.id});
if(found) {
  res.send(found)
}
else {
  res.status(400).send("not found")
}
  
  } catch (error) {
    console.log(error);
  }
};;

const deleteProduct = async (req, res) => {
  
  try {
    const result = await Product.deleteOne({id:+req.params.id})
    res.send(result)
    
  } catch (error) {
    console.log(error);
  }
  };



module.exports = {deleteProduct ,findOne,createProduct,selectAll,search }