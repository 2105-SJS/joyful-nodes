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

const destroyProduct = async (id) => {
    try {
        const {rows: [product] } = await client.query(`
            DELETE FROM products
            WHERE id = $1
            RETURNING *;
        `, [id]);
        await client.query(`
            DELETE FROM order_products
            USING orders
            WHERE orders.status != 'completed' AND order_products."productId"=$1;
    `, [id]);
        return product;
    } catch (error) {
        throw error;
    }
  }

  const updateProduct = async ({
    name,
    description,
    price,
    imgURL,
    inStock,
    category
}) => {
    try {
        const {rows: [product] } = await client.query(`
            UPDATE products
            SET name=$1, description=$2, price=$3, "imgURL"=$4, "inStock"=$5, category=$6
            WHERE id=$7
            RETURNING *;
        `, [name, description, price, imgURL, inStock, category, id]);
        return product;
    } catch (error) {
        throw error;
    }
  }

module.exports = {
    // db methods
    getProductById,
    getAllProducts,
    createProduct,
    updateProduct,
    destroyProduct
}