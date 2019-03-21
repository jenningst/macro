const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define our food revision schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdFoods: [
    {
      type: Schema.Types.ObjectId,
      ref: "Food"
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
