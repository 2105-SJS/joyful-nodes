import React from "react";
import { callApi } from '../util';
import { useHistory } from "react-router-dom";



const Register = (props) => {
    const username = props.username;
    const setUsername = props.setUsername;
    const password = props.password;
    const setPassword = props.setPassword;
    const firstName = props.firstName;
    const setFirstName = props.setFirstName;
    const lastName = props.lastName;
    const setLastName = props.setLastName;
    const email = props.email;
    const setEmail = props.setEmail;
    let history = useHistory();

    return <>
        <form onSubmit={ async (event) => {
            await event.preventDefault();
            try {
                const response = await callApi({
                  url: "/users/register",
                  method: 'POST',
                    body: { firstName, 
                            lastName, 
                            email, 
                            username, 
                            password }
                });
                history.push("/users/login");
                setUsername('');
                setPassword('');
                setLastName('');
                setFirstName('');
                setEmail('');
              }
              catch (error) {
                console.log(error);
              }
            }}>
            <p>First Name</p>
            <input type ="text" placeholder="First Name" value={firstName} onChange={(event) => setFirstName(event.target.value)}></input>
            <p>Last Name</p>
            <input type ="text" placeholder="Last Name" value={lastName} onChange={(event) => setLastName(event.target.value)}></input>
            <p>Email</p>
            <input type ="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}></input>
            <p>Username</p>
            <input type ="text" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)}></input>
              <p>Password</p>
            <input type ="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
          <p>By submitting this form I agree to the terms and conditions.</p>
          <button type="submit">REGISTER</button>
          </form>
    </>
}

export default Register;