var express    = require('express'),
    Campground = require("../models/campgrounds"),
    Comment    = require("../models/comments"),
    middleWare = require("../middleware"),
    router     = express.Router({mergeParams:true});


//Comments GET Request Route - NEW

router.get("/new" , middleWare.isLoggedIn , function(req,res){
    Campground.findById(req.params.id , function(err,campground){
      if(err){
        console.log(err);
      }else{
        res.render("comments/new",{campground : campground});
      }
    });
});
  
//Comments POST Response Route - CREATE

router.post("/" , middleWare.isLoggedIn , function(req,res){
    Campground.findById(req.params.id,function(err,campground){
      if(err){
         res.redirect("/campgrounds");
      }else{
         Comment.create(req.body.comment,(err,comment)=>{
           if(err){
             req.flash("error","Something Went Wrong!!!");
             console.log(err);
           }else{
             //add username and id to comment
             comment.author.id = req.user._id;
             comment.author.username = req.user.username;
             //save comment
             comment.save();
             campground.comments.push(comment);
             campground.save();
             req.flash("success","Successfully Added Comment!!!");
             res.redirect("/campgrounds/" + campground._id);
           }
         });
       }
    });
});

// Comments EDIT Route
router.get("/:comment_id/edit",middleWare.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
      if(err){
        res.redirect("back");
      }else{
        res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
      }
    });
});

//Comments UPDATE Route
router.put("/:comment_id",middleWare.checkCommentOwnership,function(req,res){
  Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err){
    if(err){
      res.redirect("back");
    }else{
      res.redirect("/campgrounds/"+req.params.id);
    }
  });
});

//Comments DESTROY Route
router.delete("/:comment_id",middleWare.checkCommentOwnership,function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id,function(err){
    if(err){
      res.redirect("back");
    }else{
      req.flash("success","Comment Deleted Successfully!!!");
      res.redirect("/campgrounds/"+req.params.id);
    }
  });
});

module.exports = router;