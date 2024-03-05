import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    changeFilter(state, action) {
      return action.payload;
    },
  },
});

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

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
      const content = action.payload;
      state.push(asObject(content));
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

export const filterReducer = filterSlice.reducer;
export const { changeFilter } = filterSlice.actions;

export const anecdotesReducer = anecdotesSlice.reducer;
export const { addVote, createAnecdote, setAnecdotes } = anecdotesSlice.actions;

export const notificationReducer = notificationSlice.reducer;
export const { setNotification, removeNotification } =
  notificationSlice.actions;
