import React from "react";
import { callApi } from '../util';


const Login = (props) => {
    const username = props.username;
    const setUsername = props.setUsername;
    const password = props.password;
    const setPassword = props.setPassword;
    const token = props.token;
    const setToken = props.setToken;
    
    return <>
        <form onSubmit={ async (event) => {
            await event.preventDefault();
            //await existing();
            try {
                const response = await callApi({
                  url: "/users/login",
                  method: 'POST',
                  body: {
                      user: {
                          username,
                          password
                      }
                  }
                });
                console.log(response)
                setUsername('');
                setPassword('');
              }
              catch (error) {
                console.log(error);
              }
            }}>
            <p>Username</p>
            <input type ="text" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)}></input>
              <p>Password</p>
            <input type ="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
          <p>By submitting this form  agree to the terms and conditions.</p>
          <button type="submit">LOGIN</button>
          </form>
    </>
}

export default Login;