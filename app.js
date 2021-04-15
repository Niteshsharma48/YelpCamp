// Required Package Imports
var express          = require('express'),
    bodyparser       = require('body-parser'),
    mongoose         = require('mongoose'),
    passport         = require('passport'),
    LocalStrategy    = require('passport-local'),
    methodOverride   = require('method-override'),
    User             = require('./models/user'),
    flash            = require('connect-flash'),
//  seedDB           = require('./seeds'),
    app              = express(),
    connectionString = "mongodb+srv://admin:admin@cluster0.tklsx.mongodb.net/YelpCamp?retryWrites=true&w=majority";

// Requiring Routes
var indexRoutes      = require("./routes/index"),
    campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments");

//Configuration
mongoose.connect(connectionString,{useNewUrlParser : true , useUnifiedTopology : true});
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); - seeding DataBase

//Passport Configuration
app.use(require('express-session')({
  secret : "Admin@123",
  resave : false,
  saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/" , indexRoutes);
app.use("/campgrounds" , campgroundRoutes);
app.use("/campgrounds/:id/comments" , commentRoutes);

//Server Starting
app.listen(3000,()=>{
    console.log("YelpCamp Server is started !!!");
});