import axios from "axios";

export const createBannerImages = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/banner-images1`,
    values
  );
};

export const removeBannerImages = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/banner-images1/${_id}`
  );
};

export const listBannerImages = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/banner-images1`
  );
};

export const updateBannerImages = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/banner-images1/${_id}`,
    values
  );
};

export const getBannerImages = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/banner-images1/${_id}`
  );
};
