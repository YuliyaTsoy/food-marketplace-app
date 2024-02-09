const mongoose = require("mongoose");
const { Schema } = mongoose;

const storeSchema = new Schema({
  storeOwner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  storeName: {
    type: String,
    required: true,
  },
});

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
