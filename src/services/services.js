// import axios from "axios";
// import { decrypt, hexString } from "../utils/appHelpers/appHelpers";

// // HTTP Settings
// const timeout = 250000;
// const tlPogetEndpoint = "stuff";
// const sdaPogetEndpoint = "more/stuff";
// const frontEndError = {
//   data: {
//     errors: [
//       {
//         code: 0,
//         message: "We are unable to complete your request.  Please try again."
//       }
//     ]
//   }
// };
// const htmlError = {
//   data: {
//     errors: [
//       {
//         code: 1,
//         message:
//           "Invalid response - the application cannot process your request"
//       }
//     ]
//   }
// };

// const getHeader = () => {
//   let logId = hexString(16);
//   let token = sessionStorage.ccot ? decrypt(sessionStorage.ccot) : null;
//   let headers = token
//     ? {
//         "Content-Type": "application/json",
//         "X-B3-TraceId": `${logId}`,
//         "X-B3-SpanId": `${logId}`,
//         Authorization: `bearer ${token}`
//       }
//     : {
//         "Content-Type": "application/json",
//         "X-B3-TraceId": `${logId}`,
//         "X-B3-SpanId": `${logId}`
//       };
//   return headers;
// };

// export const getBasepath = () => {
//   if (sessionStorage.cco) {
//     switch (process.env.REACT_APP_ENV) {
//       case "dev":
//         return "";
//       case "uat":
//         return "";
//       case "prod":
//         return "";
//       default:
//         return "";
//     }
//   } else {
//     if (process.env.REACT_APP_ENV !== undefined) {
//       console.log(process.env.REACT_APP_ENV);
//       return "/esap";
//     } else {
//       // Load Balancer
//     }
//   }
// };

// // Error Handler - Checks Error Types and Returns Standardized Output
// const errorHandler = (error) => {
//   if (error && error.data && error.data.errors) {
//     console.log("Processing Response Errors");
//     return error;
//   } else if (typeof error === "string") {
//     console.log("No Error Response - Processing String Error");
//     return { data: { errors: [{ code: 1, message: error }] } };
//   } else if (error && error.data && error.data[0] === "<") {
//     console.log("Invalid Error Syntax - Converting HTML Error To JSON");
//     return htmlError;
//   } else {
//     console.log("Unable To Connect API To Back End Services");
//     return frontEndError;
//   }
// };

// // Error Parser - Converts Error Objects To Error Array
// const errorParser = (errors, traceId) => {
//   let errorsObj = errorHandler(errors);
//   let errorInputArray = errorsObj.data.errors;
//   let errorOutputArray = [];
//   let addedOnce = false;
//   for (let i = 0; i < errorInputArray.length; i++) {
//     let errorItem = errorInputArray[i];
//     // Use Error Property - 'message'
//     if (
//       errorItem.message &&
//       typeof errorItem.message === "string" &&
//       errorItem.message.length > 0
//     ) {
//       errorOutputArray.push(`${errorItem.message}\n(Error Code:${traceId})`);
//     } else {
//       if (!addedOnce) {
//         errorOutputArray.push(
//           `The system is unable to process this request.\n(Error Code: ${traceId})`
//         );
//         addedOnce = true;
//       }
//     }
//     // Use Error Property - 'detailedMessage'
//     // if (errorItem.detailedMessage && typeof errorItem.detailedMessage === "string" && errorItem.detailedMessage.length > 0) {
//     // 	let errString = `${errorItem.detailedMessage}\n(Error Code: ${traceId})`;
//     // 	errorOutputArray.push(errString);
//     // } else {
//     // 	if (errorItem.message && typeof errorItem.message === "string" && errorItem.message.length > 0) {
//     // 		errorOutputArray.push(`${errorItem.message}\n(Error Code:${traceId})`);
//     // 	} else {
//     // 		if (!addedOnce) {
//     // 			errorOutputArray.push(`The system is unable to process this request.\n(Error Code: ${traceId})`);
//     // 			addedOnce = true;
//     // 		}
//     // 	}
//     // }
//   }
//   let errorResponse = { data: { errors: errorOutputArray } };
//   return errorResponse;
// };

// // GET Request
// const axiosGET = (endpoint) => {
//   let headers = getHeader();
//   let basepath = getBasepath();

//   return axios({
//     method: "get",
//     timeout: timeout,
//     headers: headers,
//     baseURL: basepath,
//     url: endpoint
//   })
//     .then((res) => {
//       if (res.status === 226) {
//         console.log(`GET Error (${headers["X-B3-TraceId"]}): `, res);
//         return new Promise((resolve) =>
//           resolve(errorParser(res, headers["X-B3-TraceId"]))
//         );
//       } else {
//         return new Promise((resolve) => resolve(res));
//       }
//     })
//     .catch((error) => {
//       console.log(
//         `GET Error (${headers["X-B3-TraceId"]}): `,
//         error.response ? error.response : error
//       );
//       return new Promise((resolve) =>
//         resolve(errorParser(error.response, headers["X-B3-TraceId"]))
//       );
//     });
// };

// // POST Request
// const axiosPOST = (endpoint, data) => {
//   let headers = getHeader();
//   let basepath = getBasepath();

