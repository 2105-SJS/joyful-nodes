const {client} = require("./client");
const {
  createProduct,
  createUser,
  createOrder
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
          price INT NOT NULL,
          "imgURL" VARCHAR(255) DEFAULT 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1610416577-vans-1610416571.jpg',
          "inStock" BOOLEAN DEFAULT false NOT NULL,
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
          "isAdmin" BOOLEAN DEFAULT FALSE
        );
  
        CREATE TABLE orders (
          id SERIAL PRIMARY KEY,
          status VARCHAR(255) DEFAULT 'created',
          "userId" INTEGER REFERENCES users(id),
          "datePlaced" DATE DEFAULT CURRENT_TIMESTAMP NOT NULL
        );
  
        CREATE TABLE order_products (
          id SERIAL PRIMARY KEY,
          "productId" INTEGER REFERENCES products(id),
          "orderId" INTEGER REFERENCES orders(id),
          price VARCHAR(255) NOT NULL,
          quantity INT NOT NULL DEFAULT 0,
          UNIQUE("productId", "orderId")
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
    console.log("Creating products...");
    const productsToCreate = [
      {name: "Nike OffWhite Air Jordan One", 
      description: "This shoe is red, white, and black with a deconstructed look.",
      price: 6000,
      imgURL: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1610416577-vans-1610416571.jpg',
      inStock: true,
      category: "Casual Sneaker"
    }
    ]
    const products = await Promise.all(productsToCreate.map(createProduct));
    console.log('Products created:');
    console.log(products);
    console.log('Finished creating products!');


    console.log("Creating users...");
    const usersToCreate = [
      { firstName: 'Mary', lastName: 'Jane', email: 'mary.jane@gmail.com', username: 'mj2003', password: 'gr33ni$g00d' },
      { firstName: 'Rocco', lastName: 'Stalwart', email: 'deergod@myspace.com', username: 'antlers54', password: 'password124' }
    ]
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');


    console.log("Creating orders...");
    const ordersToCreate = [
      { status: 'created', userId: 2 },
      { status: 'in progress', userId: 1 },
      { status: 'shipped', userId: 1 }
    ]
    const orders = await Promise.all(ordersToCreate.map(createOrder));
    console.log('Orders created:');
    console.log(orders);
    console.log('Finished creating orders!');

  } catch (error) {
    throw error;
  }
}

module.exports = {
  rebuildDB,
  populateInitialData
}