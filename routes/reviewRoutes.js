const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const reviewController = require('../controllers/reviewController')

router.post('/reviews', auth.verifyToken, reviewController.createReview)
router.get('/reviews', auth.verifyToken, reviewController.getAllReviews)
router.get('/reviews/:id', auth.verifyToken, reviewController.getOneReview)
router.put('/reviews/:id', auth.verifyToken, reviewController.updateReview)
router.delete('/reviews/:id', auth.verifyToken, reviewController.deleteReview)


module.exports = router;
