const express = require("express");
const router = express.Router();
const productModel = require("../models/product");

//save product in data
//api
router.post("/uploadProduct", async (req, res, next) => {
  console.log(req.body);
  try {
    const data = await productModel(req.body);
    const datasave = await data.save();
    res.send({ message: "Upload successfully" });
  } catch {
    res.send({ message: "Upload failed" });
    console.log("error", error.message);
  }
});

//get products
router.get("/product", async (req, res, next) => {
  try {
    const data = await productModel.find({});
    res.send(JSON.stringify(data));
  } catch {
    res.send({ message: "Failed to get product" });
    console.log("error", error.message);
  }
});

//get All products
router.get("/getAllProducts", async (req, res, next) => {
  try {
    const data = await productModel.find({});
    res.send(JSON.stringify(data));
  } catch {
    res.send({ message: "Failed to get all product" });
    console.log("error", error.message);
  }
});

//get productbyID
router.get("/product/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await productModel.findById(id);
    res.send(JSON.stringify(data));
  } catch {
    res.send({ message: "Upload failed" });
    console.log("error", error.message);
  }
});

//edit product
router.put("/editProduct/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await productModel.findByIdAndUpdate(id, req.body);
    res.send({ message: "Edit successfully" });
  } catch (error) {
    res.send({ message: "Edit failed" });
    console.log("error", error.message);
  }
});

//delete product
router.delete("/deleteProduct/:id", async (req, res, next) => {
  // console.log(req);
  try {
    const { id } = req.params;
    const data = await productModel.findByIdAndDelete(id);
    res.send({ message: "Product Deleted successfully" });
  } catch (error) {
    res.send({ message: "Delete failed" });
    console.log("error", error.message);
  }
});
module.exports = router;
