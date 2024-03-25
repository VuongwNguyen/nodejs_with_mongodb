const express = require('express');
const router = express.Router();

const Product = require('./Products');

router.get('/searchProduct', async function (req, res) {
    try {
        const { name } = req.query;
        const products = await Product.find({ name: { $regex: name, $options: 'i' } });
        res.json({ products: products, status: true });
    } catch (error) {
        res.json({ message: "error: " + error, status: false });
    }
});

router.get("/getAllProducts", async function (req, res) {
    try {
        const products = await Product.find({});
        res.json({ products: products, status: true });
    } catch (error) {
        res.json({ message: "error: " + error, status: false });
    }
});

router.get('/getProductById', async function (req, res) {
    try {
        const { id } = req.query;
        const product = await Product.findById(id);
        res.json({ product: product, status: true });
    } catch (error) {
        res.json({ message: "error: " + error, status: false });
    }
})

router.get('/getProductByCategory', async function (req, res) {
    try {
        const { category_id } = req.query;
        const products = await Product.find({ category_id: category_id });
        res.json({ products: products, status: true });
    } catch (error) {
        res.json({ message: "error: " + error, status: false });
    }
});


module.exports = router