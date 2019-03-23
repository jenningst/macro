const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define our serving schema
const servingSchema = new Schema({
  date: String,
  servings: Number,
  meal: {
    type: Schema.Types.ObjectId,
    ref: "Meal"
  },
  food: {
    type: Schema.Types.ObjectId,
    ref: "Food"
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

// compile schema into a mongoose model and export
module.exports = mongoose.model("Serving", servingSchema);
