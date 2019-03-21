const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");

// define our food revision schema
const foodRevisionSchema = new Schema({
  revisionNumber: {
    type: Number,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  carbohydrates: {
    type: Number,
    required: true
  },
  fats: {
    type: Number,
    required: true
  },
  proteins: {
    type: Number,
    required: true
  }
});

// define our food schema
const foodSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    required: true
  },
  servingUnit: {
    type: String,
    required: true
  },
  servingSize: {
    type: Number,
    required: true
  },
  revisions: [
    {
      type: Schema.Types.ObjectId,
      ref: foodRevisionSchema
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

// compile schema into a mongoose model and export
module.exports = mongoose.model("Food", foodSchema);
