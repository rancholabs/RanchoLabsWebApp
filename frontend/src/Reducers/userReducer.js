import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_ERROR_RESET,
    USER_WORKSHOP_REGISTER_REQUEST,
    USER_WORKSHOP_REGISTER_SUCCESS,
    USER_WORKSHOP_REGISTER_FAIL,
    USER_SETPASSWORD_REQUEST,
    USER_SETPASSWORD_SUCCESS,
    USER_SETPASSWORD_FAIL,
    USER_FORGOTPASSWORD_REQUEST,
    USER_FORGOTPASSWORD_SUCCESS,
    USER_FORGOTPASSWORD_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_VALIDATE_REQUEST,
    USER_VALIDATE_SUCCESS,
    USER_VALIDATE_FAIL,
    USER_MESSAGE_REQUEST,	
    USER_MESSAGE_SUCCESS,	
    USER_MESSAGE_FAIL,	
    USER_CALLBACK_REQUEST,	
    USER_CALLBACK_SUCCESS,	
    USER_CALLBACK_FAIL,

} from '../Constants/userConstant'

export const userLoginReducer  = (state = {} , action) =>{
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return {loading:true}
        case USER_LOGIN_SUCCESS:
            return {loading:false, userInfo : action.payload}
        case USER_LOGIN_FAIL:
            return {loading: false, error  : action.payload}
        case USER_LOGOUT:
            return {}           
        default :
            return state
    }
}

export const userRegisterReducer  = (state = {} , action) =>{
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return {loading:true}
        case USER_REGISTER_SUCCESS:
            return {loading:false, userInfo : action.payload, isRegistered: true}
        case USER_REGISTER_FAIL:
            return {loading: false, error  : action.payload}
        case USER_ERROR_RESET:
            return {}
        case USER_LOGOUT:
                return {}
        default :
            return state  
    }
}

export const userUpdateReducer  = (state = {} , action) =>{
    switch(action.type) {
        case USER_UPDATE_REQUEST:
            return {loading:true}
        case USER_UPDATE_SUCCESS:
            return {loading:false, userInfo : action.payload, isUpdated: true}
        case USER_UPDATE_FAIL:
            return {loading: false, error  : action.payload, isUpdated: false}
        default:
            return state  
    }
}

export const userRegisterWorkshopReducer  = (state = {} , action) =>{
    switch(action.type) {
        case USER_WORKSHOP_REGISTER_REQUEST:
            return {loading:true}
        case USER_WORKSHOP_REGISTER_SUCCESS:
            return {loading:false, userInfo : action.payload}
        case USER_WORKSHOP_REGISTER_FAIL:
            return {loading: false, error  : action.payload}
        default :
            return state  
    }
}



export const SetPasswordReducer  = (state = {} , action) =>{
    switch(action.type) {
        case USER_SETPASSWORD_REQUEST:
            return {loading:true}
        case USER_SETPASSWORD_SUCCESS:
            return {loading:false, isPasswordChanged: true}
        case USER_SETPASSWORD_FAIL:
            return {loading: false, isPasswordChanged: false}
        default :
            return state  
    }
}

export const ValidateToken = (state = {}, action) => {
    switch(action.type) {
        case USER_VALIDATE_REQUEST:
            return {loading: true}
        case USER_VALIDATE_SUCCESS:
            return {loading: false, isValid: true}
        case USER_VALIDATE_FAIL:
            return {loading: false, isValid: false, error: action.payload}
        default:
            return state
    }
}

export const ForgotPasswordReducer  = (state = {} , action) =>{
    switch(action.type) {
        case USER_FORGOTPASSWORD_REQUEST:
            return {loading:true}
        case USER_FORGOTPASSWORD_SUCCESS:
            return {loading:false, isMailSent: true}
        case USER_FORGOTPASSWORD_FAIL:
            return {loading: false, isMailSent: false, error: action.payload}
        default :
            return state  
    }
}

export const sendMailReducer  = (state = {} , action) =>{
    switch(action.type) {
        case USER_MESSAGE_REQUEST:
            return {loading:true}
        case USER_MESSAGE_SUCCESS:
            return {loading:false, message : action.payload}
        case USER_MESSAGE_FAIL:
            return {loading: false, error  : action.payload}
        default :
            return state  
    }
}

export const callbackReducer  = (state = {} , action) =>{
    switch(action.type) {
        case USER_CALLBACK_REQUEST:
            return {loading:true}
        case USER_CALLBACK_SUCCESS:
            return {loading:false, callbackMessage : action.payload}
        case USER_CALLBACK_FAIL:
            return {loading: false, error  : action.payload}
        default :
            return state  
    }
}