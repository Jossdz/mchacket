const { Router } = require("express")
const uploadPicture = require("../config/ cloudinary")
const {
  viewCreateRestaurant,
  createRestaurant,
  restaurantsUser,
  restaurantDetail,
  newItemForm,
  createItem
} = require("../controllers/restaurantControllers")
const router = Router()

router.get("/create", viewCreateRestaurant)
router.post("/create", uploadPicture.single("image"), createRestaurant)
router.get("/restaurants-user", restaurantsUser)
router.get("/:restaurantId", restaurantDetail)
router.get("/:restaurantId/new-item", newItemForm)
router.post(
  "/:restaurantId/new-item",
  uploadPicture.single("image"),
  createItem
)

module.exports = router
