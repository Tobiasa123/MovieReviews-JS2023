const Review = require('../models/reviewModel')
const Movie = require('../models/movieModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

//create review, if logged in userid is already applied so dont need to specify in body
exports.createReview = async (req, res) =>{
    try{
        const { movieId, rating, comment } = req.body;
        
        const userId = req.user.userId;

        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(404).json('Movie not found');
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(404).json('User not found');
        }
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json('Movie not found');
        }
    
        const newReview = new Review({
            movieId,
            userId,
            rating,
            comment
        });

        await newReview.save();

        res.status(201).json('Review created successfully');
    } catch (error) {
        res.status(400).json(error.message)
    }
}

//get all reviews
exports.getAllReviews = async (req, res) =>{
    try {
        const reviews = await Review.find();
        if (reviews.length === 0) {
            return res.status(404).json('No reviews found');
        }
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json(error);
    }
}
//get specified review, more detailed then get all
exports.getOneReview = async (req, res) =>{
    try {
        const review = await Review.findById(req.params.id).populate('movieId').populate({path: 'userId', select: 'username'});
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json(error);
    }
}
//update specified review
exports.updateReview = async (req, res) =>{
    try {
        const { rating, comment } = req.body;

        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            { rating, comment },
            { new: true, runValidators: true }
        );

        if (!updatedReview) {
            return res.status(404).json('Review not found');
        }

        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json(error);
    }
}
//delete specified review
exports.deleteReview = async (req, res) =>{
    try {
        const review = await Review.findByIdAndDelete(req.params.id)
        if (!review) {
            return res.status(404).json('Review not found');
        }
        res.status(200).json("Review deleted");
    } catch (error) {
        res.status(500).json(error);
    }
}