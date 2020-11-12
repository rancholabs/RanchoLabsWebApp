import { COURSE, BATCH } from "../Constants/Payment"

function PaymentReducer(state = { courseId: '', batchId: '', coursePrice: null }, action) {
  switch (action.type) {
    case COURSE:
      return { ...state, ...action.payload }
    case BATCH:
        return { ...state, ...action.payload }
    default:
      return state
  }
}
export { PaymentReducer }