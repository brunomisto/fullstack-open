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
  dispatch(set(blogs));
};

export const { set, append } = slice.actions;

export default slice.reducer;
