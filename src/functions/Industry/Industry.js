import axios from "axios";

export const createIndustry = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/Industry`,
    values
  );
};

export const removeIndustry = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/Industry/${_id}`
  );
};

  export const listIndustry= async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/Industry`
    );
  };

export const updateIndustry = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/Industry/${_id}`,
    values
  );
};

export const getIndustry = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/Industry/${_id}`
  );
};

// export const findContact = async (_id, country, city) => {
//   return await axios.get(
//     `${process.env.REACT_APP_API_URL_BPC}/api/auth/find/company-locations/${country}/${city}`
//   );
// };
