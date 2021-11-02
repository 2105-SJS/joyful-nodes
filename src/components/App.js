import React from 'react';
import { Route, Switch } from "react-router-dom";
import {
  Home,
  Products,
  SingleOrder,
  Login
} from './';

const App = () => {

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path = '/orders/:orderId'>
        <SingleOrder />
      </Route>
      <Route path="/products">
        <Products />
      </Route>
      <Route exact path="/users/login">
        <Login />
      </Route>
    </Switch>
  );
}

export default App;