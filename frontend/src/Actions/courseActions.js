import axios from 'axios'

import { COURSE_GROUP_FAIL, 
  COURSE_GROUP_SUCCESS, 
  COURSE_GROUP_REQUEST,
  COURSE_GROUP_LIST_REQUEST,
  COURSE_GROUP_LIST_SUCCESS,
  COURSE_GROUP_LIST_FAIL } from "../Constants/courseConstants"

export const courseGroups = () => async (dispatch) => {
  try {
    dispatch({
      type: COURSE_GROUP_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(
      '/api/course/group/',
      config
    )

    dispatch({
      type: COURSE_GROUP_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: COURSE_GROUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
          
    })
  }

}

export const courseGroupsList = () => async (dispatch) => {
  dispatch({
    type: COURSE_GROUP_LIST_REQUEST,
  })

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  await axios.get(
    '/api/course/group/courseList',
    config
  )
  .then(res => {
    dispatch({
      type: COURSE_GROUP_LIST_SUCCESS,
      payload: res.data,
    })
  })
  .catch(error => {
    dispatch({
      type: COURSE_GROUP_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
          
    })
  })
}

export const courseActiveGroupsList = async () => {

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const data = await axios.get(
    '/api/course/group/courseList',
    config
  )
  .then(res => res.data)
  .catch(error => [])

  return data
}

