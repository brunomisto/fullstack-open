import axios from "axios";

const baseUrl = "https://phonebook-backend-60rk.onrender.com/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (person) => {
  return axios.post(baseUrl, person).then((response) => response.data);
};

const update = (id, person) => {
  return axios
    .put(`${baseUrl}/${id}`, person)
    .then((response) => response.data);
};

const deleteAsset = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

export default { getAll, create, update, deleteAsset };
