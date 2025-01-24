import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson);
};

const getAll = () => {
  return axios.get(baseUrl);
};

export default { getAll, create, remove, update };
