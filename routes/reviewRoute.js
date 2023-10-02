const router = require("express").Router();
const Room = require("../models/room");
const Review = require("../models/reviews");
const User = require("../models/user");


// Get all reviews by room id and display user name, rating, and comment
router.get("/:id", async (req, res) => {
    try {
        const result = await Review.find({roomid:req.params.id})
        if(!result) return res.status(400).send("No review found with the given id");
        res.send(result);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}
);

// Add a review to a room
router.post("/getreviews", async (req, res) => {
    try {
        const newReview = new Review(req.body);
        const result = await newReview.save();
       
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});
//get all reviews
router.get("/", async (req, res) => {
    try {
        const result = await Review.find();
        if(!result) return res.status(400).send("No review found with the given id");
        res.send(result);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}
);



   
    module.exports = router;

