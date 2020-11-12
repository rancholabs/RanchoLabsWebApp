import { HEADER, DEFAULT } from "../Constants/Header"
const initialState = { backgroundColor: '#020122', color: '#FFFFFF', iconColor: '#3CFAFF', iconDisplay:'block', headerDispay:'block' }

function HeaderReducer(state = { backgroundColor: '#020122', color: '#FFFFFF', iconColor: '#3CFAFF', iconDisplay:'block', headerDispay:'block' }, action) {
  switch (action.type) {
    case HEADER:
      return { ...state, ...action.payload }
    case DEFAULT:
      return initialState
    default:
      return state
  }
}
export { HeaderReducer }