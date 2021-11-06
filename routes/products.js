const express = require("express");
const productsRouter = express.Router();
const { getAllProducts, getProductById, createProduct, destroyProduct } = require("../db");

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
    const { productId } = req.params;

    try {
        const product = await getProductById(productId);

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

productsRouter.post('/', requireAdmin, async (req, res, next) => {
    const { name, description, price, imgURL, inStock, category } = req.body;
    try {
        const product = await createProduct({
            name: name, 
            description: description, 
            price: price, 
            imgURL: imgURL, 
            inStock: inStock, 
            category: category
        });
        if (product) {
            res.send (product);
        };
    } catch (error) {
        next (error);
    };
});

productsRouter.delete('/:productId', requireAdmin, async (req, res, next) => {
    const { productId } = req.params
    try {
        const product = await destroyProduct(productId);
        if (product) {
            res.send (product);
        };
    } catch (error) {
        next (error);
    };
});

module.exports = productsRouter;