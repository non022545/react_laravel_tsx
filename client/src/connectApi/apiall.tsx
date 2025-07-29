// src/axiosInstance.ts
import axios from "axios";

const apiall = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiall;
