import axios from "axios";

export const createExtraBooking = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/ExtraBooking`,
    values
  );
};

export const removeExtraBooking = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/remove/ExtraBooking/${_id}`
  );
};

//   export const listContact = async () => {
//     return await axios.get(
//       `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/company-locations`
//     );
//   };

export const updateExtraBooking = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/update/ExtraBooking/${_id}`,
    values
  );
};

export const getExtraBooking = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/ExtraBooking/${_id}`
  );
};

// export const findContact = async (_id, country, city) => {
//   return await axios.get(
//     `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/find/company-locations/${country}/${city}`
//   );
// };
