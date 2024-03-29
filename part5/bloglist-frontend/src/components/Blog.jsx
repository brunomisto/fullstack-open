import axios from 'axios';
import { React, useState } from 'react';

import Like from './Like';

function Blog({ blog, updateBlogs, user }) {
  const [isShowing, setIsShowing] = useState(false);
  const toggleIsShowing = () => {
    setIsShowing(!isShowing);
  };

  const blogStyle = {
    padding: 10,
    border: '1px solid black',
    marginBottom: 5,
  };

  const handleLike = async () => {
    await axios.put(`/api/blogs/${blog.id}`, {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    });

    updateBlogs();
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await axios.delete(`/api/blogs/${blog.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      updateBlogs();
    }
  };

  let content;
  if (isShowing) {
    content = (
      <div>
        <div>{blog.url}</div>
        <div>{`likes ${blog.likes}`}</div>
        <div>
          <Like onClick={handleLike} />
        </div>
        {blog.user ? blog.user.name : ''}
        {user.username === blog.user.username ? (
          <div>
            <button onClick={handleDelete}>delete</button>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  } else {
    content = <div />;
  }

  return (
    <div className="blog" style={blogStyle}>
      {`${blog.title} ${blog.author}`}
      <button onClick={toggleIsShowing}>{isShowing ? 'hide' : 'view'}</button>
      {content}
    </div>
  );
}

export default Blog;
