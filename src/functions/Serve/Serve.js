import axios from "axios";

export const createServeFiles = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/ServeFiles`,
    values
  );
};

export const removeServeFiles = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/ServeFiles/${_id}`
  );
};

export const listServeFiles = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/ServeFiles`
  );
};

export const updateServeFiles = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/ServeFiles/${_id}`,
    values
  );
};

export const getServeFiles = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/ServeFiles/${_id}`
  );
};
