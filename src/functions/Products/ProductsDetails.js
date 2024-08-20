import axios from "axios";

export const createProductsDetails = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/product-details`,
    values
  );
};

export const removeProductsDetails = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/product-details/${_id}`
  );
};

export const listProductsDetails = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/product-details`
  );
};

export const updateProductsDetails = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/product-details/${_id}`,
    values
  );
};

export const getProductsDetails = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/product-details/${_id}`
  );
};
