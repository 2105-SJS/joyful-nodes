//ORDER_PRODUCTS ROUTER
<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const { requireUser } = require('./utils');

router.use((req, res, next) => {
    console.log('A request is being made to /order_products');
    next();
})
=======
const express = require("express");
const router = express.Router();
const {  } = require("../db");

router.use((req, res, next) => {
    console.log('A request has been made to /order_products');

    next();
});
>>>>>>> dev

module.exports = router;