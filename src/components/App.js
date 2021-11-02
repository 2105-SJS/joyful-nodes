import React, { useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import { callApi } from '../util';
import {
  Home,
  Products,
  SingleOrder,
  Login,
  Register
} from './';

const App = () => {
  const [token, setToken] = useState('');
  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const allProducts = async () => {
    try {
      const response = await callApi({
        url: "/products"
      });
      console.log(response)
      if (response) {
        setProducts(response);
      }

    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    allProducts();
  }, []);

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path='/orders/:orderId'>
        <SingleOrder />
      </Route>
      <Route exact path="/products">
        <Products products={products} />
      </Route>
      <Route exact path="/users/login">
        <Login token={token} setToken={setToken} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
      </Route>
      <Route exact path="/users/register">
        <Register firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} email={email} setEmail={setEmail} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
      </Route>
    </Switch>
  );
}

export default App;