const mongoose = require("mongoose");
const { Schema } = mongoose;

const storeSchema = new Schema({
  storeName: {
    type: String,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = storeSchema;
