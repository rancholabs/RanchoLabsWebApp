import {
    GET_PROJECT_REQUEST,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_FAIL
 } from "../Constants/ProjectView"

function ProjectviewReducer(state = { }, action) {
  switch (action.type) {
    case GET_PROJECT_REQUEST:
        return {...state, loading: true}
    case GET_PROJECT_SUCCESS:
        return {...state, ...action.payload}
    case GET_PROJECT_FAIL:
        return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}
export { ProjectviewReducer }