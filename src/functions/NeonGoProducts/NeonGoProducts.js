import axios from "axios";

export const createNeonProds = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/neongoproducts`,
    values
  );
};

export const removeNeonProds = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/neongoproducts/${_id}`
  );
};

export const listNeonProds = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/neongoproducts`
  );
};

export const updateNeonProds = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/neongoproducts/${_id}`,
    values
  );
};

export const getNeonProds = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/neongoproducts/${_id}`
  );
};
