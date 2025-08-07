import { LOGIN_REQUEST, LOGOUT_REQUEST, UPDATE_PROFILE } from '../constants';

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
                user: action.data
            }
        case LOGOUT_REQUEST:
            localStorage.clear();
            sessionStorage.clear();
        case UPDATE_PROFILE:
            return {
                ...state,
                user: { 
                    ...state.user, //Creates a copy of the existing user object
                    ...action.data //Updates only the modified properties in the copied user object
                }
            }
        default:
            return state
    }
}

export default LoginReducer;


