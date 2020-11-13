const { Schema, model } = require("mongoose")

const itemSchema = new Schema({
  name: String,
  description: String,
  image: String,
  price: Number,
  time: String
})

module.exports = model("Item", itemSchema)
