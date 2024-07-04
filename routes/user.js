const express = require ("express");
const router = express.Router();
const User = require( "../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const{saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");
const Listing = require("../models/listing.js");
const { route } = require("./listing.js");
 

router
 .route("/signup")
    .get(userController.renderSignupform)
    .post( wrapAsync (userController.signup));

router
 .route("/login")
    .get(userController.renderLoginform)
    .post( saveRedirectUrl,
    passport.authenticate("local", {
       failureRedirect: "/login",
       failureFlash: true, }),
  userController.Login);
router.get("/logout", userController.Logout);
router.get("/search",(async(req,res) =>{
   let {country} = req.query;
   if(country){
     const allListing = await Listing.find({country:country});
      return res.render("./listings/index.ejs", { allListing } );
 
   }

    
 
 
 }))
 router.get("/filters",async(req,res) =>{
   // console.log(req);
   let {category} = req.query;
  // console.log(category)
   if(category){
     const allListing = await Listing.find({category:category});
      return res.render("./listings/index.ejs", { allListing } );
 
   }})
module.exports = router 