import { useState } from "react";
import { useDispatch } from "react-redux";

import loginService from "../services/login";
import { setNotification } from "../reducers/notificationReducer";

function Login({ setUser }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const user = await loginService.login(username, password);
      setUser(user);
      localStorage.setItem("loggedUser", JSON.stringify(user));
      dispatch(setNotification(`${user.name} logged in`, "info", 5));
    } catch (error) {
      setUsername("");
      setPassword("");
      dispatch(setNotification(error.response.data.error, "error", 5));
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        <label>
          username
          <input
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
          />
        </label>
      </div>
      <button id="login" type="submit">
        Login
      </button>
    </form>
  );
}

export default Login;
