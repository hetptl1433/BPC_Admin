import axios from "axios";

export const createPopUpFile = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/PopUpFile`,
    values
  );
};

export const removePopUpFile = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/PopUpFile/${_id}`
  );
};

export const listPopUpFile = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/PopUpFile`
  );
};

export const updatePopUpFile = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/PopUpFile/${_id}`,
    values
  );
};

export const getPopUpFile = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/PopUpFile/${_id}`
  );
};
