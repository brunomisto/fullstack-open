import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload;
    },
    logout() {
      localStorage.removeItem("loggedUser");
      return null;
    },
  },
});

export const initUser = () => async (dispatch) => {
  const loggedUser = localStorage.getItem("loggedUser");
  if (loggedUser) {
    dispatch({
      type: "user/set",
      payload: JSON.parse(loggedUser),
    });
  }
};

export default slice.reducer;
