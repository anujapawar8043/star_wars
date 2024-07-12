
import React, { useState } from 'react';
import jsCookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  //:: Login handler with duplicate values
  const handleLogin = () => {
    if (username === 'user' && password === 'password') {
              jsCookie.set('star-wars-token', 'jwt-token-12345', { expires: 1, });
             navigate('/characters');
        } else {
              setError('Invalid credentials');
        }
  };

  return (
    <div className="auth">
        <div>
          <h4>Login</h4>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br/>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br/>
          <button onClick={handleLogin}>Login</button>

          {error && <div className="error">{error}</div>}
        </div>
    </div>
  );
};

export default Login;
