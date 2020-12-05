import {
  GET_INNOVATION_REQUEST,
  GET_INNOVATION_SUCCESS,
  GET_INNOVATION_FAIL
 } from "../Constants/InnovationView"

function InnovationviewReducer(state = { }, action) {
  switch (action.type) {
    case GET_INNOVATION_REQUEST:
        return {...state, loading: true}
    case GET_INNOVATION_SUCCESS:
        return {...state, ...action.payload}
    case GET_INNOVATION_FAIL:
        return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}
export { InnovationviewReducer }