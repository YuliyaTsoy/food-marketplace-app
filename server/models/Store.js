const mongoose = require("mongoose");
const { Schema } = mongoose;

const storeSchema = new Schema({});

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
