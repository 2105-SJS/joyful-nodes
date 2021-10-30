//ORDER_PRODUCTS ROUTER
const express = require('express');
const orderProductsRouter = express.Router();
const { requireUser } = require('./utils');
const { getOrderProductById, updateOrderProduct } = require('../db');

orderProductsRouter.use((req, res, next) => {
    console.log('A request is being made to /order_products');
    next();
});

orderProductsRouter.patch('/order_products/:orderProductId', requireUser, async (req, res,next) => {
    try {
        const { id } = req.params;
        const { price, quantity } = req.body;
        const orderProduct = await getOrderProductById(id);
        const _isOwner = async () => {
            const order = await getOrderById(orderProduct.orderId)
            if (order) {
                if (order.userId === req.user.id) {
                    return true;
                } else {
                    return false;
                };
            };
        };
        if (orderProduct && _isOwner) {
            const orderProdToUpdate = await updateOrderProduct ({ id, price, quantity });
            if (orderProdToUpdate) {
                res.status(200);
                res.send(orderProdToUpdate);
            } else {
                res.sendStatus(401);
                next ({
                    name: 'FailedUpdateError',
                    message: 'This order product was not successfully updated'
                });
            };
        };
    } catch (error) {
        next (error);
    };
});

module.exports = orderProductsRouter;