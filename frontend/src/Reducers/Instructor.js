import { INSTRUCTOR_INFO_REQUEST, INSTRUCTOR_INFO_SUCCESS, INSTRUCTOR_INFO_FAIL, INSTRUCTOR_SCHEDULE_REQUEST, INSTRUCTOR_SCHEDULE_SUCCESS, INSTRUCTOR_SCHEDULE_FAIL, INSTRUCTOR_BATCH_SUCCESS, INSTRUCTOR_BATCH_FAIL, INSTRUCTOR_BATCH_REQUEST, INSTRUCTOR_NOTE, INSTRUCTOR_UPDATE_REQUEST, INSTRUCTOR_UPDATE_SUCCESS, INSTRUCTOR_UPDATE_FAIL, INSTRUCTOR_UPDATEBATCHCLASS_REQUEST, INSTRUCTOR_UPDATEBATCHCLASS_SUCCESS, INSTRUCTOR_UPDATEBATCHCLASS_FAIL } from "../Constants/Instructor"

export const instructorInfoReducer  = (state = {} , action) =>{
    switch(action.type) {
        case INSTRUCTOR_INFO_REQUEST:
            return {loading:true}
        case INSTRUCTOR_INFO_SUCCESS:
            return {loading:false, instructorInfo : action.payload}
        case INSTRUCTOR_INFO_FAIL:
            return {loading: false, error  : action.payload}
        default:
            return state  
    }
}

export const instructorScheduleReducer  = (state = {} , action) =>{
    switch(action.type) {
        case INSTRUCTOR_SCHEDULE_REQUEST:
            return {loading:true}
        case INSTRUCTOR_SCHEDULE_SUCCESS:
            return {loading:false, instructorSchedule : action.payload}
        case INSTRUCTOR_SCHEDULE_FAIL:
            return {loading: false, error  : action.payload}
        default:
            return state  
    }
}

export const instructorUpdateReducer  = (state = {} , action) =>{
    switch(action.type) {
        case INSTRUCTOR_UPDATE_REQUEST:
            return {loading:true}
        case INSTRUCTOR_UPDATE_SUCCESS:
            return {loading:false, instructorUpdate : action.payload}
        case INSTRUCTOR_UPDATE_FAIL:
            return {loading: false, error  : action.payload}
        default:
            return state  
    }
}

export const instructorUpdateBatchClassReducer  = (state = {} , action) =>{
    switch(action.type) {
        case INSTRUCTOR_UPDATEBATCHCLASS_REQUEST:
            return {loading:true}
        case INSTRUCTOR_UPDATEBATCHCLASS_SUCCESS:
            return {loading:false, instructorbatchclass : action.payload}
        case INSTRUCTOR_UPDATEBATCHCLASS_FAIL:
            return {loading: false, error  : action.payload}
        default:
            return state  
    }
}

export const instructorBatchReducer  = (state = {batch :'all'} , action) =>{
    switch(action.type) {
        case INSTRUCTOR_BATCH_SUCCESS:
            return {loading:false, batch : action.payload}
        default:
            return state  
    }
}

export const instructorNoteReducer  = (state = {} , action) =>{
    switch(action.type) {
        case INSTRUCTOR_NOTE:
            return {loading:false, note : action.payload}
        default:
            return state  
    }
}