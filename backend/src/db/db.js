const mongoose = require("mongoose");
require("dotenv").config({ path: "./backend/.env" });

function connectToDb() {
  console.log("ENV VALUE:", process.env.MONGO_URL); // debug
  return mongoose.connect(process.env.MONGO_URL);
}

module.exports = connectToDb;