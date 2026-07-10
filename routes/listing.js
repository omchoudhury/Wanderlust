const express =require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/WrapAsync.js");
const {isLoggedIn} =require("../middleware.js");
const {isOwner} = require("../middleware.js");
const {validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const { listingSchema } = require("../schema.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage: storage });


//index & create route
router.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn,
  
  upload.single('listing[image]'),
   validateListing, 
  wrapAsync(listingController.createListing));
 

// new route  
router.get("/new", isLoggedIn,listingController.renderNewForm); 


//show, update & delete route
router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.updateListing)
)
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));





// edit route
router.get("/:id/edit", isLoggedIn,isOwner,validateListing, wrapAsync(listingController.renderEditForm));





module.exports = router;