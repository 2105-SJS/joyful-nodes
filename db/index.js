const { Client } = require("pg");
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/shoes-dev',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

// database methods

async function getProductById(id) {
  try {
    const { rows: [ product ]  } = await client.query(`
      SELECT *
      FROM products
      WHERE id=$1;
    `, [id]);
    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows: [ products ]  } = await client.query(`
      SELECT *
      FROM products;
    `);
    return products;
  } catch (error) {
    throw error;
  }
}

async function createProduct({
  name,
  description,
  price,
  imgURL,
  inStock,
  category
}) {
  try {
    const { rows: [ product ] } = await client.query(`
      INSERT INTO products(name, description, price, "imgURL", "inStock", category) 
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `, [name, description, price, imgURL, inStock, category]);

    return product;
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
  client,
  getProductById,
  getAllProducts,
  createProduct
  // db methods
}