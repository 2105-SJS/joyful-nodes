import React, { useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import { callApi } from '../util';
import {
  Home,
  Products,
  SingleOrder,
  Login
} from './';

const App = () => {
  // const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);

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
        <Login />
      </Route>
    </Switch>
  );
}

export default App;