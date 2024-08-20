import axios from "axios";

export const createCompanyProfileDetails = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/CompanyProfile-details`,
    values
  );
};

export const removeCompanyProfileDetails = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/CompanyProfile-details/${_id}`
  );
};

export const listCompanyProfileDetails = async () => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/CompanyProfile-details`
  );
};

export const updateCompanyProfileDetails = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/CompanyProfile-details/${_id}`,
    values
  );
};

export const getCompanyProfileDetails = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/CompanyProfile-details/${_id}`
  );
};
