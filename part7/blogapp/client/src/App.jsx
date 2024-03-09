import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Blog from "./components/Blog";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import { setNotification } from "./reducers/notificationReducer";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const updateBlogs = async () => {
    const newBlogs = await blogService.getAll();
    setBlogs(newBlogs);
  };

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
    updateBlogs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const createBlog = async (blog) => {
    try {
      const createdBlog = await blogService.create(blog, user.token);
      setBlogs(blogs.concat(createdBlog));
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
          <Blog
            key={blog.id}
            blog={blog}
            updateBlogs={updateBlogs}
            user={user}
          />
        ))}
    </div>
  );
}

export default App;
