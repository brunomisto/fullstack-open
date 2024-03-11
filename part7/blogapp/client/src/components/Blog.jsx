import { v4 as uuidv4 } from "uuid";
import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { likeBlog, deleteBlog, initBlogs } from "../reducers/blogsReducer";
import Like from "./Like";

function Blog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector(({ user }) => user);
  const blogs = useSelector(({ blogs }) => blogs);
  const blog = blogs.find((b) => b.id === id);

  if (blogs.length === 0) {
    dispatch(initBlogs());
  }

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog, user.token));
      navigate("/");
    }
  };

  if (!blog) {
    return <div>blog not found</div>;
  }

  return (
    <div>
      <h2>{`${blog.title} ${blog.author}`}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <Like onClick={handleLike} />
      </div>
      <div>added by {blog.user && blog.user.name}</div>
      {user.username === blog.user.username && (
        <div>
          <button onClick={handleDelete}>delete</button>
        </div>
      )}
      <h3>comments</h3>
      <ul>
        {blog.comments &&
          blog.comments.map((comment) => <li key={uuidv4()}>{comment}</li>)}
      </ul>
    </div>
  );
}

export default Blog;
