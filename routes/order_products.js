//ORDER_PRODUCTS ROUTER
const express = require('express');
const orderProductsRouter = express.Router();
const { requireUser } = require('./utils');
const { getOrderProductById, updateOrderProduct, getProductById } = require('../db');

orderProductsRouter.use((req, res, next) => {
    console.log('A request is being made to /order_products');
    next();
});

orderProductsRouter.patch('/:orderProductId', requireUser, async (req, res,next) => {
    try {
        const { orderProductId } = req.params;
        const { quantity } = req.body;
        const orderProduct = await getOrderProductById(orderProductId);
        const product = await getProductById (orderProduct.productId);
        const { price } = product;
        const newPrice = quantity * Number(price);
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
            const orderProdToUpdate = await updateOrderProduct ({ id: 
                orderProductId, price: newPrice, quantity });
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