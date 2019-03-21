const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Meal = require("./meal");

// define our meal instance schema
const mealInstanceSchema = new Schema({
  mealName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Meal
  },
  position: Number,
  date: Date
});

// compile schema into a mongoose model and export
module.exports = mealInstanceSchema;
