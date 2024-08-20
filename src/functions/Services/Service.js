import axios from "axios";

export const createImages = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/serviceimage`,
    values
  );
};

export const removeImages = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/serviceimage/${_id}`
  );
};

export const listImages = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/serviceimage`
  );
};

export const updateImages = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/serviceimage/${_id}`,
    values
  );
};

export const getImages = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/serviceimage/${_id}`
  );
};
