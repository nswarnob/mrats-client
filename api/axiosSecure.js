import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Include JWT cookie from /jwt endpoint
});

// Response interceptor to handle 401 errors
axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or unauthorized
      // AuthProvider will handle logout via onAuthStateChanged
      console.warn("Unauthorized: Please login again");
    }
    return Promise.reject(error);
  },
);

export default axiosSecure;
