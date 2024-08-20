import axios from "axios";

export const createMediaFiles = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/MediaFiles`,
    values
  );
};

export const removeMediaFiles = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/MediaFiles/${_id}`
  );
};

export const listMediaFiles = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/MediaFiles`
  );
};

export const updateMediaFiles = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/MediaFiles/${_id}`,
    values
  );
};

export const getMediaFiles = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/MediaFiles/${_id}`
  );
};
