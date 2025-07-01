import { LOGIN_REQUEST, LOGOUT_REQUEST } from '../constants'

export const login = (data) => {
    return {
        type: LOGIN_REQUEST,
        data,
    }
}

export const logout = () => {
    return {
        type: LOGOUT_REQUEST
    }
}


