import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./components/Home";
import Login from "./components/Login";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";
import Logout from "./components/Logout";
import "./App.css";
import { initUser } from "./reducers/userReducer";
import { initBlogs } from "./reducers/blogsReducer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUser());
    dispatch(initBlogs());
  }, []);

  const loggedUser = useSelector(({ user }) => user);

  if (!loggedUser) {
    return (
      <div>
        <Login />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <h2>blogs</h2>
      <p>{`${loggedUser.name} logged in`}</p>
      <Logout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