//   return axios({
//     method: "post",
//     timeout: timeout,
//     headers: headers,
//     baseURL: basepath,
//     url: endpoint,
//     data: data
//   })
//     .then((res) => {
//       if (res.status === 226) {
//         console.log(`POST Error (${headers["X-B3-TraceId"]}): `, res);
//         return new Promise((resolve) =>
//           resolve(errorParser(res, headers["X-B3-TraceId"]))
//         );
//       } else {
//         return new Promise((resolve) => resolve(res));
//       }
//     })
//     .catch((error) => {
//       console.log(
//         `POST Error (${headers["X-B3-TraceId"]}): `,
//         error.response ? error.response : error
//       );
//       return new Promise((resolve) =>
//         resolve(errorParser(error.response, headers["X-B3-TraceId"]))
//       );
//     });
// };

// // PUT Request
// const axiosPUT = (endpoint, data) => {
//   let headers = getHeader();
//   let basepath = getBasepath();

//   return axios({
//     method: "put",
//     timeout: timeout,
//     headers: headers,
//     baseURL: basepath,
//     url: endpoint,
//     data: data
//   })
//     .then((res) => {
//       if (res.status === 226) {
//         console.log(`PUT Error (${headers["X-B3-TraceId"]}): `, res);
//         return new Promise((resolve) =>
//           resolve(errorParser(res, headers["X-B3-TraceId"]))
//         );
//       } else {
//         return new Promise((resolve) => resolve(res));
//       }
//     })
//     .catch((error) => {
//       console.log(
//         `PUT Error (${headers["X-B3-TraceId"]}): `,
//         error.response ? error.response : error
//       );
//       return new Promise((resolve) =>
//         resolve(errorParser(error.response, headers["X-B3-TraceId"]))
//       );
//     });
// };

// // DELETE Request
// const axiosDELETE = (endpoint, data) => {
//   let headers = getHeader();
//   let basepath = getBasepath();

//   return axios({
//     method: "delete",
//     timeout: timeout,
//     headers: headers,
//     baseURL: basepath,
//     url: endpoint,
//     data: data
//   })
//     .then((res) => {
//       if (res.status === 226) {
//         console.log(`DELETE Error (${headers["X-B3-TraceId"]}): `, res);
//         return new Promise((resolve) =>
//           resolve(errorParser(res, headers["X-B3-TraceId"]))
//         );
//       } else {
//         return new Promise((resolve) => resolve(res));
//       }
//     })
//     .catch((error) => {
//       console.log(
//         `DELETE Error (${headers["X-B3-TraceId"]}): `,
//         error.response ? error.response : error
//       );
//       return new Promise((resolve) =>
//         resolve(errorParser(error.response, headers["X-B3-TraceId"]))
//       );
//     });
// };

// // POST & GET Request
// //  - postType should be "tls", "sda", or "transaction"
// //  - getType should be "lookup", "search", or "transaction"
// const axiosPOGET = (endpoint, data, postType, getType) => {
//   let headers = getHeader();
//   let basepath = getBasepath();
//   let pogetData = {};
//   let postUrl = "";

//   if (postType === "tls") {
//     pogetData = { "@type": "TL", ...data };
//     postUrl = tlPogetEndpoint;
//   }
//   if (postType === "sda") {
//     pogetData = { "@type": "SD", ...data };
//     postUrl = sdaPogetEndpoint;
//   }
//   if (postType === "transaction") {
//     pogetData = data;
//     postUrl = transPogetEndpoint;
//   }

//   return axios({
//     method: "post",
//     timeout: timeout,
//     headers: headers,
//     baseURL: basepath,
//     url: postUrl,
//     data: pogetData
//   })
//     .then((res) => {
//       if (res.status === 226) {
//         console.log(
//           `POGET First Stage Error (${headers["X-B3-TraceId"]}): `,
//           res
//         );
//         return new Promise((resolve) =>
//           resolve(errorParser(res, headers["X-B3-TraceId"]))
//         );
//       } else {
//         let getEndpoint = endpoint;
//         switch (getType) {
//           case "search":
//             getEndpoint = endpoint + "?uuid=" + res.data;
//             break;
//           case "lookup":
//             getEndpoint = endpoint + "/" + res.data;
//             break;
//           default:
//             getEndpoint = endpoint;
//         }
//         return axios({
//           method: "get",
//           timeout: timeout,
//           headers: headers,
//           baseURL: basepath,
//           url: getEndpoint
//         })
//           .then((getRes) => {
//             if (getRes.status === 226) {
//               console.log(
//                 `POGET Second Stage Error (${headers["X-B3-TraceId"]}): `,
//                 getRes
//               );
//               return new Promise((resolve) =>
//                 resolve(errorParser(getRes, headers["X-B3-TraceId"]))
//               );
//             } else {
//               return new Promise((resolve) => resolve(getRes));
//             }
//           })
//           .catch((getError) => {
//             console.log(
//               `POGET Second Stage Error (${headers["X-B3-TraceId"]}): `,
//               getError.response ? getError.response : getError
//             );
//             return new Promise((resolve) =>
//               resolve(errorParser(getError.response, headers["X-B3-TraceId"]))
//             );
//           });
//       }
//     })
//     .catch((error) => {
//       console.log(
//         `POGET First Stage Error (${headers["X-B3-TraceId"]}): `,
//         error.response ? error.response : error
//       );
//       return new Promise((resolve) =>
//         resolve(errorParser(error.response, headers["X-B3-TraceId"]))
//       );
//     });
// };

// const envBaseTest = () => {
//   let basepath = getBasepath();
//   return basepath;
// };

// const clientService = {
//   axiosGET,
//   axiosPOST,
//   axiosPUT,
//   axiosPOGET,
//   axiosDELETE,
//   envBaseTest
// };

// export default clientService;
