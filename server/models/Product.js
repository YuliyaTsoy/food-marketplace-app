const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  lister: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  dateListed: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
