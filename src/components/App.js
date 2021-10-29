import React from 'react';
import { Route, Switch } from "react-router-dom";
import {
  Home,
  Products,
  SingleOrder
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
    </Switch>
  );
}

export default App;