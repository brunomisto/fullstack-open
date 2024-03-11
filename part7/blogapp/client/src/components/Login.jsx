import { useState } from "react";
import { useDispatch } from "react-redux";

import { setNotification } from "../reducers/notificationReducer";
import loginService from "../services/login";

function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const user = await loginService.login(username, password);
      dispatch({ type: "user/set", payload: user });
      localStorage.setItem("loggedUser", JSON.stringify(user));
      dispatch(setNotification(`${user.name} logged in`, "info", 5));
    } catch (error) {
      setUsername("");
      setPassword("");
      dispatch(setNotification(error.response.data.error, "error", 5));
    }
  };

  return (
    <form className="flex flex-col items-center gap-2" onSubmit={handleLogin}>
      <h2 className="text-4xl">Login</h2>
      <div>
        <label className="flex gap-2">
          username
          <input
            className="border border-black rounded-md"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label className="flex gap-2">
          password
          <input
            className="border border-black rounded-md"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
          />
        </label>
      </div>
      <button
        className="border border-black px-2 py-1 rounded-lg hover:bg-green-300"
        id="login"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}

export default Login;
