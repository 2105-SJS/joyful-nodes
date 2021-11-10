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
    <h2 className='component-title'>Register</h2>
    <form className='user-form' onSubmit={async (event) => {
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
        <p><b>First Name</b></p>
        <input type="text" placeholder="First Name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
        <br />      
        <p><b>Last Name</b></p>
        <input type="text" placeholder="Last Name" value={lastName} onChange={(event) => setLastName(event.target.value)} />
        <br />
        <p><b>Email</b></p>
        <input type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <br />
        <p><b>Username</b></p>
        <input type="text" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
        <br />
        <p><b>Password</b></p>
        <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <br />
        <p><b>Confirm password</b></p>
        <input type='password' name='Confirm Password' placeholder='Confirm password' onChange={(event) => setConfirmPass(event.target.value)} />
      <br />
      <p><i>By submitting this form I agree to the terms and conditions.</i></p>
      <br />
      <button type="submit" disabled={!username || !password || password.length < 8 || password !== confirmPass || !firstName || !lastName || !email}>REGISTER</button>
      <br />
      <span>
        Already have an account? Click <Link to="/users/login" className='login-link'>here</Link> to sign in!
      </span>
    </form>
  </>
}

export default Register;