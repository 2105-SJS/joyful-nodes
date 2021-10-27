const { client } = require("./client");
const {
  addProductToOrder,
  createProduct,
  createOrder,
  createUser, updateOrder, cancelOrder
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
          price DECIMAL(100, 2) NOT NULL,
          quantity INT NOT NULL DEFAULT 0,
          UNIQuE ("productId", "orderId")
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
      {
        name: "Nike OffWhite Air Jordan One", 
        description: "This shoe is red, white, and black with a deconstructed look.",
        price: 6000,
        imgURL: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1610416577-vans-1610416571.jpg',
        inStock: true,
        category: "Casual Sneaker"
      },
      {
        name: "Adidas Yeezy Foam RNNR",
        description: "The adidas Yeezy Foam RNNR Ochre features a golden Ochre one-piece EVA foam construction. Oval cut-outs throughout the design provide ventilation, while a cushioned footbed offers support.",
        price: 342,
        imgURL: 'https://cdn.flightclub.com/TEMPLATE/267256/1.jpg',
        inStock: true,
        category: "Casual Sneaker"
      },
      {
        name: "Nike Dunk Low",
        description: "The upper Nike Dunk Low Retro White Black is constructed of white leather with black leather overlays and Swooshes.",
        price: 260,
        imgURL: 'https://cdn-images.farfetch-contents.com/16/40/35/69/16403569_31752432_600.jpg',
        inStock: true,
        category: "Casual Sneaker"
      },
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
      { userId: 2 },
      { userId: 1 },
      { userId: 1 }
    ]
    const orders = await Promise.all(ordersToCreate.map(createOrder));
    console.log('Orders created:');
    console.log(orders);
    console.log('Finished creating orders!');

    console.log("Adding products to orders...");
    const productsToAdd = [
      { orderId: 1, productId: 1, price: 60, quantity: 1 },      
      { orderId: 1, productId: 1, price: 60, quantity: 2 },
      { orderId: 2, productId: 1, price: 55, quantity: 2 },      
      { orderId: 1, productId: 2, price: 55, quantity: 1 },
      { orderId: 3, productId: 3, price: 65, quantity: 1 },      
      { orderId: 2, productId: 3, price: 65, quantity: 1 },      
      { orderId: 1, productId: 1, price: 70, quantity: 2 }
    ]
    const orderProducts = await Promise.all(productsToAdd.map(addProductToOrder));
    console.log('Added products:');
    console.log(orderProducts);
    console.log('Finished adding products to orders!');
  } catch (error) {
    throw error;
  };
};

module.exports = {
  rebuildDB,
  populateInitialData
}