const express = require('express');
const router = express.Router();
const reviewController = require('../Controllers/ReviewController');

// Get all reviews
router.get('/', reviewController.getAllReviews);

// Get review by id
router.get('/:reviewId', reviewController.getReviewById);

module.exports = router;
