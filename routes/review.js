const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/WrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const { validateReview } = require("../middleware.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { isLoggedIn,isReviewAuthor } = require("../middleware.js");




// ======================
// POST Review Route
// ======================
const reviews = require("../controllers/reviews.js");
router.post(
    "/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviews.createReview)
);


// ======================
// DELETE Review Route
// ======================

router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviews.deleteReview)
);


module.exports = router;