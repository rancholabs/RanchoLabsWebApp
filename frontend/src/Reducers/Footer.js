import { FOOTER, DEFAULT } from "../Constants/Footer"
const initialState = {FooterDispay:'block' }

function FooterReducer(state = { FooterDispay:'block' }, action) {
  switch (action.type) {
    case FOOTER:
      return { ...state, ...action.payload }
    case DEFAULT:
      return initialState
    default:
      return state
  }
}
export { FooterReducer }