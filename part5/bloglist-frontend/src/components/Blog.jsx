import axios from "axios";
import { useState } from "react"

const Blog = ({ blog, updateBlogs }) => {
  const [isShowing, setIsShowing] = useState(false);
  const toggleIsShowing = () => {
    setIsShowing(!isShowing);
  }

  const blogStyle = {
    padding: 10,
    border: '1px solid black',
    marginBottom: 5,
  }

  const handleLike = async () => {
    await axios
      .put(`/api/blogs/${blog.id}`, {
        ...blog,
        user: blog.user.id,
        likes: blog.likes + 1,
      });
    
    await updateBlogs();
  };

  let content;
  if (isShowing) {
    content = (
      <div>
        {blog.url} <br/>
        likes {blog.likes} <button onClick={handleLike}>like</button> <br/>
        {blog.user ? blog.user.name : ""}
      </div>
    )
  } else {
    content = <div></div>;
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleIsShowing}>{isShowing ? "hide" : "view"}</button>
      {content}
    </div>  
  )
}


export default Blog