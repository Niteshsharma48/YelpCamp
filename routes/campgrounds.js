var express    = require('express'),
    Campground = require('../models/campgrounds'),
    middleWare = require("../middleware"),
    router     = express.Router();

// =======================
// Campground ROUTES
// =======================

//INDEX ROUTE
router.get("/",(req,res)=>{
    Campground.find({},function(err,campgrounds){
       if(err){
         req.flash("error",err.message);
       }else{
        res.render("campgrounds/index",{campgrounds : campgrounds , currentUser : req.user});
       }
    });
});
  
  //NEW ROUTE
  router.get("/new",middleWare.isLoggedIn,(req,res)=>{
    res.render("campgrounds/new");
  });
  
  //CREATE ROUTE
  router.post("/",middleWare.isLoggedIn,(req,res)=>{
     var name        = req.body.name,
         price       = req.body.price,
         image       = req.body.image,
         description = req.body.description,
         author      = {
           id : req.user._id,
           username : req.user.username
          };
     var newCampground = {name : name , price:price, image : image, description:description,author:author};
  
     Campground.create(newCampground, function(err,allCampground){
        if(err){
          console.log(err);
        }else{
          res.redirect("/campgrounds");
        }
      }
    );
  });
  
  //SHOW ROUTE
  router.get("/:id",(req,res)=>{
     Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
          console.log(err);
        }else{
          res.render("campgrounds/show",{campground:foundCampground});
        }
     });
  });
 
 // EDIT Campground Route
 router.get("/:id/edit", middleWare.checkCampgroundOwnership,function(req,res){
   Campground.findById(req.params.id,function(err,foundCampground){
      res.render("campgrounds/edit",{campground:foundCampground});
    });
  });

 // UPDATE Campground Route
 router.put("/:id",middleWare.checkCampgroundOwnership,function(req,res){
   Campground.findByIdAndUpdate(req.params.id , req.body.campground,function(err,updatedCampground){
     if(err){
       res.redirect("/campgrounds");
     }else{
       res.redirect("/campgrounds/"+req.params.id);
     }
   });
 });
 
 //DESTROY Campground Route
 router.delete("/:id",middleWare.checkCampgroundOwnership,function(req,res){
   Campground.findByIdAndRemove(req.params.id , function(err){
     if(err){
       res.redirect("/campgrounds");
     }else{
      res.redirect("/campgrounds");
     }
   });
 });

module.exports = router;