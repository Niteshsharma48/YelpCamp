var Campground = require("../models/campgrounds"),
    Comment    = require("../models/comments"),
    middleWare = {};

middleWare.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error","You Need To Be LoggedIn To Do That!!!");
    res.redirect("/login");
  };
  
middleWare.checkCampgroundOwnership = function (req,res,next){
    if(req.isAuthenticated()){
      Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
          req.flash("error","Campground Not Found!!!");
          res.redirect("back");
        }else{
          if(foundCampground.author.id.equals(req.user.id)){
            next();
          }else{
            req.flash("error","You Don't Have Permission To Do That!!!");
            res.redirect("back");
          }
        }
      });
    } else{
      req.flash("error","You Need To Be LoggedIn To Do That!!!");
      res.redirect("back");
  }
};

middleWare.checkCommentOwnership = function (req,res,next){
    if(req.isAuthenticated()){
      Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
          res.redirect("back");
        }else{
          if(foundComment.author.id.equals(req.user.id)){
            next();
          }else{
            req.flash("error","You Don't Have Permission To Do That!!!");
            res.redirect("back");
          }
        }
      });
    } else{
      req.flash("error","You Need To Be LoggedIn To Do That!!!");
      res.redirect("back");
    }
};

module.exports = middleWare;