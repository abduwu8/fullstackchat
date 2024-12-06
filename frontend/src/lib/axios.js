import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001" : "/",
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('jwt=')).split('=')[1];
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export { axiosInstance };
