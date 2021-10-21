const {
  client,
  createProduct
} = require('./index');

const dropTables = async () => {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
        DROP TABLE IF EXISTS order_products;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS products;
      `)

    console.log("Finished dropping tables...")
  }
  catch (error) {
    console.log("Error dropping tables!");
    throw error;
  }
}

const createTables = async () => {
  try {
    console.log("Starting to create tables...");

    await client.query(`
        CREATE TABLE products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description VARCHAR(255) NOT NULL,
          price VARCHAR(255) NOT NULL,
          "imgURL" VARCHAR(255) DEFAULT 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1610416577-vans-1610416571.jpg',
          "inStock" BOOLEAN DEFAULT true NOT NULL,
          category VARCHAR(255) NOT NULL
        );
  
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          "firstName" VARCHAR(255) NOT NULL,
          "lastName" VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          "imageURL" VARCHAR(255) DEFAULT 'https://louisville.edu/enrollmentmanagement/images/person-icon/image',
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) UNIQUE NOT NULL,
          "isAdmin" DEFAULT true NOT NULL
        );
  
        CREATE TABLE orders (
          id SERIAL PRIMARY KEY,
          status DEFAULT 'created',
          "userId" INTEGER REFERENCES users(id),
          "datePlaced" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );
  
        CREATE TABLE order_products (
          id SERIAL PRIMARY KEY,
          "productId" INTEGER REFERENCES products(id),
          "orderId" INTEGER REFERENCES orders(id),
          price VARCHAR(255) NOT NULL,
          quantity DEFAULT '0' NOT NULL,
          UNIQUE("productId", "tagId")
        );
      `)
  }
  catch (error) {
    console.log("Error in creating tables...");
    throw error;
  }
}

const rebuildDB = async () => {
  try {
    await dropTables();
    await createTables();
  }
  catch (error) {
    throw error
  }
}

const populateInitialData = async () => {
  try {
    // create useful starting data
    console.log("Creating data...");
    const productsToCreate = [
      {name: "Nike OffWhite Air Jordan One", 
      description: "This shoe is red, white, and black with a deconstructed look.",
      price: "$6000",
      imgURL,
      inStock,
      category: "Casual Sneaker"
    }
    ]
    const products = await Promise.all(productsToCreate.map(createProduct));
    console.log('Products created:');
    console.log(products);
    console.log('Finished creating products!');
  } catch (error) {
    throw error;
  }
}

module.exports = {
  rebuildDB,
  populateInitialData
}