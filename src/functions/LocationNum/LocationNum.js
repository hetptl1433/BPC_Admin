import axios from "axios";

export const createLocationNum = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/LocationNum`,
    values
  );
};

export const removeLocationNum = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/LocationNum/${_id}`
  );
};

//   export const listLocationNum = async () => {
//     return await axios.get(
//       `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/company-locations`
//     );
//   };

export const updateLocationNum = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/LocationNum/${_id}`,
    values
  );
};

export const getLocationNum = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/LocationNum/${_id}`
  );
};

// export const findLocationNum = async (_id, country, city) => {
//   return await axios.get(
//     `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/find/company-locations/${country}/${city}`
//   );
// };
