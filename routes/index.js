const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { getUserById } = require('../db')

const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/health', (req, res) => {
    res.send({message: 'Hello'});
});

apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if(!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
        try {
            const { id } = jwt.verify(token, JWT_SECRET)
            if (id) {
                req.user = await getUserById(id);
                next();
            }
        } catch ({ name, message}) {
            next ({ name, message });
        };
    } else {
        next ({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${prefix}`
        });
    };
});

const productsRouter = require('./products')
apiRouter.use('/products', productsRouter);

const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter);

const orderProductsRouter = require('./order_products');
apiRouter.use('/order_products', orderProductsRouter);

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const reviewsRouter = require('./reviews');
apiRouter.use('/reviews', reviewsRouter);

apiRouter.use((error, req, res, next) => {
    console.error(error)
    res.send(error);
});

module.exports = apiRouter;
