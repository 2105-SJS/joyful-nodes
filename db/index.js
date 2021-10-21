// require and re-export all the files in the adapterMethods folder

module.exports = {
  ...require("./adpaterMethods/products"),
  ...require("./adpaterMethods/users"),
  ...require("./adpaterMethods/order_products"),
  ...require("./adpaterMethods/orders")
}