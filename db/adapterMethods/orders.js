const client = require("../client");

const createOrder = async ({status, userId}) => {
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

const getAllOrders = async () => {
    try {
        const { rows } = await client.query(`
            SELECT * FROM orders;
        `);
        return rows;
    } catch (error) {
        console.error (error);
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
    getOrderById,
    getAllOrders,
    getOrdersByUser
};