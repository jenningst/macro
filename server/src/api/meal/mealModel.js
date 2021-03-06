const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define our meal schema
const mealSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  name: String,
  position: Number
});

// compile schema into a mongoose model and export
module.exports = mongoose.model("Meal", mealSchema);
