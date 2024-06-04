const Movie = require('../models/movieModel');
const Review = require('../models/reviewModel');

//create movie
exports.createMovie = async (req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();
        res.status(201).json('Movie created!');
    } catch (error) {
        res.status(400).json(error);
    }
};
//get all movies
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        if (!movies.length) {
            return res.status(404).json('No movies found');
        }
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json(error);
    }
};
//get movie by id
exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json('Movie not found');
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
};
//update specified movie
exports.updateMovie = async (req, res) => {
    try {
        const { title, director, releaseYear, genre } = req.body;
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            { title, director, releaseYear, genre },
            { new: true, runValidators: true }
        );
        if (!movie) {
            return res.status(404).json('Movie not found');
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
};
//delete specified movie
exports.deleteMovie = async (req, res) =>{
    try {
        const movie = await Movie.findOneAndDelete({ _id: req.params.id })
        if (!movie) {
            return res.status(404).json('Movie not found');
        }
        res.status(200).json('Movie Deleted');

    } catch (error) {
        res.status(500).json(error);
    }
}
//get all reviews for specified movie
exports.getReviewsForMovie = async (req, res) =>{
    try {
        const { id } = req.params;
        const reviews = await Review.find({ movieId: id });
        if(reviews.length === 0){
            return res.status(404).json("No reviews yet")
        }
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json(error);
    }
}
//get average rating of all movies, if unreviewed result is null
exports.getAverageRatings = async (req, res) => {
    try {
        const averageRatings = await Movie.aggregate([
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'movieId',
                    as: 'reviews'
                }
            },
            {
                $addFields: {
                    averageRating: { $avg: '$reviews.rating' }
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    averageRating: {
                        $ifNull: [
                            { $round: ['$averageRating', 1] }, 
                            null
                        ]
                    }
                }
            }
        ]);

        res.status(200).json(averageRatings);
    } catch (error) {
        res.status(500).json(error);
    }
};