const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define our meal schema
const mealSchema = new Schema({
  name: String,
  position: Number,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

// compile schema into a mongoose model and export
module.exports = mongoose.model("Meal", mealSchema);
