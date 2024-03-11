import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./components/Home";
import Login from "./components/Login";
import Users from "./components/Users";
import User from "./components/User";
import "./App.css";
import { initUser } from "./reducers/userReducer";
import { initBlogs } from "./reducers/blogsReducer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUser());
    dispatch(initBlogs());
  }, []);

  const loggedUsser = useSelector(({ user }) => user);

  const handleLogout = () => {
    dispatch({ type: "user/logout" });
  };

  if (!loggedUsser) {
    return (
      <div>
        <Login />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <h2>blogs</h2>
      <p>{`${loggedUsser.name} logged in`}</p>
      <button onClick={handleLogout}>logout</button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
