import axios from "axios";

export const createLogo = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/logo`,
    values
  );
};

export const removeLogo = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/logo/${_id}`
  );
};

export const listLogo = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/logo`
  );
};

export const updateLogo = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/logo/${_id}`,
    values
  );
};

export const getLogo = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/logo/${_id}`
  );
};
