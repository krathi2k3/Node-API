const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes
app.get('/', (req,res) => [
  res.send('Hello Node API')
])

app.get('/blog', (req,res) => [
  res.send('Hello Blog!')
])

app.get('/product',async(req,res) =>{
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

app.get('/product/:id',async(req,res) =>{
  try {
    const {id} = req.params;
    const products = await Product.findById(id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

app.post('/product',async(req,res) =>{
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

//update a product
app.put('/product/:id',async(req,res)=>{
  try {
    const{id}=req.params;
    const products = await Product.findByIdAndUpdate(id,req.body);
    //we cant find the product
    if(!products){
      return res.status(404).json({message: `connot find any product with ID ${id}`})
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

//delete a product
app.delete('/product/:id',async(req,res)=>{
  try {
    const{id}=req.params;
    const products = await Product.findByIdAndDelete(id,req.body);
    if(!products){
      return res.status(404).json({message: `connot find any product with ID ${id}`})
    }
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

mongoose.connect("myapicreds")
.then(() => {
  console.log("Connected to MongoDB")
  app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  });
}).catch((error) =>{
  console.log(error)
})
