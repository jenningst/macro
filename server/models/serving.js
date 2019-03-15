const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our serving schema
const servingSchema = new Schema({
  revisionId: Number,
  mealId: String,
  servings: Number,
  calories: Number,
  carbohydrates: Number,
  fats: Number,
  proteins: Number,
});

// compile schema into a mongoose model and export
module.exports = mongoose.model('Food', foodSchema);