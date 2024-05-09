const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/ans").then(() => {
    console.log("DB connected");
}).catch((err) => {
    console.error("DB connection error:", err);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String
});

const Product = mongoose.model("Product", productSchema);

// POST request to create a new product
app.post("/product/new", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product
        });
    } catch (err) {
        console.error("Error creating product:", err);
        res.status(500).json({
            success: false,
            message: "Failed to create product"
        });
    }
});


// get request 

app.get("/product", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            products
        });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch products"
        });
    }
});     


// update (put) request

app.put("/product/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            product
        });
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({
            success: false,
            message: "Failed to update product"
        });
    }
});

// delete request

app.delete("/product/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).json({
            success: false,
            message: "Failed to delete product"
        });
    }
});


app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
