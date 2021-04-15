var mongoose   = require('mongoose'),
    Campground = require('./models/campgrounds'),
    Comment    = require('./models/comments');


var data = [
    {
        name: "RV Park",
        image: "https://media.kare11.com/assets/KARE/images/437173820/437173820_750x422.png",
        description: " RV Luxury Parks "
    },
    {
        name: "Goverment Campgrounds",
        image: "https://www.parks.ca.gov/pages/712/images/DayCamping1.jpg",
        description: " Goverment Property Open During COVID-19 "
    },
    {
        name: "Cloud's Rest",
        image: "https://www.visitflorida.com/content/dam/visitflorida/en-us/images/full-rights/PHOTO%20ICON%20CAMPING%20FISHEATING%20CREEK%20%28Peter%20W.%20Cross%20and%20Patrick%20Farrell%29.jpg.1280.500.imagerendition",
        description: "Luxury Campgrounds"
    }
];

function seedDB() {
    Comment.remove({},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Comments Deleted Successfully");
        }
    });
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }else{
            console.log("remove campgrounds!");
        }

        data.forEach(function(seed){
            Campground.create(seed, function(err,campground){
                if(err){
                    console.log(err);
                } else {
                    Comment.create(
                        {
                            text:"it is very good place",
                            author:"nitesh"
                        }, (err , comment)=>{
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("added a new comment");
                            }
                        }
                    );
                }
            });
        });
    });
}

module.exports = seedDB;