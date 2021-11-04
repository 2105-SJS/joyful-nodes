import React, { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { callApi } from '../util';
import {
  Home,
  Login,
  Products,
  Register,
  SingleOrder,
  SingleProduct,
  UserOrders
} from './';

const App = () => {
  const history = useHistory();
  const [cart, setCart] = useState([]);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [orders, setOrders] = useState([]);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [username, setUsername] = useState('');

  const getCart = async () => {
    try {
      const response = await callApi ({
        url: '/cart'
      });
      if (!response) {
        const createCart = await callApi ({
          method: 'POST',
          url: '/orders'
        });
        if (createCart) {
          localStorage.setItem("cart", createCart);
          setCart(createCart);
        };
      } else if (response) {
        localStorage.setItem("cart", response);
        setCart(response);
      };
    } catch (error) {
      console.error(error);
    };
  };

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
      const response = await callApi({ url: '/products' });
      if (response) {
        setProducts(response);
      };
    } catch (error) {
      console.error(error);
    };
  };

  const props = {
    cart,
    setCart,
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
    user,
    setUser,
    username,
    setUsername,

    allProducts,
    getCart,
    getOrders
  };

  useEffect(() => {
    allProducts();
    getCart();
    console.log(cart)
    getOrders();
  }, [token, user]);

  useEffect(() => {
    const foundToken = localStorage.getItem("token");
    const foundUser = localStorage.getItem("user");
    if (foundToken) {
        setToken(foundToken);
    };
    if (foundUser) {
        setUser(foundUser);
    };
  },[]);

  return <>
    <header>
      <div><h1><Link to='/' className='site-title'>Awesome Shoe Store Name</Link></h1></div>
      <div className='navigation'>
        <Link to='/products' className='nav-link'>Products</Link>        
        <Link to='/cart' className='nav-link'>View Cart</Link>                
        {
        token
          ? <button className='nav-link' onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              setToken('');
              setUser({});
            history.push('/');            
            }}>Log out</button>
          : <Link to='/users/login' className='nav-link'>Sign in</Link>
        }
      </div>
    </header>
    <main>
      <Route exact path="/">
        <Home {...props} />
      </Route>
      <Route exact path='/orders/:orderId'>
        <SingleOrder />
      </Route>
      <Route path="/products/:productId">
        <SingleProduct />
      </Route>
      <Route exact path="/products">
        <Products {...props} />
      </Route>
      <Route exact path="/users/login">
        <Login  {...props} />
      </Route>
      <Route exact path='/users/:userId/orders'>
        <UserOrders {...props} />
      </Route>
      <Route exact path="/users/register">
        <Register {...props} />
      </Route>
    </main>
  </>
}

export default App;