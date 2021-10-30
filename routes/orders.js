//ORDERS ROUTER
const express = require('express');
const ordersRouter = express.Router();
const { requireAdmin, requireUser } = require('./utils');
const { 
    createOrder,
    getAllOrders, 
    getCartByUser, 
    addProductToOrder, 
    getOrderById, 
    getOrderProductByOrderAndProduct, 
    updateOrderProduct } = require('../db')

const client = require('../db/client')

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

ordersRouter.get('/cart', requireUser, async (req, res, next) => {
    try {
        const { id } = req.user;
        const cart = await getCartByUser({ id });
        if (cart) {
            res.send (cart);
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
            res.status(200);
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

ordersRouter.post('/:orderId/products', requireUser, async (req, res, next) => {
    try {
        const { productId, price, quantity } = req.body;
        const { orderId } = req.params;
        const _isOwner = async () => {
            const order = await getOrderById(orderId)
            if (order) {
                if (order.userId === req.user.id) {
                    return true;
                } else {
                    return false;
                };
            };
        };
        const orderProduct = await getOrderProductByOrderAndProduct ({ orderId, productId });
        if (!orderProduct && _isOwner) {
            const prodAddedToOrder = await addProductToOrder({ orderId, productId, price, quantity });
            if (prodAddedToOrder) {
                res.status(200);
                res.send(prodAddedToOrder);
            } else {
                res.sendStatus(401);
                next ({
                    name: 'FailedCreateError',
                    message: 'This product was not successfully added to the order'
                });
            };   
        } else if (_isOwner) {
            const { id } = orderProduct;
            const updatedOrderProd = await updateOrderProduct({ id, price, quantity });
            if (updatedOrderProd) {
                res.status(200);
                res.send(updatedOrderProd);
            } else {
                res.sendStatus(401);
                next ({
                    name: 'FailedUpdateError',
                    message: 'This order product was not successfully updated'
                });
            };
        } else {
            res.status (401);
        };        
    } catch (error) {
        next (error);
    };
});

module.exports = ordersRouter;