import axios from "axios";

export const createHomeAbout = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/home-about`,
    values
  );
};

export const removeHomeAbout = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/home-about/${_id}`
  );
};

export const listHomeAbout = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/home-about`
  );
};

export const updateHomeAbout = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/home-about/${_id}`,
    values
  );
};

export const getHomeAbout = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/home-about/${_id}`
  );
};
