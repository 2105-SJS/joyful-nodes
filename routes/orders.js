//ORDERS ROUTER
const express = require('express');
const router = express.Router();
const { requireUser } = require('./utils');

router.use((req, res, next) => {
    console.log('A request is being made to /orders');
    next();
})

module.exports = router;