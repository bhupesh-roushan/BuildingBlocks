import axios from "axios";

// Create an axios instance with a base URL for the backend API endpoint which will be used in the application directly

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

//in check auth we are passing authorization header ,everytime we refresh the page we will check if the user is logged in or not

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || "";

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
