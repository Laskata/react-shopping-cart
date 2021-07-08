const Product = require("../models/Product");
const router = require("express").Router();

router.get("/all", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

router.post("/create-products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send("Product successfully added to database");
});

router.delete("/delete-product/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send("product deleted");
});

module.exports = router;
