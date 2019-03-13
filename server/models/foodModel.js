const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our food schema type definition
const foodSchema = new Schema({
  name: String,
  brand: String,
  variant: String,
  servingUnit: String,
  servingSize: Number,
  calories: Number,
  carbohydrates: Number,
  fats: Number,
  proteins: Number,
});

// compile schema into a mongoose model and export
module.exports = mongoose.model('Food', foodSchema);