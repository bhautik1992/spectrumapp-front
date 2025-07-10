import axiosInstance from  '../../helper/axiosInstance';
import toast from 'react-hot-toast'
import { CUSTOMERS_LIST } from '../constants'

export const getCustomers = (page = 1, perPage = 10, search = "") => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get('lead',{
                params: {
                    page, 
                    perPage,
                    search 
                }
            });
            
            if(response.data.success){
                dispatch({type:CUSTOMERS_LIST,data:response.data.data});
            }
        } catch (error) {
            let errorMessage = import.meta.env.VITE_ERROR_MSG;

            if(error.response){
                errorMessage = error.response.data?.message || JSON.stringify(error.response.data); // Case 1: API responded with an error
            }else if (error.request){
                errorMessage = import.meta.env.VITE_NO_RESPONSE; // Case 2: Network error
            }
    
            // console.error(error.message);
            toast.error(errorMessage);
        }
    }
};


