import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdote = async (content) => {
  const newAnecdote = {
    content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, newAnecdote);
  console.log(response);
  return response.data;
};

const addVote = async (id) => {
  let response;
  response = await axios.get(`${baseUrl}/${id}`);
  const foundAnecdote = response.data;

  response = await axios.put(`${baseUrl}/${id}`, {
    ...foundAnecdote,
    votes: foundAnecdote.votes + 1,
  });
  console.log(response);
  return response.data;
};

export default { getAll, createAnecdote, addVote };
