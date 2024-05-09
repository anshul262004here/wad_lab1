const express = require("express");
const app = express();
const PORT = 3000;
const bodyparser = require("body-parser"); 
const mongoose = require("mongoose");



mongoose.connect("mongodb://127.0.0.1:27017/wadhere").then(() => {
  console.log("DB connect");
}).catch((e) => {
  console.error(e);
});

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());

const itemSchema = mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
}); 

const Item = mongoose.model("Item",itemSchema); // collection

//for posting the items
app.post("/items/new",async(req,res)=>{
  const items = await Item.create(req.body);
  res.status(201).json({
    success : true,
    items
  });
  }) ;

  //getting items

app.get("/items",async(req,res)=>{
  try {
    
    const items =await Item.find();
    res.status(200).json({
      success : true,
      items
    });
  } catch (error) {
    console.log(error);
  }
});

//delete 

app.delete("/items/:id",async(req, res)=>{
  try {
    const items = await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success : true,
      items
    });
  } catch (error) {
    console.log(error);
  }
});

//update

app.put("/items/:id",async(req, res)=>{
  try {
    const items = await Item.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({
      success : true,
      items
    });
  } catch (error) {
    console.log(error);
  }
});





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 


