
const express = require ("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js")
const {listingSchema,reviewSchema} = require("../schema.js")
const ExpressError = require("../utils/ExpressError.js")
const Review  = require("../models/review.js");
const listings = require("../routes/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require ( 'multer');
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage});

router.route("/").get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync (listingController.createListing));
 // new route
router.get("/new",isLoggedIn,wrapAsync(listingController.renderNewform ));
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.deleteListing));
router.get("/:id/edit",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.renderEditform));
router.get("/search",async(req,res) =>{
    let {country} = req.query;
    if(country){
      const allListing = await Listing.find({country:country});
       return res.render("./listings/index.ejs", { allListing } );
  
    }
     

})
module.exports= router;

    