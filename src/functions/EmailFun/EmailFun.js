import axios from "axios";

export const createEmailControl = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/EmailControl`,
    values,
    {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
  );
};

export const removeEmailControl = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/EmailControl/${_id}`
  );
};

//   export const listContact = async () => {
//     return await axios.get(
//       `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/company-locations`
//     );
//   };

export const updateEmailControl = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/EmailControl/${_id}`,
    values,
    {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
  );
};

export const getEmailControl = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/EmailControl/${_id}`
  );
};

// export const findContact = async (_id, country, city) => {
//   return await axios.get(
//     `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/find/company-locations/${country}/${city}`
//   );
// };
