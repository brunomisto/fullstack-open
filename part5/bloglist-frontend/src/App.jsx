import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
    blogService.getAll().then((blogs) =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    setUser(null);
  }

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p> <button onClick={handleLogout}>logout</button>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <div>
      <Login setUser={setUser} />
    </div>
  )
}

export default App