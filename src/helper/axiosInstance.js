import axios from 'axios';
import { store } from '../redux/store';
import { START_LOADING, STOP_LOADING } from '../services/constants';

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
        
        store.dispatch({ type: START_LOADING });
        return config;
    },(error) => {
        store.dispatch({ type: STOP_LOADING });
        console.log(error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        store.dispatch({ type: STOP_LOADING });
        return response;
    },(error) => {
        store.dispatch({ type: STOP_LOADING });

        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.message || '';

            if (status === 401 && (message.includes('Invalid or expired token'))) {
                store.dispatch({ type: 'LOGOUT_REQUEST' });
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;


