const express = require('express');
const router = express.Router();
const {isAdmin} = require('../middleware/isAdmin')
const movieController = require('../controllers/movieController');
const auth = require('../middleware/auth')


router.post('/movies', auth.verifyToken, isAdmin, movieController.createMovie);
router.get('/movies', auth.verifyToken, movieController.getAllMovies);
router.get('/movies/ratings', auth.verifyToken, movieController.getAverageRatings)
router.get('/movies/:id', auth.verifyToken, movieController.getMovieById);
router.put('/movies/:id', auth.verifyToken, isAdmin, movieController.updateMovie);
router.delete('/movies/:id', auth.verifyToken, isAdmin, movieController.deleteMovie)
router.get('/movies/:id/reviews', auth.verifyToken, movieController.getReviewsForMovie)



module.exports = router;
