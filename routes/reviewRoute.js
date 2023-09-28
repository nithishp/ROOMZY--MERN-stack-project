const router = require("express").Router();
const Room = require("../models/room");
const Review = require("../models/reviews");

router.get("/api/rooms/reviews/:roomId", async (req, res) => {
    console.log("Inside get review");
    const { roomId } = req.params;
    console.log(roomId);
    try {
        const room = await Review.findById(roomId);

        if (!room) {
        return res.status(400).json({ error: "Room not found" });
        }
        const result = {
            userid : room.userid,
            roomid : room.roomid,
            rating : room.rating,
            comment : room.review

        }
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
    });
   
    module.exports = router;

