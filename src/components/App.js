import React, { useEffect, useState } from 'react';
import { Route, Link } from "react-router-dom";
import { callApi } from '../util';
import {
  Home,
  Products,
  SingleOrder,
  Login,
  Register,
  SingleProduct
} from './';

const App = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [orders, setOrders] = useState([]);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  const getOrders = async () => {
    try {
        const response = await callApi({ url: '/orders' });
        if (response) {
          setOrders(response);
        };
        return;
    } catch (error) {
        console.error(error);
    };
  };

  const allProducts = async () => {
    try {
      const response = await callApi({ url: "/products" });
      if (response) {
        setProducts(response);
      };
    } catch (error) {
      console.error(error);
    };
  };

  const props = {
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    orders,
    setOrders,
    password,
    setPassword,
    products,
    setProducts,
    token,
    setToken,
    username,
    setUsername,

    allProducts,
    getOrders
  };

  useEffect(() => {
    allProducts();
    getOrders();
  }, [token]);

  return <>
    <header>
      <div><h1>Awesome Shoe Store Name</h1></div>
      <div className='navigation'>
        <Link to='/products' className='nav-link'>Products</Link>
        <Link to='/cart' className='nav-link'>View Cart</Link>        
      </div>
    </header>
    <main>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path='/orders/:orderId'>
        <SingleOrder />
      </Route>
      <Route path="/products/:productId">
        <SingleProduct />
      </Route>
      <Route path="/products">
        <Products {...props} />
      </Route>
      <Route exact path="/users/login">
        <Login  {...props} />
      </Route>
      <Route exact path="/users/register">
        <Register {...props} />
      </Route>
    </main>
  </>
}

export default App;