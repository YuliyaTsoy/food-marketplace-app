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

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
