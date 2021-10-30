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
    updateOrderProduct,
    getProductById
} = require('../db');

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
        const { orderId } = req.params;
        const { productId, quantity } = req.body;
        const order = await getOrderById(orderId);
        const product = await getProductById(productId);
        const newPrice = quantity * Number(product.price);
        if (order) {
            if (order.userId !== req.user.id) {
                res.status(401);
                throw new Error ('UnauthorizedUser')
            }
            const orderProduct = await getOrderProductByOrderAndProduct({ orderId, productId });
            if (!orderProduct) {
                const newOrderProduct = await addProductToOrder ({ orderId, productId, price: newPrice, quantity })
                if (newOrderProduct) {
                    res.status(200);
                    res.send(newOrderProduct);
                } else {
                    res.sendStatus(401);
                    next ({
                        name: 'FailedCreateError',
                        message: 'The product was not successfully added to the order'
                    });
                };
            } else {
                const { id } = orderProduct;
                const updatedOrderProduct = await updateOrderProduct ({ id, price: newPrice, quantity })
                console.log(updatedOrderProduct)
            }
            
        };
    } catch (error) {
        next (error);
    };
});

module.exports = ordersRouter;