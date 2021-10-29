//ORDERS ROUTER
const express = require('express');
const router = express.Router();
const { requireAdmin, requireUser } = require('./utils');

router.use((req, res, next) => {
    console.log('A request is being made to /orders');
    next();
});

router.get('/', requireAdmin, async (req, res, next) => {
    try {
        const orders = await getAllOrders();
        if (orders) {
            res.send (orders);
        };
    } catch (error) {
        next (error);
    };
});

module.exports = router;