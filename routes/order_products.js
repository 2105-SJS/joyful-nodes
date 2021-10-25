//ORDER_PRODUCTS ROUTER
const express = require("express");
const router = express.Router();
const {  } = require("../db");

router.use((req, res, next) => {
    console.log('A request has been made to /order_products');

    next();
});

module.exports = router;