const Review = require('../models/reviews');
const Room = require('../models/room');


exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    console.error('Error fetching review by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.getReviewByRoomId=async(req,res)=>{
    try {
        const review = await Review.find({room:req.params.roomId});
        if (!review) {
          return res.status(404).json({ error: 'Review not found' });
          
        }
        res.send(review);
      } catch (error) {
        console.error('Error fetching review by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}