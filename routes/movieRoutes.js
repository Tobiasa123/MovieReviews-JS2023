const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController');
const auth = require('../middleware/auth')

router.post('/movies', auth.verifyToken, movieController.createMovie);
router.get('/movies', auth.verifyToken, movieController.getAllMovies);
router.get('/movies/:id', auth.verifyToken, movieController.getMovieById);
router.put('/movies/:id', auth.verifyToken, movieController.updateMovie);
router.delete('/movies/:id', auth.verifyToken, movieController.deleteMovie)
router.get('/movies/:id/reviews', auth.verifyToken, movieController.getReviewsForMovie)

module.exports = router;
