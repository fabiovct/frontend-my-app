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

// Função helper para obter cookie no cliente
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
}

// Interceptor para adicionar Bearer token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
