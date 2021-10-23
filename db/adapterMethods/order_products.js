const client = require("../client");

const addProductToOrder = async ({ orderId, productId, price, quantity }) => {
    try {
        const { rows: [orderProducts]} = await client.query(`
            SELECT * FROM order_products
            WHERE "orderId" = $1;
        `,[orderId]);
        if (orderProducts) {
            console.log('whatever')
        }
        return orderProducts;        
    } catch (error) {
        console.error(error)
    };
};


module.exports = {
    addProductToOrder    
};