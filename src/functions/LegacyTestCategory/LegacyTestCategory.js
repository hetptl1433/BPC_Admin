import axios from "axios";

// export const createTestCategory = async (values) => {
//     return await axios.post(
//       `${process.env.REACT_APP_API_URL_BPC}/api/auth/create/TestCategoryMaster`,
//       values
//     );
//   };
  
//   export const removeTestCategory = async (_id) => {
//     return await axios.delete(
//       `${process.env.REACT_APP_API_URL_BPC}/api/auth/remove/TestCategoryMaster/${_id}`
//     );
//   };
  
//   export const listTestCategory = async () => {
//     return await axios.get(
//       `${process.env.REACT_APP_API_URL_BPC}/api/auth/list/TestCategoryMaster`
//     );
//   };
//   export const listLEDActiveCategory = async () => {
//     return await axios.get(
//       `${process.env.REACT_APP_API_URL_BPC}/api/auth/list-active/TestCategoryMaster`
//     );
//   };
  
  
//   export const updateTestCategory = async (_id, values) => {
//     return await axios.put(
//       `${process.env.REACT_APP_API_URL_BPC}/api/auth/update/TestCategoryMaster/${_id}`,
//       values
//     );
//   };
  
  export const getLegacyTestData = async (ExamId, UserId) => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_BPC}/api/legacyTestData/${UserId}/${ExamId}`
    );
  };
  


  export const getLegacyUserData = async (UserId) => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_BPC}/api/legacyTestData/${UserId}`
    );
  };
  

  export const getTestCatgoryData = async (TestId) => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_BPC}/api/legacyTestCategoryData/${TestId}`
    );
  };

  export const getLegacyResultAns = async (ExamId, UserId) => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_BPC}/api/legacyExamDetails/${UserId}/${ExamId}`
    );
  };