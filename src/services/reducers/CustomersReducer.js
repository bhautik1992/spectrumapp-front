import { CUSTOMERS_LIST, CUSTOMER_UPDATE } from '../constants';

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
        case CUSTOMER_UPDATE:
            return {
                list: state.list.map(list => list.shopify_cus_id === action.payload.shopify_cus_id ? { 
                    ...list,
                    lead_status: action.payload.lead_status,
                }: list)
            }
        default:
            return state
    }
}

export default CustomersReducer;


