import React from "react";
import { callApi } from '../util';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

const Login = ({
  username, 
  setUsername, 
  password,
  setPassword, 
  setToken,
  setUserData
}) => {
    const history = useHistory();

    return <>
        <h2>Sign in</h2>
        <form onSubmit={ async (event) => {
            await event.preventDefault();
            try {
                const response = await callApi({
                  url: 'users/login',
                  method: 'POST',
                  body: {
                          username,
                          password
                  }
                });
                if (response) {
                  const { token, user } = response;
                  setUserData(user);
                  setToken(token);
                  localStorage.setItem("token", token);
                  localStorage.setItem('userData', JSON.stringify(user));
                  setUsername('');
                  setPassword('');
                  history.push("/");
                };
              } catch (error) {
                console.error(error);
              };
            }}>
            <p>Username</p>
            <input type ="text" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)}></input>
              <p>Password</p>
            <input type ="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
          <p>By submitting this form  agree to the terms and conditions.</p>
          <button type="submit">LOGIN</button>
          </form>
          <span>
            Don't have an account yet? Click<Link to="/users/register" className='login-link'>here</Link> to register!
          </span>                    
    </>
};

export default Login;