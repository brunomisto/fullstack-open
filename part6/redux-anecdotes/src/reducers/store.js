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
    updateAnecdote(state, action) {
      const { id } = action.payload;
      return state.map((anecdote) =>
        anecdote.id === id ? action.payload : anecdote
      );
    },
    appendAnecdote(state, action) {
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
    setMessage(state, action) {
      return action.payload;
    },
    clearMessage() {
      return null;
    },
  },
});

export const { changeFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;

export const { updateAnecdote, appendAnecdote, setAnecdotes } =
  anecdotesSlice.actions;

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdotesService.getAll();
  dispatch(setAnecdotes(anecdotes));
};

export const createAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdotesService.createAnecdote(content);
  dispatch(appendAnecdote(newAnecdote));
};

export const addVote = (id) => async (dispatch) => {
  const newAnecdote = await anecdotesService.addVote(id);
  dispatch(updateAnecdote(newAnecdote));
};

export const anecdotesReducer = anecdotesSlice.reducer;

export const { setMessage, clearMessage } = notificationSlice.actions;
export const setNotification = (message, time) => (dispatch) => {
  dispatch(setMessage(message));
  setTimeout(() => {
    clearMessage();
  }, time);
};

export const notificationReducer = notificationSlice.reducer;
