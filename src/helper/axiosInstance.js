import axios from 'axios';
import { store } from '../redux/store';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.LoginReducer.user?._token;

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },(error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

export default axiosInstance;

