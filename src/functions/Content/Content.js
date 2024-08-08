import axios from "axios";

export const createContent = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/Content`,
    values,
    {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
  );
};

export const removeContent = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/Content/${_id}`
  );
};

//   export const listContact = async () => {
//     return await axios.get(
//       `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/company-locations`
//     );
//   };

export const updateContent = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/Content/${_id}`,
    values,
    {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
  );
};

export const getContent = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/Content/${_id}`
  );
};

// export const findContact = async (_id, country, city) => {
//   return await axios.get(
//     `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/find/company-locations/${country}/${city}`
//   );
// };
