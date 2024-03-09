import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import { setNotification } from "./reducers/notificationReducer";
import { initBlogs } from "./reducers/blogsReducer";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => blogs);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
    dispatch(initBlogs());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const createBlog = async (blog) => {
    try {
      const createdBlog = await blogService.create(blog, user.token);
      dispatch({
        type: "blogs/append",
        payload: createdBlog,
      });
      dispatch(
        setNotification(
          `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
          "info",
          5,
        ),
      );
    } catch (error) {
      dispatch(setNotification(error.response.data.error, "error", 5));
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification />
        <Login setUser={setUser} />
      </div>
    );
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <p>{`${user.name} logged in`}</p>
      <button onClick={handleLogout}>logout</button>
      <Togglable label="new blog">
        <NewBlog createBlog={createBlog} />
      </Togglable>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </div>
  );
}

export default App;
