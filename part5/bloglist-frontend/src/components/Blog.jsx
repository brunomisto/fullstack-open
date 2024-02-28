import { useState } from "react"

const Blog = ({ blog }) => {
  const [isShowing, setIsShowing] = useState(false);
  const toggleIsShowing = () => {
    setIsShowing(!isShowing);
  }

  const blogStyle = {
    padding: 10,
    border: '1px solid black',
    marginBottom: 5,
  }

  let content;
  if (isShowing) {
    content = (
      <div>
        {blog.url} <br/>
        likes {blog.likes} <button>like</button> <br/>
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