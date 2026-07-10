const Listing = require("./models/listing");
const { listingSchema,reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review");


module.exports.isLoggedIn = (req, res, next) => {
 if(!req.isAuthenticated()){
  req.session.redirectUrl = req.originalUrl;
    req.flash("error","You must be logged in to create a listing");
    return res.redirect("/login");
  }

  next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }

  next();
} 




module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;

  const listing = await Listing.findById(id).populate("owner");

  if (!listing) {
    req.flash("error", "Cannot find that listing");
    return res.redirect("/listings");
  }

  if (!listing.owner._id.equals(req.user._id)) {
    req.flash(
      "error",
      "only the owner of the listing can perform that action"
    );
    return res.redirect(`/listings/${id}`);
  }

  next();
};


//validate listings
module.exports.validateListing = (req, res, next) => {
  let result = listingSchema.validate(req.body);
  console.log(result);  
if(result.error){
  throw new ExpressError(result.error.details.map(el => el.message).join(", "),400);
}else {
 next();
}
};

// Validate Review Middleware
const validateReview = (req, res, next) => {
    let result = reviewSchema.validate(req.body);

    if (result.error) {
        throw new ExpressError(
            result.error.details.map((el) => el.message).join(", "),
            400
        );
    } else {
        next();
    }
};

module.exports.validateReview = validateReview;


module.exports.isReviewAuthor= async (req, res, next) => {
  let { id, reviewId } = req.params;

  const review = await Review.findById(reviewId).populate("author");

  if (!review) {
    req.flash("error", "Cannot find that review");
    return res.redirect("/listings");
  }

  if (!review.author._id.equals(req.user._id)) {
    req.flash(
      "error",
      "only the owner of the review can perform that action"
    );
    return res.redirect(`/listings/${id}`);
  }

  next();
};