const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  quantity: String,
  price: String,
  description: String,
});
module.exports = mongoose.model("Product", schemaProduct);
