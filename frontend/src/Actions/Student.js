import { USER_COURSES_REQUEST, 
    USER_COURSES_SUCCESS, 
    USER_COURSES_FAIL,
    STUDENT_UPDATE_REQUEST,
    STUDENT_UPDATE_SUCCESS,
    STUDENT_UPDATE_FAIL,
    STUDENT_INFO_REQUEST,
    STUDENT_INFO_SUCCESS,
    STUDENT_INFO_FAIL,
    STUDENT_FREEENROLL_REQUEST,
    STUDENT_FREEENROLL_SUCCESS,
    STUDENT_FREEENROLL_FAIL} from '../Constants/Student'

import axios from 'axios'
import { update } from './userAction'

const updateStudent = (updates) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STUDENT_UPDATE_REQUEST,
    })

    const { userRegister : { userInfo } }  = getState()

    console.log(userInfo)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'authorization' : userInfo.token
      },
    }

    const { data } = await axios.post(
      '/api/student',
      updates,
      config
    )

    dispatch({
      type: STUDENT_UPDATE_SUCCESS,
      payload: data,
    })


  } catch (error) {
    dispatch({
      type: STUDENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const updateStudentFreeEnroll = (updates) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STUDENT_FREEENROLL_REQUEST,
    })

    const { userLogin : { userInfo } }  = getState()

    console.log(userInfo)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'authorization' : userInfo.token
      },
    }

    const { data } = await axios.post(
      '/api/student',
      updates,
      config
    )

    dispatch({
      type: STUDENT_FREEENROLL_SUCCESS,
      payload: data,
    })


  } catch (error) {
    dispatch({
      type: STUDENT_FREEENROLL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const getStudent = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: STUDENT_INFO_REQUEST,
    })

    const { userLogin : { userInfo } }  = getState()

    console.log(userInfo)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'authorization' : userInfo.token
      },
    }

    const { data } = await axios.get(
      '/api/student',
      config
    )

    dispatch({
      type: STUDENT_INFO_SUCCESS,
      payload: data,
    })

    // localStorage.setItem('userUpdate', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: STUDENT_INFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const getStudentCourses = () => async (dispatch) => {
    dispatch({type: USER_COURSES_REQUEST})
    const userInfo = localStorage.getItem('userInfo')
    const token = userInfo ? JSON.parse(userInfo).token : ''
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        },
      }
      await axios.get(
        '/api/course/enroll',
        config
      )
      .then(courses => {
        dispatch({
          type: USER_COURSES_SUCCESS,
          payload: courses.data,
        })
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: USER_COURSES_FAIL,
          payload: err,
        })
      })
}

const enrollCourse = async (courseId, batchId, order) => {
  const userInfo = localStorage.getItem('userInfo')
  const token = userInfo ? JSON.parse(userInfo).token : ''
  const resData = await axios.post('/api/course/enroll', 
  {
    courseId: courseId,
    batchId: batchId,
    payment: {
      paymentId: order.razorpay_payment_id,
      orderId: order.razorpay_order_id,
      signature: order.razorpay_signature
    }
  },
  {
    headers: {
      'Content-Type': 'application/json',
      'authorization': token
    },
  })
  .then((res) => res.data)
  .catch(err => {
    console.log(err)
    return null
  })
  return resData
}

export {getStudentCourses, enrollCourse, updateStudent, getStudent, updateStudentFreeEnroll}