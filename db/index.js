// require and re-export all the files in the adapterMethods folder
const { client } = require('./client');

module.exports = {
  client,
  ...require("./adapterMethods/products"),
  ...require("./adapterMethods/users"),
  ...require("./adapterMethods/orders"),
  ...require("./adapterMethods/order_products")
}