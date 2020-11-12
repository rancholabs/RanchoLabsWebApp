import { USER_COURSES_REQUEST, 
    USER_COURSES_SUCCESS, 
    USER_COURSES_FAIL,
    STUDENT_UPDATE_REQUEST,
    STUDENT_UPDATE_SUCCESS,
    STUDENT_UPDATE_FAIL,
    STUDENT_INFO_REQUEST,
    STUDENT_INFO_SUCCESS,
    STUDENT_INFO_FAIL,
    STUDENT_FREEENROLL_REQUEST,
    STUDENT_FREEENROLL_SUCCESS,
    STUDENT_FREEENROLL_FAIL} from '../Constants/Student'

export const studentCoursesReducer  = (state = {courses: [], loading: false, error: null} , action) =>{
    switch(action.type) {
        case USER_COURSES_REQUEST:
            return {...state, loading:true}
        case USER_COURSES_SUCCESS:
            return {...state, loading:false, courses: action.payload}
        case USER_COURSES_FAIL:
            return {...state, loading: false, error: action.payload}     
        default :
            return state
    }
}

export const studentUpdateReducer  = (state = {isUpdated: false} , action) =>{
    switch(action.type) {
        case STUDENT_UPDATE_REQUEST:
            return {loading:true}
        case STUDENT_UPDATE_SUCCESS:
            return {loading:false, studentInfo : action.payload, isUpdated: true}
        case STUDENT_UPDATE_FAIL:
            return {loading: false, error  : action.payload, isUpdated: false}
        default:
            return state  
    }
}

export const studentFreeEnrollUpdateReducer  = (state = {isUpdated: false} , action) =>{
    switch(action.type) {
        case STUDENT_FREEENROLL_REQUEST:
            return {loading:true}
        case STUDENT_FREEENROLL_SUCCESS:
            return {loading:false, studentInfo : action.payload}
        case STUDENT_FREEENROLL_FAIL:
            return {loading: false, error  : action.payload}
        default:
            return state  
    }
}

export const studentInfoReducer  = (state = {} , action) =>{
    switch(action.type) {
        case STUDENT_INFO_REQUEST:
            return {loading:true}
        case STUDENT_INFO_SUCCESS:
            return { loading: false, student: action.payload };
        case STUDENT_INFO_FAIL:
            return {loading: false, error  : action.payload}
        default :
            return state
    }
}
