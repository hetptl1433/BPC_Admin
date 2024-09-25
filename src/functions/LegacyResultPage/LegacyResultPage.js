import axios from "axios";






export const getResultData = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/OldResultData/${_id}`
  );
};


export const getResultAns = async (userID, testID) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/ResultAns/${userID}/${testID}`
  );
};
 

export const getPointMaster = async (testId) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL_BPC}/api/auth/location/test/PointMaster/${testId}`
  );
};

// export const excelResultData = async (data) => {
//   try {
//     const response = await axios.post(
//       `${process.env.REACT_APP_API_URL_BPC}/api/auth/get/ResultExcel`,
//       data, // Sending the provided data (e.g., industry, startDate, endDate)
//       {
//         headers: {
//           "Content-Type": "application/json", // JSON request header
//         },
//       }
//     );
//     return response.data; // Return response data from backend
//   } catch (error) {
//     console.error("Error exporting Excel data:", error);
//     throw error; // Re-throw error to handle it where this function is called
//   }
// };

