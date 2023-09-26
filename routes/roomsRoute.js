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

router.post("/api/rooms/reviews/:roomId", async (req, res) => {
  
  const { roomId } = req.params;
  console.log(roomId);
  const { rating, comment } = req.body;
  try {
    const room = await Review.findById(roomId);

    if (!room) {
      return res.status(500).json({ error: "Room not found" });
    }
 
    const newReview = { rating, comment };
    room.ratings.push(newReview);

    room.averageRating = calculateAverageRating(room.ratings);

    await room.save();

    return res.json(room);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});



function calculateAverageRating(ratings) {
  if (ratings.length === 0) return 0;
  const totalRating = ratings.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / ratings.length;
}

module.exports = router;
