import axios from "axios";

const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (blog, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const update = async (blog, newBlog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, newBlog);
  return response.data;
};

const deleteOne = async (blog, token) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default { getAll, create, update, deleteOne };
