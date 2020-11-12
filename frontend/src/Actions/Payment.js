import { COURSE, BATCH } from "../Constants/Payment";
import axios from 'axios'

const setCourseDetails = (data) => (dispatch) => {
  dispatch({ type: COURSE, payload: data })
}

const setBatchDetails = (data) => (dispatch) => {
    dispatch({ type: BATCH, payload: data })
}

const getPaymentOrder = async (price) => {
  const userInfo = localStorage.getItem('userInfo')
  const token = userInfo ? JSON.parse(userInfo).token : ''
  const data = await axios.post("/api/payment/order",
  {
    price
  },
  {
    headers: {
      'Content-Type': 'application/json',
      'authorization': token
    },
  })
  .then(res => res.data)
  .catch(err => {
    console.log(err)
    return null
  })
  return data
}

export { setCourseDetails, setBatchDetails, getPaymentOrder }