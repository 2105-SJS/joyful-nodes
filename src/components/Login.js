import React from "react";
import { callApi } from '../util';
import { useHistory } from "react-router-dom";



const Login = (props) => {
    const username = props.username;
    const setUsername = props.setUsername;
    const password = props.password;
    const setPassword = props.setPassword;
    const setToken = props.setToken;
    let history = useHistory();

    return <>
        <form onSubmit={ async (event) => {
            await event.preventDefault();
            try {
                const response = await callApi({
                  url: "/users/login",
                  method: 'POST',
                  body: {
                          username,
                          password
                  }
                });
                setToken(response.token);
                history.push("/");
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