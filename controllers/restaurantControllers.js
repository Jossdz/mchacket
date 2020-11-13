const Restaurant = require("../models/Restaurant")
const Item = require("../models/Item")
const { findByIdAndUpdate } = require("../models/Restaurant")

exports.viewCreateRestaurant = (req, res) =>
  res.render("restaurant/createRestaurant")

exports.createRestaurant = async (req, res) => {
  const { name, type, capacidad, horarioAp, horarioCi, slogan } = req.body
  const logo = req.file.path
  const { user } = req
  await Restaurant.create({
    name,
    type,
    capacidad,
    horarioAp,
    horarioCi,
    slogan,
    logo,
    ownerID: user._id
  })
  res.redirect("/restaurant/restaurants-user")
}

exports.restaurantsUser = async (req, res) => {
  const { user } = req
  // Buscamos todos los restaurantes cuya propiedad ownerID sea igual
  // a la propiedad _id del usuario en sesion
  const restaurants = await Restaurant.find({
    ownerID: user._id
  }) //.populate("ownerID")

  res.render("restaurant/restaurants-user", { restaurants })
}

exports.restaurantDetail = async (req, res) => {
  const { restaurantId } = req.params
  const { user } = req
  const restaurant = await Restaurant.findById(restaurantId).populate("menu")
  console.log(restaurant)
  const owns = user ? String(user._id) == String(restaurant.ownerID) : null

  res.render("restaurant/detail", { restaurant, owns })
}

exports.newItemForm = async (req, res) => {
  const { restaurantId } = req.params
  const restaurant = await Restaurant.findById(restaurantId)
  res.render("restaurant/add-item", restaurant)
}

exports.createItem = async (req, res) => {
  const { path: image } = req.file
  const { restaurantId } = req.params
  const { name, description, price, time } = req.body

  const item = await Item.create({
    name,
    description,
    image,
    price,
    time
  })

  await Restaurant.findByIdAndUpdate(restaurantId, {
    $push: { menu: item._id }
  })
  res.redirect(`/restaurant/${restaurantId}`)
  // res.send({ image, name, description, price, time })
}
