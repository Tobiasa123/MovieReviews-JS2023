const Movie = require('../models/movieModel');

exports.createMovie = async (req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();
        res.status(201).json('Movie created!');
    } catch (error) {
        res.status(400).json(error);
    }
};

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
exports.deleteMovie = async (req, res) =>{
    try {
        const movie = await Movie.findOneAndDelete(req.params.id)
        if (!movie) {
            return res.status(404).json('Movie not found');
        }
        res.status(200).json('Movie Deleted');

    } catch (error) {
        res.status(500).json(error);
    }
}