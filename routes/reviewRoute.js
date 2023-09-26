const router = require("express").Router();
const Room = require("../models/room");
const Review = require("../models/reviews");

router.get("api/rooms/reviews/:roomId", async (req, res) => {
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
    router.post("/api/rooms/reviews/postreview/:roomId", async (req, res) => {
        const { roomId } = req.params;
        const { userid, rating, comment } = req.body;
        console.log(userid);
        console.log(roomId);
        console.log(rating);
        console.log(comment);
        try {
            const room = await Review.findById(roomId);
            if (!room) {
                return res.status(400).json({ error: "Room not found" });
            }
            const review = new Review({
                userid,
                roomid : roomId,
                rating,
                review : comment
            });
            await review.save();
            return res.status(201).json(review);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });
    module.exports = router;

