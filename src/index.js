import React from 'react';
import ReactDOM from 'react-dom';
import { UserProvider } from './context/UserContext';
import { BrowserRouter as Router } from "react-router-dom";

import {
  App
} from './App';

ReactDOM.render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>,
  document.getElementById('root')
);