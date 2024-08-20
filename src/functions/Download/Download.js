import axios from "axios";

export const createDownloadFiles = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/DownloadFiles`,
    values
  );
};

export const removeDownloadFiles = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/DownloadFiles/${_id}`
  );
};

export const listDownloadFiles = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/DownloadFiles`
  );
};

export const updateDownloadFiles = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/DownloadFiles/${_id}`,
    values
  );
};

export const getDownloadFiles = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/DownloadFiles/${_id}`
  );
};
