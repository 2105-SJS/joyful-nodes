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
        
    } catch (error) {
        console.error(error);
    };
};

const destroyOrderProduct = async (id) => {
    try {
        
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