const express = require("express");
const productsRouter = require("./products");
const apiRouter = express();

apiRouter.use("/products", productsRouter);

module.exports = apiRouter;
