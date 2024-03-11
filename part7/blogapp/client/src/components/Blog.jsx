import { v4 as uuidv4 } from "uuid";
import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { likeBlog, deleteBlog, initBlogs } from "../reducers/blogsReducer";
import blogsService from "../services/blogs";
import Like from "./Like";

function Blog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector(({ user }) => user);
  const blogs = useSelector(({ blogs }) => blogs);
  const blog = blogs.find((b) => b.id === id);

  const [commentInput, setCommentInput] = useState("");
  const handleCommentInput = (event) => setCommentInput(event.target.value);

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

  const handleComment = async (event) => {
    event.preventDefault();
    const comment = await blogsService.createComment(blog, commentInput);
    dispatch({
      type: "blogs/set",
      payload: blogs.map((b) =>
        // wow
        b.id === id ? { ...b, comments: [...b.comments, comment] } : b,
      ),
    });
    setCommentInput("");
  };

  if (!blog) {
    return <div>blog not found</div>;
  }

  return (
    <div className="text-lg">
      <h2 className="text-2xl">{`${blog.title} ${blog.author}`}</h2>
      <div>
        <a className="text-sky-300 underline" href={blog.url}>
          {blog.url}
        </a>
      </div>
      <div>
        {blog.likes} likes <Like onClick={handleLike} />
      </div>
      <div>added by {blog.user && blog.user.name}</div>
      {user.username === blog.user.username && (
        <div>
          <button
            className="p-2 bg-red-400 rounded-lg border border-black"
            onClick={handleDelete}
          >
            delete
          </button>
        </div>
      )}
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input
          className="border border-black rounded-lg"
          type="text"
          value={commentInput}
          onChange={handleCommentInput}
        />
        <button
          className="ml-3 px-2 border border-black rounded-lg"
          type="submit"
        >
          add comment
        </button>
      </form>
      <ul className="list-disc">
        {blog.comments &&
          blog.comments.map((comment) => <li key={uuidv4()}>{comment}</li>)}
      </ul>
    </div>
  );
}

export default Blog;
