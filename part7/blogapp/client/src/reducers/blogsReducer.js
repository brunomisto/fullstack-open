import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

const slice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    set(state, action) {
      return action.payload;
    },
    append(state, action) {
      state.push(action.payload);
    },
  },
});

export const initBlogs = () => async (dispatch) => {
  const blogs = await blogsService.getAll();
  dispatch({
    type: "blogs/set",
    payload: blogs,
  });
};

export const likeBlog = (blog) => async (dispatch, getState) => {
  const { blogs } = getState();

  const newBlog = {
    ...blog,
    user: blog.user.id,
    likes: blog.likes + 1,
  };

  const updatedBlog = {
    ...(await blogsService.update(blog, newBlog)),
    user: blog.user,
  };

  dispatch({
    type: "blogs/set",
    payload: blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)),
  });
};

export const deleteBlog = (blog, token) => async (dispatch, getState) => {
  const { blogs } = getState();
  await blogsService.deleteOne(blog, token);
  dispatch({
    type: "blogs/set",
    payload: blogs.filter((b) => b.id !== blog.id),
  });
};

export const { set, append } = slice.actions;

export default slice.reducer;
