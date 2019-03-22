const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define our food revision schema
const foodRevisionSchema = new Schema({
  revisionNumber: Number,
  calories: Number,
  carbohydrates: Number,
  fats: Number,
  proteins: Number
});

// define our food schema
const foodSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  name: String,
  brand: String,
  variant: String,
  servingUnit: String,
  servingSize: Number,
  revisions: [foodRevisionSchema]
});

// compile schema into a mongoose model and export
module.exports = mongoose.model("Food", foodSchema);
