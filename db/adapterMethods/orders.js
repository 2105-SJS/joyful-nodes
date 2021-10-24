
const client = require("../client");
const { getOrderProductsByOrder } = require ('./order_products');
const { getProductById } = require('./products');

const createOrder = async ({ status, userId }) => {
    try {
        const { rows: [order] } = await client.query(`
            INSERT INTO orders (status, "userId")
            VALUES ($1, $2)
            RETURNING *;
        `, [status, userId]);
        return order;        
    } catch (error) {
        console.error(error)
    };
};

const _joinOrderProducts = async (orderId) => {
    try {
        const order = await getOrderById(orderId);
        const orderProducts = await getOrderProductsByOrder({id: orderId});
        order.products = [];
        await Promise.all(orderProducts.map(async (orderProduct) => {
            const product = await getProductById(orderProduct.productId);
            product.price = orderProduct.price;
            product.quantity = orderProduct.quantity;
            order.products.push(product);
        }))
        return order;
    } catch (error) {
        console.error (error);
    };
};

const getAllOrders = async () => {
    try {
        const { rows: orders } = await client.query(`
            SELECT * FROM orders;
        `);
        const orderProducts = await Promise.all(orders.map(async (order) => {
            const orderProduct = _joinOrderProducts(order.id);
            return orderProduct;
        }));
        return orderProducts;
    } catch (error) {
        console.error (error);
    };
};

const getOrderById = async (id) => {
    try {
        const { rows: [order]} = await client.query (`
            SELECT * FROM orders
            WHERE id = $1;
        `,[id]);
        return order;
    } catch (error) {
        console.error(error);
    };
};

const getOrdersByUser = async ({ id }) => {
    try {
        const { rows: orders } = await client.query(`
            SELECT * FROM orders
            WHERE "userId" = $1;
        `,[id]);
        return orders;
    } catch (error) {
        console.error (error);
    };
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrdersByUser
};