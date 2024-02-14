const models = require("../models");
const db = require("../config/connection");

module.exports = async (model, collection) => {
  try {
    let modelExists = await models[model].db.db
      .listCollections({
        name: collection,
      })
      .toArray();

    if (modelExists.length) {
      await db.dropCollection(collection);
    }
  } catch (err) {
    throw err;
  }
};