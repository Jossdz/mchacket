const { Schema, model } = require("mongoose")

const restaurantSchema = new Schema({
  ownerID: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  name: String,
  type: String,
  logo: String,
  ranking: [Number],
  location: String,
  capacidad: Number,
  horarioAp: String,
  horarioCi: String,
  slogan: String,
  menu: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item"
    }
  ]
})

module.exports = model("Restaurant", restaurantSchema)
