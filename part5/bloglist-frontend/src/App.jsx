import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'

import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
    blogService.getAll().then((blogs) =>
      setBlogs(blogs)
    )
  }, [])

  const logInfo = (message) => {
    setNotification({
      message,
      type: "info"
    });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }

  const logError = (message) => {
    setNotification({
      message,
      type: "error"
    });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    setUser(null);
  }
  
  const createBlog = async (blog) => {
    try {
      const createdBlog = await blogService.create(blog, user.token);
      setBlogs(blogs.concat(createdBlog));
      logInfo(`a new blog ${createdBlog.title} by ${createdBlog.author} added`);
    } catch (error) {
      logError(error.response.data.error);
    }
  }

  if (user === null) {
    return (
      <div>
        <Login setUser={setUser} />
      </div>
    )
  }
  
  return (
    <div>
      <Notification notification={notification} />
      <h2>blogs</h2>
      <p>{user.name} logged in</p> <button onClick={handleLogout}>logout</button>
      <Togglable label={"new blog"}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App