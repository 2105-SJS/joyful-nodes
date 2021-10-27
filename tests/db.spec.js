const { client } = require('../db/client');
const { rebuildDB, populateInitialData } = require('../db/seed_data');
const {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getAllUsers,
  addProductToOrder,
  destroyOrderProduct,
  getOrderProductById,
  getOrderProductsByOrder,
  updateOrderProduct,
  getProductById,
  createOrder,
  getAllOrders,
  getCartByUser,
  getOrderById,
  getOrdersByProduct,
  getOrdersByUser

} = require('../db/index');

describe('Database', () => {
  beforeAll(async () => {
    await client.connect();
    await rebuildDB();
    await populateInitialData();
  })
  afterAll(async () => {
    await client.end();
  })
  //---USERS TESTS---//
  describe('Users', () => {
    let userToCreateAndUpdate, queriedUser;
    let userCredentials = { firstName: 'billy', lastName: 'bob', email: 'billybob@gmail.com', username: 'billybob', password: 'bobbybadboy' };
    describe('createUser({ firstName, lastName, email, username, password })', () => {
      beforeAll(async () => {
        userToCreateAndUpdate = await createUser(userCredentials);
        const { rows } = await client.query(`SELECT * FROM users WHERE username = $1`, [userCredentials.username]);
        queriedUser = rows[0];
      })
      it('Creates the user', async () => {
        expect(userToCreateAndUpdate.username).toBe(userCredentials.username);
        expect(queriedUser.username).toBe(userCredentials.username);
      });
      it('Does not store plaintext password in the database', async () => {
        expect(queriedUser.password).not.toBe(userCredentials.password);
      });
    })
    describe('getUser({ username, password })', () => {
      let verifiedUser;
      beforeAll(async () => {
        verifiedUser = await getUser(userCredentials);
      })
      it('Verifies the passed-in, plain-text password against the password in the database (the hashed password)', async () => {
        const unVerifiedUser = await getUser({ username: userCredentials.username, password: 'badPassword' });
        expect(verifiedUser).toBeTruthy();
        expect(verifiedUser.username).toBe(userCredentials.username);
        expect(unVerifiedUser).toBeFalsy();
      })
    })
    describe('getAllUsers()', () => {
      let Users;
      beforeAll(async () => {
        Users = await getAllUsers();
      })
      it('Does not return the passwords', async () => {
        Users.map((user) => {
          expect(user.password).toBeFalsy();
          expect(typeof user).toBe("object");
        })
      })
      it('Returns all user objects', async () => {
        Users.map((user) => {
          expect(typeof user).toBe("object");
        })
      })
    })
    describe('getUserById(id)', () => {
      it('Gets a user based on the user Id', async () => {
        const user = await getUserById(userToCreateAndUpdate.id);
        expect(user).toBeTruthy();
        expect(user.id).toBe(userToCreateAndUpdate.id);
      })
      it('Does not return the password', async () => {
        const user = await getUserById(userToCreateAndUpdate.id);
        expect(user).toBeTruthy();
        expect(user.password).toBeFalsy();
      })
    })
    describe('getUserByUsername(username)', () => {
      it('Gets a user based on the user Id', async () => {
        const user = await getUserByUsername(userToCreateAndUpdate.username);
        expect(user).toBeTruthy();
        expect(user.username).toBe(userToCreateAndUpdate.username);
      })
    })
  })
  //---ORDERS TESTS---//
  describe('Orders', () => {
    let orderToCreateAndUpdate;
    describe('getProductById', () => {
      it('gets products by their id', async () => {
        const product = await getProductById(1);
        expect(product).toBeTruthy();
      })
    })
    describe('getAllOrders', () => {
      let order;
      beforeAll(async () => {
        [order] = await getAllOrders();
      })
      it('selects and returns an array of all orders, includes their products', async () => {
        expect(order).toEqual(expect.objectContaining({
          id: expect.any(Number),
          status: expect.any(String),
          userId: expect.any(Number),
          datePlaced: expect.any(Date),
          products: expect.any(Array),
        }));
      })
      it('includes price and quantity on products, from order_products join', async () => {
        const { products: [firstProduct] } = order;
        expect(firstProduct).toEqual(expect.objectContaining({
          price: expect.any(String),
          quantity: expect.any(Number),
        }));
      })
    })
    describe('getOrdersByUser', () => {
      let order, user;
      beforeAll(async () => {
        user = await getUserById(1);
        const { id } = user;
        [order] = await getOrdersByUser({ id });
      })
      it('selects and return an array of all orders made by user, includes their products', async () => {
        expect(order).toEqual(expect.objectContaining({
          id: expect.any(Number),
          status: expect.any(String),
          userId: expect.any(Number),
          datePlaced: expect.any(Date),
          products: expect.any(Array),
        }));
        expect(order.userId).toBe(user.id);
      })
      it('includes price and quantity on products, from order_products join', async () => {
        const { products: [firstProduct] } = order;
        expect(firstProduct).toEqual(expect.objectContaining({
          price: expect.any(String),
          quantity: expect.any(Number),
        }));
      })
    })
    describe('getOrdersByProduct', () => {
      let order, product;
      beforeAll(async () => {
        product = await getProductById(1);
        [order] = await getOrdersByProduct({ id: product.id });
      })
      it('selects and return an array of all orders including this product, includes their products', async () => {
        expect(order).toEqual(expect.objectContaining({
          id: expect.any(Number),
          status: expect.any(String),
          userId: expect.any(Number),
          datePlaced: expect.any(Date),
          products: expect.any(Array),
        }));
      })
      it('includes price and quantity on products, from order_products join', async () => {
        const { products: [firstProduct] } = order;
        expect(firstProduct).toEqual(expect.objectContaining({
          price: expect.any(String),
          quantity: expect.any(Number),
        }));
      })
    })
  })
  //---ORDER PRODUCTS TESTS---//
  describe('Order Products', () => {
    const orderProductData = {
      productId: 1,
      orderId: 3,
      price: '85.00',
      quantity: 3 
    }
    let orderProductToCreateAndUpdate;
    describe('addProductToOrder({ productId, orderId, price, quantity })', () => {
      it('creates a new order_product, and return it', async () => {
        orderProductToCreateAndUpdate = await addProductToOrder(orderProductData);
        
        expect(orderProductToCreateAndUpdate.productId).toBe(orderProductData.productId);
        expect(orderProductToCreateAndUpdate.orderId).toBe(orderProductData.orderId);
        expect(orderProductToCreateAndUpdate.price).toBe(orderProductData.price);
        expect(orderProductToCreateAndUpdate.quantity).toBe(orderProductData.quantity);
      })
    })
    describe('updateOrderProduct({ id, count, duration })', () => {
      it('Finds the order with id equal to the passed in id. Updates the price or quantity as necessary.', async () => {
        const newOrderProductData = {id: orderProductToCreateAndUpdate.id, price: '150.00', quantity: 15};
        orderProductToCreateAndUpdate = await updateOrderProduct(newOrderProductData);
        expect(orderProductToCreateAndUpdate.id).toBe(newOrderProductData.id);
        expect(orderProductToCreateAndUpdate.price).toBe(newOrderProductData.price);
        expect(orderProductToCreateAndUpdate.quantity).toBe(newOrderProductData.quantity);
      })
    })
    describe('destroyOrderProduct(id)', () => {
      it('remove order_product from database', async () => {
        const deletedOrder = await destroyOrderProduct(orderProductToCreateAndUpdate.id);
        expect(deletedOrder.id).toBe(orderProductToCreateAndUpdate.id);
        const {rows} = await client.query(`
          SELECT * FROM order_products
          WHERE id = ${deletedOrder.id};
        `)
        expect(rows.length).toBe(0);
      })
    })

  })
})
