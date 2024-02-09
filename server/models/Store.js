const mongoose = require("mongoose");
const { Schema } = mongoose;

const storeSchema = new Schema({
  storeOwner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
