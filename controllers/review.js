const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    newReview.author = req.user._id;
    console.log(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "new review is created");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview = async (req, res) => {
    let { id , reviewId} = req.params;
   await Listing.findByIdAndUpdate(id, {$pull: {review: reviewId }});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "review is deleted");
    res.redirect(`/listings/${id}`);
};