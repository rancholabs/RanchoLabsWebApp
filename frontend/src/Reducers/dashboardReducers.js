import {
    DASHBOARD_FAIL,
    DASHBOARD_REQUEST,
    DASHBOARD_SUCCESS,
    DASHBOARD_COURSE_REQUEST,
    DASHBOARD_COURSE_SUCCESS,
    DASHBOARD_COURSE_FAIL,
    DASHBOARD_ACTIVECOURSE_REQUEST,
    DASHBOARD_ACTIVECOURSE_SUCCESS,
    DASHBOARD_ACTIVECOURSE_FAIL,
    JOURNEY_COURSE,

} from '../Constants/dashboardConstants'

export const dashboardReducer  = (state = { dashboard : {} } , action) =>{
    switch(action.type) {
        case DASHBOARD_REQUEST:
            return {loading: true}
        case DASHBOARD_SUCCESS:
            return {loading: false, dashboard : action.payload}
        case DASHBOARD_FAIL:
            return {loading: false, error : action.payload}
        default :
            return state
    }
}

export const dashboardCourseReducer  = (state = { dashboardCourse : {} } , action) =>{
    switch(action.type) {
        case DASHBOARD_COURSE_REQUEST:
            return {loading: true}
        case DASHBOARD_COURSE_SUCCESS:
            return {loading: false, dashboardCourse : action.payload}
        case DASHBOARD_COURSE_FAIL:
            return {loading: false, error : action.payload}
        default :
            return state
    }
}

export const dashboardActiveCourseReducer  = (state = { activeCourse : '5f797f247a188f4a5c1046bf' } , action) =>{
    switch(action.type) {
        case DASHBOARD_ACTIVECOURSE_REQUEST:
            return {loading: true}
        case DASHBOARD_ACTIVECOURSE_SUCCESS:
            return {loading: false, activeCourse : action.payload}
        case DASHBOARD_ACTIVECOURSE_FAIL:
            return {loading: false, error : action.payload}
        default :
            return state
    }
}

export const journeycourseReducer = ( state = { journeycourse : 'ROBOTICS'}, action) => {
    switch(action.type){
        case JOURNEY_COURSE : 
        return { journeycourse : action.payload }
        default :
            return state
    }
}