import { useState } from 'react';
import loginService from '../services/login';

function Login({ setUser, logInfo, logError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const user = await loginService.login(username, password);
      setUser(user);
      localStorage.setItem('loggedUser', JSON.stringify(user));
      logInfo(`${user.name} logged in`);
    } catch (error) {
      setUsername('');
      setPassword('');
      logError(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        <label>
          username
          <input id='username' value={username} onChange={({ target }) => setUsername(target.value)} />
        </label>
      </div>
      <div>
        <label>
          password
          <input id='password' value={password} onChange={({ target }) => setPassword(target.value)} type="password" />
        </label>
      </div>
      <button id='login' type="submit">Login</button>
    </form>
  );
}

export default Login;
