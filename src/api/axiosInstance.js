import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/api', // 你的后端地址，按需替换成实际后端地址
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        console.log('发送请求:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('API错误:', error.response?.data || error.message);
        return Promise.reject(error.response?.data || error);
    }
);

export default api;