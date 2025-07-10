import { CUSTOMERS_LIST } from '../constants';

const initialState  = {
    list:[],
    total: 0
}

const CustomersReducer = (state = initialState, action) => {
    switch(action.type){
        case CUSTOMERS_LIST:
            return {
                ...state,
                list: action.data.customers,
                total: action.data.total,
            }
        default:
            return state
    }
}

export default CustomersReducer;


