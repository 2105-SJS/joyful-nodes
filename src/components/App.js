import React, { useEffect, useState } from 'react';
import { Route, Link, useHistory } from 'react-router-dom';
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
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState({});

  const getOrders = async () => {
    try {
      if (!userData.isAdmin) {
        return;
      } else {
        const response = await callApi({ url: 'orders' });
        if (response) {
          console.log(response)
          setOrders(response);
        };
        return
      };      
    } catch (error) {
      console.error(error);
    };
  };

  const allProducts = async () => {
    try {
      const response = await callApi({ url: 'products' });
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
    username,
    setUsername,
    userData,
    setUserData,

    allProducts,
    getOrders
  };

  useEffect(() => {
    allProducts();
    getOrders();
  }, [token]);

  useEffect(() => {
    const foundToken = localStorage.getItem('token');
    if (foundToken) {
        setToken(foundToken);
    };
    const foundUserData = localStorage.getItem('userData');
    if (foundUserData) {
      setUserData(foundUserData);
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
              localStorage.removeItem("userData");
              setToken('');
              setUserData({});
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