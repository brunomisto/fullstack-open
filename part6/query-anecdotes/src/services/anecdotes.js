import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const create = (anecdote) =>
  axios.post(baseUrl, anecdote).then((response) => response.data);

const update = (anecdote) =>
  axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then((response) => {
    console.log("send data", anecdote);
    console.log("changed data", response.data);
    return response.data;
  });

export default { getAll, create, update };
