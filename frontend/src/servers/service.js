import axios from "axios";

const baseURL = "/api/services";

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const createService = async (newObject) => {
  const response = await axios.post(baseURL, newObject);
  return response.data;
};

const updateImportant = async (id, updateObject) => {
  const response = await axios.put(`${baseURL}/${id}`, updateObject);
  return response.data;
};
const deleteService = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`);
  return response.data;
};

export default { getAll, createService, updateImportant, deleteService };
