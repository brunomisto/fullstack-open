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

const initialAnecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

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
  initialState: initialAnecdotes.map(asObject),
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
  },
});

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const { changeFilter } = filterSlice.actions;

export const anecdotesReducer = anecdotesSlice.reducer;
export const { addVote, createAnecdote } = anecdotesSlice.actions;

export const notificationReducer = notificationSlice.reducer;
export const { setNotification } = notificationSlice.actions;
