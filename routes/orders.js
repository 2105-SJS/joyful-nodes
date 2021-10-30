//ORDERS ROUTER
const express = require('express');
const ordersRouter = express.Router();
const { requireAdmin, requireUser } = require('./utils');
const { createOrder, getAllOrders } = require('../db')

ordersRouter.use((req, res, next) => {
    console.log('A request is being made to /orders');
    next();
});

ordersRouter.get('/', requireAdmin, async (req, res, next) => {
    try {
        const orders = await getAllOrders();
        if (orders) {
            res.send (orders);
        };
    } catch (error) {
        next (error);
    };
});

ordersRouter.post('/', requireUser, async (req, res, next) => {
    try {
        const { id } = req.user;
        const order = await createOrder({ userId: id });
        if (order) {
            res.send (order);
        } else {
            res.sendStatus(401);
                next ({
                    name: 'FailedCreateError',
                    message: 'This order was not sucessfully created'
                });
        };
    } catch (error) {
        next (error);
    };
});

module.exports = ordersRouter;