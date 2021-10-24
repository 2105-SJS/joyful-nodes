const express = require("express");
const productsRouter = express.Router();
const { getAllProducts, getProductById } = require("../db");

productsRouter.use((req, res, next) => {
    console.log("A request has been made to /products");

    next();
});

productsRouter.get("/", async (req, res, next) => {
    try {
        const products = await getAllProducts();

        if (products) {
            res.send(products);
        } else {
            next(error);
        }
    }
    catch (error) {
        next(error);
    }
});

productsRouter.get("/:productId", async (req, res, next) => {
    const id = req.params.productId;

    try {
        const product = await getProductById(id);

        if (product) {
            res.send(product);
        } else {
            next(error);
        }
    }
    catch (error) {
        next(error);
    }
});

module.exports = productsRouter;