import React, { useState } from 'react';
import { callApi } from '../util';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

const Register = ({
  email,
  setEmail,
  firstName,
  lastName,
  setLastName,
  setFirstName,
  password,
  setPassword,
  setToken,
  setUserData,
  username,
  setUsername
}) => {
  let history = useHistory();
  const [confirmPass, setConfirmPass] = useState('');

  return <>
    <h2>Register</h2>
    <form onSubmit={async (event) => {
      await event.preventDefault();
      try {
        const response = await callApi({
          url: "users/register",
          method: 'POST',
          body: {
            firstName,
            lastName,
            email,
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
          setFirstName('');
          setLastName('');
          setEmail('');
          history.push("/");
        };
      }
      catch (error) {
        console.error(error);
      }
    }}>
      
        <p>First Name</p>
        <input type="text" placeholder="First Name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
      
      
        <p>Last Name</p>
        <input type="text" placeholder="Last Name" value={lastName} onChange={(event) => setLastName(event.target.value)} />
      
      
        <p>Email</p>
        <input type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
      
      
        <p>Username</p>
        <input type="text" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
      
      
        <p>Password</p>
        <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
      
      
        <p>Confirm password</p>
        <input type='password' name='Confirm Password' placeholder='Confirm password' onChange={(event) => setConfirmPass(event.target.value)} />
      
      <p>By submitting this form I agree to the terms and conditions.</p>
      <button type="submit" disabled={!username || !password || password.length < 8 || password !== confirmPass || !firstName || !lastName || !email}>REGISTER</button>
    </form>
    <span>
      Already have an account? Click<Link to="/users/login" className='login-link'>here</Link> to sign in!
    </span>
  </>
}

export default Register;