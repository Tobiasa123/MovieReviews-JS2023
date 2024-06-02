const Review = require('../models/reviewModel')
const Movie = require('../models/movieModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

//userid is extracted from token not req.body
exports.createReview = async (req, res) =>{
    try{
        const { movieId, rating, comment } = req.body;
        
        //få userid
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

//hämtar alla reviews, inte detaljerad med title etc som när man specifierar med id som nedan
exports.getAllReviews = async (req, res) =>{
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json(error);
    }
}
// mer detaljerad review med info om movie och användare
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