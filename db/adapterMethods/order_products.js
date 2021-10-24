const client = require("../client");

const addProductToOrder = async ({ orderId, productId, price, quantity }) => {
    try {
        const { rows: [orderProducts] } = await client.query(`
            INSERT INTO order_products ("orderId", "productId", price, quantity)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT ("orderId", "productId") DO UPDATE
            SET price = $3, quantity = $4
            RETURNING*
        `,[orderId, productId, price, quantity]);
        return orderProducts;
    } catch (error) {
        console.error(error)
    };
};

module.exports = {
    addProductToOrder    
};