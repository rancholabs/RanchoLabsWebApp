// import {
//     WORKSHOP_BATCH_REQUEST,
//     WORKSHOP_BATCH_SUCCESS,
//     WORKSHOP_BATCH_FAIL,
//     WORKSHOP_INSTRUCTOR_SUCCESS,
//     WORKSHOP_INSTRUCTOR_REQUEST, 
//     WORKSHOP_INSTRUCTOR_FAIL,

// } from '../Constants/WorkshopConstants'
import { COURSE_GROUP_REQUEST, COURSE_GROUP_SUCCESS, 
    COURSE_GROUP_FAIL, COURSE_GROUP_LIST_REQUEST, 
    COURSE_GROUP_LIST_SUCCESS, COURSE_GROUP_LIST_FAIL } from '../Constants/courseConstants'

// export const workshopBatches = (state = {} , action) => {
//     switch(action.type) {
//         case WORKSHOP_BATCH_REQUEST:
//             return {loading:true}
//         case WORKSHOP_BATCH_SUCCESS:
//             return {loading:false, workshopBatchInfo : action.payload}
//         case WORKSHOP_BATCH_FAIL:
//             return {loading: false, error  : action.payload}
//         default :
//             return state  
//     }
// }

// export const workshopInstructors = (state = {} , action) => {
//     switch(action.type) {
//         case WORKSHOP_INSTRUCTOR_REQUEST:
//             return {loading:true}
//         case WORKSHOP_INSTRUCTOR_SUCCESS:
//             return {loading:false, workshopBatchInfo : action.payload}
//         case WORKSHOP_INSTRUCTOR_FAIL:
//             return {loading: false, error  : action.payload}
//         default :
//             return state  
//     }
// }

export const coursegroupReducer = (state = {} , action) => {
    switch(action.type) {
        case COURSE_GROUP_REQUEST:
            return {loading:true}
        case COURSE_GROUP_SUCCESS:
            return {loading:false, coursegroups : action.payload}
        case COURSE_GROUP_FAIL:
            return {loading: false, error  : action.payload}
        default :
            return state  
    }
}

export const courseGroupsListReducer = (state = {loading: false, courseGroupsList: []} , action) => {
    switch(action.type) {
        case COURSE_GROUP_LIST_REQUEST:
            return {...state, loading:true}
        case COURSE_GROUP_LIST_SUCCESS:
            return {...state, loading:false, courseGroupsList : action.payload}
        case COURSE_GROUP_LIST_FAIL:
            return {...state, loading: false, error  : action.payload}
        default :
            return state  
    }
}