import React from "react";
import { callApi } from '../util';
import { Link, useHistory } from 'react-router-dom';

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
        <h2 className='component-title'>Sign in</h2>
        <form className='user-form' onSubmit={ async (event) => {
            event.preventDefault();
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
                  setUsername('');
                  setPassword('');
                  history.push("/");
                };
              } catch (error) {
                console.error(error);
              };
            }}>
            <p><b>Username</b></p>
            <input type ="text" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)}></input>
            <br />
            <p><b>Password</b></p>            
            <input type ="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
            <br />
            <p><i>By submitting this form  agree to the terms and conditions.</i></p>
            <br />
            <button type="submit">LOGIN</button>
            <br />
            <span>
              Don't have an account yet? Click <Link to="/users/register" className='login-link'>here</Link> to register!
            </span> 
          </form>
                             
    </>
};

export default Login;