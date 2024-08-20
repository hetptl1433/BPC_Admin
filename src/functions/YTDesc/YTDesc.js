import axios from "axios";

export const createYTDesc = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/ytdesc`,
    values,
    {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
  );
};

export const removeYTDesc = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/ytdesc/${_id}`
  );
};

//   export const listContact = async () => {
//     return await axios.get(
//       `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/company-locations`
//     );
//   };

export const updateYTDesc = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/ytdesc/${_id}`,
    values,
    {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
  );
};

export const getYTDesc = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/ytdesc/${_id}`
  );
};

// export const findContact = async (_id, country, city) => {
//   return await axios.get(
//     `${process.env.REACT_APP_API_URL_BPC}/api/auth/find/company-locations/${country}/${city}`
//   );
// };
