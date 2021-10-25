//ORDERS ROUTER
const express = require("express");
const router = express.Router();
const {  } = require("../db");

router.use((req, res, next) => {
    console.log('A request has been made to /orders');

    next();
});

module.exports = router;