const { client } = require("./client");
const {
  addProductToOrder,
  createProduct,
  createOrder,
  createAdminUser,
  createUser,
  createReview,
  updateOrder,
  cancelOrder
} = require('./index');

const dropTables = async () => {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
        DROP TABLE IF EXISTS reviews;
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
          name VARCHAR(255) UNIQUE NOT NULL,
          description VARCHAR(1000) NOT NULL,
          price DECIMAL(100, 2) NOT NULL,
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

        CREATE TABLE reviews (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          content VARCHAR(255) NOT NULL,
          stars INT NOT NULL,
          "userId" INTEGER REFERENCES users(id),
          "productId" INTEGER REFERENCES products(id)
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
        imgURL: 'https://m.media-amazon.com/images/I/61OYyfPxwkL._AC_UX395_.jpg',
        inStock: true,
        category: "Casual Sneaker"
      },
      {
        name: "Saucony Women's Cohesion 10 Running Shoe",
        description: `The Cohesion 10 is your everyday training partner. Encased with excellent cushioning, flexibility, and comfort for crushing any activity, including conquering the longer roads ahead.Forefoot Stack Height: 17mm

        Saucony is among the most respected names in running shoes. We offer a wide range of running and walking shoes, each with the Saucony trademark fit, feel and performance. We've spent years studying the biomechanics of top athletes. Our goal? To develop creatively engineered systems that maximize your performance in your specific activity, allowing you to focus on the activity instead of the equipment. From our studies have come many innovative Saucony concepts. Advanced technologies-like Grid, the first sole-based stability and cushioning system--provide an advantage to athletes of all types.`,
        price: 39.95,
        imgURL: 'https://cdn-images.farfetch-contents.com/16/40/35/69/16403569_31752432_600.jpg',
        inStock: true,
        category: "Running shoe"
      },
      {
        name: "Crocs Women's Sloane Flat | Women's Flats | Work Shoes for Women",
        description: "If you like a modern take on a classic silhouette, look no further. Featuring a feminine squared toe, the versatile Crocs Sloane Flat was designed for a clean look that maximizes comfort and embraces simplicity. Sometimes spoiling yourself is just that simple!",
        price: 82.78,
        imgURL: 'https://m.media-amazon.com/images/I/61r3L+d3ywL._AC_UX395_.jpg',
        inStock: true,
        category: "Work shoes"
      },
      {
        name: "adidas Men's Lite Racer BYD 2.0 Trail Running Shoe",
        description: "Running-inspired style built to get you through the day. These men's adidas sneakers have a soft textile upper and a TPU heel pull that makes them easy to get on and off. A Cloudfoam midsole cushions every single step.",
        price: 159.95,
        imgURL: 'https://m.media-amazon.com/images/I/71DhhD09BjS._AC_UX395_.jpg',
        inStock: true,
        category: "Running Shoe"
      },
      {
        name: "Avia Avi-Union II Non Slip Shoes for Women – Comfort Safety Shoes for Work, Nursing, Restaurants, & Walking – Black or White",
        description: "SLIP RESISTANT SHOES FOR WOMEN – Our thick rubber soles have an oil and slip resistant tread pattern for enhanced grip, specifically designed to prevent trapping of oil and liquid, and to be non-marking.  They help to secure sure footing in slippery environments like food service areas.",
        price: 77.12,
        imgURL: 'https://m.media-amazon.com/images/I/81a5g-UXlBL._AC_UX395_.jpg',
        inStock: true,
        category: "Comfort Safety Shoe"
      },
      {
        name: "Clarks Men's Bushacre 2 Chukka Boot",
        description: `Clarks has been in business for over 100 years making very fine men's dress shoes in a variety of styles. Featuring a wide range of top-quality components, Clarks gives you the options you desire in the quality you demand.`,
        price: 159.46,
        imgURL: 'https://m.media-amazon.com/images/I/71DB43ifgbL._AC_UX395_.jpg',
        inStock: true,
        category: "Boots"
      },
      {
        name: "Under Armour Men's Charged Assert 9 Running Shoe",
        description: "Lightweight mesh upper with 3-color digital print delivers complete breathability. Durable leather overlays for stability & that locks in your midfoot. EVA sockliner provides soft, step-in comfort. Charged Cushioning® midsole uses compression molded foam for ultimate responsiveness & durability. Solid rubber outsole covers high impact zones for greater durability with less weight.",
        price: 89.67,
        imgURL: 'https://m.media-amazon.com/images/I/71dzaYg56AS._AC_UX395_.jpg',
        inStock: true,
        category: "Running shoes"
      },
      {
        name: "Rockport Men's Eureka Walking Shoe",
        description: `DEVELOPED FOR COMFORT. DESIGNED FOR STYLE. POWERING YOUR EVERY DAY.

        Rockport has been powering your busy days since 1971 when we made dress shoes truly comfortable, by adding sport technology into the design – the very first company to do so. Today we continue to push boundaries to give you the best combination of comfort and style.
        
        We know life can keep you changing gears, even in the span of one day. With our shoes’ tech-based engineering, you’ll keep the pace – and then some. Because a life on the go doesn’t power itself.
        
        And with days moving quickly, you need shoes that can keep up with any weather. Explore all the waterproof shoes and boots Rockport has to offer.`,
        price: 111.27,
        imgURL: 'https://m.media-amazon.com/images/I/61rtuwpKtoL._AC_UX395_.jpg',
        inStock: true,
        category: "Walking shoes"
      },
      {
        name: "Skechers Men's Expected Avillo Moccasin",
        description: "Moc toe slip on.",
        price: 141.81,
        imgURL: 'https://m.media-amazon.com/images/I/81WN95znMwL._AC_UX395_.jpg',
        inStock: true,
        category: "Moccasin"
      },
      {
        name: "Steve Madden Men's Fenta Fashion Sneaker",
        description: `Low top fashion sneaker

        Steve Madden, the company, was founded by Steve Madden, the man, in 1990 in Brooklyn, where he started out making trend-advancing shoes one pair at a time. It was not long after that the Steve Madden focus on "now-ness" earned rave reviews from young female fans mad for the funky, chic, and yet competitively priced footwear it produced. The company popularized the "dressy sneaker," and continues to man the forefront of trends.`,
        price: 74.95,
        imgURL: 'https://m.media-amazon.com/images/I/813UuOjWfZL._AC_UX395_.jpg',
        inStock: true,
        category: "Casual Sneaker"
      },
      {
        name: "Clarks Men's Tilden Cap Oxford Shoe",
        description: `A classic captoe derby crafted from rich, full grain leather. The Tilden Cap by Clarks Collection features discreet elastic gore panels for an easier fit without distracting from its elevated profile. Inside, an impact-absorbing OrthoLite footbed reduces the shock of every step, while the flexible TPR outsole provides lightweight grip

        Clarks has been in business for over 100 years making very fine men's dress shoes in a variety of styles. Featuring a wide range of top-quality components, Clarks gives you the options you desire in the quality you demand. Trims- Buckle. Medium width`,
        price: 154.48,
        imgURL: 'https://m.media-amazon.com/images/I/81n+HernnfL._AC_UX395_.jpg',
        inStock: true,
        category: "Dress shoe"
      },
      {
        name: "Sperry Top-Sider Men's Billfish Ultralite Boat Shoe",
        description: "For over eighty years, Sperry has built a legacy of effortless, heritage products. Whether for men, women, kids, or babies, Sperry’s selection of hand-crafted footwear includes our iconic Sperry boat shoes, sandals, loafers, flats, slippers, espadrilles, boots, sneakers, and oxfords. Available in an inspired range of colors, styles, and materials, our timeless shoes transcend boundaries and span generations and genders with a shared commitment to quality, reliability and comfort. Ours are the original prep icons, as they have been since 1935.",
        price: 193.15,
        imgURL: 'https://m.media-amazon.com/images/I/81cxeNcBMWL._AC_UX395_.jpg',
        inStock: true,
        category: "Boat shoe"
      },
      {
        name: "New Balance Men's 481 V3 Trail Running Shoe",
        description: `We stand for something bigger than sneakers. We champion those who are fearlessly driven by their passions. We elevate sport. We do right by people and the planet. Together, we drive meaningful change in communities around the world. We Got Now.

        New Balance, is dedicated to helping athletes achieve their goals. It's been their mission for more than a century. It's why they don't spend money on celebrity endorsements. They spend it on research and development. It's why they don't design products to fit an image. They design them to fit. New Balance is driven to make the finest shoes for the same reason athletes lace them up: to achieve the very best.`,
        price: 169.66,
        imgURL: 'https://m.media-amazon.com/images/I/81UcrwrbvgL._AC_UX395_.jpg',
        inStock: true,
        category: "Running shoes"
      },
      {
        name: "adidas Women's Grand Court Sneaker",
        description: `A '70s style reborn. These women's shoes take inspiration from iconic sport styles of the past and move them into the future. The shoes are made of a durable leather-like upper with signature 3-Stripes along the sides. Plush midsole cushioning gives comfort to every step.`,
        price: 151,
        imgURL: 'https://m.media-amazon.com/images/I/71qdoDlEOpL._AC_UX395_.jpg',
        inStock: true,
        category: "Court Sneaker"
      }
    ]
    const products = await Promise.all(productsToCreate.map(createProduct));
    console.log('Products created:');
    console.log(products);
    console.log('Finished creating products!');

    console.log("Creating users...");
    const usersToCreate = [
      { firstName: 'Mary', lastName: 'Jane', email: 'mary.jane@gmail.com', username: 'mj2003', password: 'gr33ni$g00d', isAdmin: false },
      { firstName: 'Rocco', lastName: 'Stalwart', email: 'deergod@myspace.com', username: 'antlers54', password: 'password124', isAdmin: false }
    ]
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');

    console.log("Creating admin user...");
    const adminToCreate = { firstName: 'admin', lastName: 'admin', email: 'admin@awesomeshoestore.com', username: 'admin', password: 'password', isAdmin: true };
    const admin = await createAdminUser(adminToCreate);
    console.log('Admin created');
    console.log(admin);
    console.log('Finished creating Admin');

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

    console.log("Creating reviews...");
    const reviewsToCreate = [
      { 
        title: "Looks great!", 
        content: "Shoes fit true to size. Looks even better than the picture.",
        stars: 5,
        userId: 2,
        productId: 1
     },
     { 
      title: "Wow! Will purchase again", 
      content: "After not being able to find these anyhere, I found them here!. Thank You",
      stars: 2,
      userId: 1,
      productId: 2
   }
    ]
    const reviews = await Promise.all(reviewsToCreate.map(createReview));
    console.log('Reviews created:');
    console.log(reviews);
    console.log('Finished creating reviews!');
  } catch (error) {
    throw error;
  };
};

module.exports = {
  rebuildDB,
  populateInitialData
}