import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    changeFilter(state, action) {
      return action.payload;
    },
  },
});

const anecdotesSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload;
      const anecdote = state.find((anecdote) => anecdote.id === id);
      anecdote.votes += 1;
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return null;
    },
  },
});

export const { changeFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;

export const { addVote, createAnecdote, setAnecdotes } = anecdotesSlice.actions;
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};
export const anecdotesReducer = anecdotesSlice.reducer;

export const { setNotification, removeNotification } =
  notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
