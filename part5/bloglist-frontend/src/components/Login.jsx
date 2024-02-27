import { useState } from "react";
import loginService from "../services/login"

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const user = await loginService.login(username, password);
      setUser(user);
      localStorage.setItem("loggedUser", JSON.stringify(user));
    } catch {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        <label>
          username
          <input value={username} onChange={({target}) => setUsername(target.value)}/>
        </label>
      </div>
      <div>
        <label>
          password
          <input value={password} onChange={({target}) => setPassword(target.value)} type="password"/>
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default Login;