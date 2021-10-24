const client = require("../client");

const addProductToOrder = async ({ orderId, productId, price, quantity }) => {
    try {
        const { rows: [orderProducts] } = await client.query(`
            INSERT INTO order_products ("orderId", "productId", price, quantity)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT ("orderId", "productId") DO UPDATE
            SET price = $3, quantity = $4
            RETURNING*;
        `,[orderId, productId, price, quantity]);
        return orderProducts;
    } catch (error) {
        console.error(error)
    };
};

const getOrderProductById = async (id) => {
    try {
        const { rows: [orderProduct] } = await client.query (`
            SELECT * FROM order_products
            WHERE id = $1;
        `,[id]);
        return orderProduct;
    } catch (error) {
        console.error(error);
    };
};

const updateOrderProduct = async({ id, price, quantity }) => {
    try {
        const { rows: [orderProduct] } = await client.query (`
            UPDATE order_products
            SET price = $1, quantity = $2
            WHERE id = $3
            RETURNING *;
        `,[price, quantity, id]);
        return orderProduct;
    } catch (error) {
        console.error(error);
    };
};

const destroyOrderProduct = async (id) => {
    try {
        const { rows: [destroyedOrderProduct] } = await client.query (`
            DELETE * FROM order_products
            WHERE id = $1
            RETURNING *;
        `,[id]);
        return destroyedOrderProduct;
    } catch (error) {
        console.error(error);
    };
};

module.exports = {
    addProductToOrder,
    getOrderProductById,
    updateOrderProduct,
    destroyOrderProduct    
};