const { client } = require("../client");

const getProductById = async (id) => {
    try {
        const { rows: [product] } = await client.query(`
        SELECT *
        FROM products
        WHERE id=$1;
      `, [id]);
        return product;
    } catch (error) {
        throw error;
    }
}

const getAllProducts = async () => {
    try {
        const { rows: products } = await client.query(`
        SELECT *
        FROM products;
      `);
        return products;
    } catch (error) {
        throw error;
    }
}

const createProduct = async ({
    name,
    description,
    price,
    imgURL,
    inStock,
    category
}) => {
    try {
        if(!inStock){
            inStock = false;
        }
        const { rows: [product] } = await client.query(`
        INSERT INTO products(name, description, price, "imgURL", "inStock", category) 
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `, [name, description, price, imgURL, inStock, category]);
        return product;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    // db methods
    getProductById,
    getAllProducts,
    createProduct
}