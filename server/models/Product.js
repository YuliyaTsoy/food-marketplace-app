const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Float32Array,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: "Store",
  },
  dateListed: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});
