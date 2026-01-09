// import axios from "axios";

// export const api = axios.create({
//   baseURL: "http://localhost:8000/api",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// });

import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
  //withCredentials: true, //MUITO IMPORTANTE
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


// api.interceptors.request.use((config) => {
//   //const token = localStorage.getItem("token");
//   const token = request.cookies.get("token")?.value;

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });
