const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const Review = require("../models/reviews");
router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
router.post("/getroombyid", async (req, res) => {
  const roomid = req.body.roomid;
  console.log(roomid);
  try {
    const room = await Room.findOne({ _id: roomid });
    res.send(room);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
  
});
router.post("/addroom", async (req, res) => {
  const newroom = req.body;
  try {
    const room = new Room(newroom);
    await room.save();
    res.send("New Room Added Successfully");
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

router.get("/reviews/getreview/:roomId", async (req, res) => {
  
  try {
    
    
    const review = await Review.find({room:req.params.roomId});
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.send("sucess");
    
    
  } catch (error) {
    console.error('Error fetching review by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
});
router.post("/reviews/addreview", async (req, res) => {
  const newreview = req.body;
  try {
    const review = new Review(newreview);
    await review.save();
    res.send("New Review Added Successfully");
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});



function calculateAverageRating(ratings) {
  if (ratings.length === 0) return 0;
  const totalRating = ratings.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / ratings.length;
}

module.exports = router;
