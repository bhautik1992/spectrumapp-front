import { LOGIN_REQUEST, LOGOUT_REQUEST } from '../constants';

const loggedInUser = {
    isAuthenticated: false,
    user:null,
}

const LoginReducer = (state = loggedInUser, action) => {
    switch(action.type){
        case LOGIN_REQUEST:
            return {
                ...state,
                isAuthenticated: true,
                user: action.data.data
            }
        case LOGOUT_REQUEST:
            localStorage.clear();
            sessionStorage.clear();
        default:
            return state
    }
}

export default LoginReducer;


