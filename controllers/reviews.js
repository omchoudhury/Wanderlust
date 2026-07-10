
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
module.exports.createReview = async (req, res) => {

        let { id } = req.params;

        // Find Listing
        let listing = await Listing.findById(id);

        if (!listing) {
            throw new ExpressError("Listing not found", 404);
        }

        // Create New Review
        let newReview = new Review(req.body.review);
        newReview.author = req.user._id;
        // Save Review
        await newReview.save();

        // Push Review ID into Listing
        listing.reviews.push(newReview);

        // Save Listing
        await listing.save();
        req.flash("success","Successfully made a new review");
        console.log("Review Added Successfully");

        // Redirect
        res.redirect(`/listings/${id}`);
    }

    module.exports.deleteReview = async (req, res) => {
    
            let { id, reviewId } = req.params;
    
            // Delete Review
            await Review.findByIdAndDelete(reviewId);
    
            // Remove Review ID from Listing
            await Listing.findByIdAndUpdate(id, {
                $pull: { reviews: reviewId },
            });
    
            req.flash("success", "Review deleted successfully");
            console.log("Review Deleted Successfully");
    
            // Redirect
            res.redirect(`/listings/${id}`);
        }