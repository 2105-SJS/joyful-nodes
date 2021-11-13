const express = require('express');
const reviewsRouter = express.Router();
const { requireUser } = require('./utils');
const {
    createReview,
    updateReview,
    destroyReview,
    getReviewById,
    getReviewsByProduct,
    getAllReviews
} = require('../db');
const { types } = require('pg');

reviewsRouter.use((req, res, next) => {
    console.log('A request is being made to /reviews');
    next();
});

reviewsRouter.get('/', requireUser, async (req, res, next) => {
    try {
        const reviews = await getAllReviews();
        if (reviews) {
            res.send(reviews);
        };
    } catch (error) {
        next(error);
    };
});

reviewsRouter.get('/:reviewId', requireUser, async (req, res, next) => {
    const { reviewId } = req.params;
    try {
        const review = await getReviewById(reviewId);
        if (review) {
            res.send(review);
        };
    } catch (error) {
        next(error);
    };
});

reviewsRouter.get('/product/:productId', requireUser, async (req, res, next) => {
    const { productId } = req.params;
    try {
        const id = parseInt(productId, 10);
        const reviews = await getReviewsByProduct(id);
        if (reviews) {
            res.send(reviews);
        };
    } catch (error) {
        next(error);
    };
});

reviewsRouter.post('/', requireUser, async (req, res, next) => {
    const { title, content, stars, userId, productId } = req.body;
    try {
        const review = await createReview({ title, content, stars, userId, productId });
        if (review) {
            res.status(200);
            res.send(review);
        };
    } catch (error) {
        next(error);
    };
});

reviewsRouter.patch('/:reviewId', requireUser, async (req, res, next) => {
    const { reviewId } = req.params;
    const { title, content, stars, productId, userId } = req.body;
    try {
        const review = await getReviewById(reviewId);
        if (review.userId === req.user.id) {
            const updatedReview = await updateReview({ id: reviewId, title, content, stars, productId, userId });
            if (updatedReview) {
                res.status(200);
                res.send(updatedReview);
            };
        };
    } catch (error) {
        next(error);
    };
});

reviewsRouter.delete('/:reviewId', requireUser, async (req, res, next) => {
    const { reviewId } = req.params;
    try {
        const review = await getReviewById(reviewId);
        if (review.userId === req.user.id) {
            const deletedReview = await destroyReview(reviewId);
            if (deletedReview) {
                res.status(200);
                res.send(deletedReview);
            };
        };
    } catch (error) {
        next(error);
    };
});

module.exports = reviewsRouter;