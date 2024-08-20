import axios from "axios";

export const createCoursesFun = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/CoursesFun`,
    values,
    {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
  );
};

export const removeCoursesFun = async (_id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/CoursesFun/${_id}`
  );
};

//   export const listContact = async () => {
//     return await axios.get(
//       `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/company-locations`
//     );
//   };

export const updateCoursesFun = async (_id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/CoursesFun/${_id}`,
    values,
    {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
  );
};

export const getCoursesFun = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/CoursesFun/${_id}`
  );
};

// export const findContact = async (_id, country, city) => {
//   return await axios.get(
//     `${process.env.REACT_APP_API_URL_BPC}/api/auth/find/company-locations/${country}/${city}`
//   );
// };
