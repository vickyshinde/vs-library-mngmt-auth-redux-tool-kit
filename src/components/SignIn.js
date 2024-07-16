import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../rtk/authSlice';
import Cookies from 'js-cookie';

const SignIn = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length >= 5 && password.length >= 8 && /[a-zA-Z]/.test(password) && /[^a-zA-Z0-9]/.test(password)) {
      const user = { username };
      dispatch(signIn(user));
      Cookies.set('auth', JSON.stringify({ isAuthenticated: true, user }), { expires: 7 });
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
      </div>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
