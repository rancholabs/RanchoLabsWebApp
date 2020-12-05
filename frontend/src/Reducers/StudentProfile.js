import {
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    ENABLE_PROFILE_EDITING,
    SET_IS_SHARE_OPEN
 } from "../Constants/StudentProfile"

function StudentProfileReducer(state = {isEditView: false, isShareOpen: false, user: {}, academic: {} }, action) {
  switch (action.type) {
    case ENABLE_PROFILE_EDITING:
        return {...state, isEditView: action.payload}
    case SET_IS_SHARE_OPEN:
        return {...state, isShareOpen: action.payload}
    case GET_PROFILE_REQUEST:
        return {...state, loading: true}
    case GET_PROFILE_SUCCESS:
        return {...state, ...action.payload}
    case GET_PROFILE_FAIL:
        return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}
export { StudentProfileReducer }