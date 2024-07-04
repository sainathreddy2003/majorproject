const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")
const User = require("./user.js")
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url : String,
    filename : String,

  },
  price: Number,
  location: String,
  country: String,
  reviews: [{
    type : Schema.Types.ObjectID,
    ref :"Review"
  }],
  owner: {
    type  : Schema.Types.ObjectId,
    ref : "User",
  },
  category: {
    type: String,
    enum: [ "Trending",
      "Room",
      "Iconic cities",
      "Mountains",
      "Castles",
      "Amazing pools",
      "Camping",
      "Farms",
      "Arctic",
      "Domes",
      "Boats"], // Add other categories as needed
}

});
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
  await Review.deleteMany(
    {_id :{$in: listing.reviews}}
  )
}
}
)


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;