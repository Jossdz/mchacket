const { Router } = require("express")
const {
  signupViewComensal,
  signupViewRestaurant,
  signupProcessComensal,
  loginView,
  indexView,
  signupProcessRestaurant,
  loginProcess,
  profileView,
  profilePicture,
  logout
} = require("../controllers/authControllers")
const { itemDetails } = require('../controllers/itemControllers')
const uploadPicture = require("../config/ cloudinary")

const router = Router()
router.get("/", indexView)
router.get("/signup-comensal", signupViewComensal)
router.get("/signup-restaurant", signupViewRestaurant)
router.post("/signup", signupProcessComensal)
router.post("/signup-restaurant", signupProcessRestaurant)
router.get("/login", loginView)
router.post("/login", loginProcess)
router.get("/profile", profileView)
router.get("/logout", logout)
router.post("/profile-picture", uploadPicture.single("image"), profilePicture)
//===========ITEMS==========
router.get('/item/:itemId', itemDetails)
module.exports = router
