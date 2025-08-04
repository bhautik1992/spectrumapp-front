import { CUSTOMERS_LIST, CUSTOMER_UPDATE, SEGMENT_LIST } from '../constants';

const initialState  = {
    list:[],
    total: 0,
    segments:[]
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
        case SEGMENT_LIST:
            return {
                ...state,
                segments: action.data.segments
            }
        default:
            return state
    }
}

export default CustomersReducer;


