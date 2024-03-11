import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import NewBlog from "./NewBlog";
import Togglable from "./Togglable";
import blogService from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  const blogs = useSelector(({ blogs }) => blogs);

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

  return (
    <div>
      <Togglable label="new blog">
        <NewBlog createBlog={createBlog} />
      </Togglable>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div className="text-lg" key={blog.id}>
            <Link
              className="px-4 border border-black rounded-md"
              to={`/blogs/${blog.id}`}
            >
              {blog.title}
            </Link>
          </div>
        ))}
    </div>
  );
}

export default Home;
