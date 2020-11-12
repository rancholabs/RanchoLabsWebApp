import axios from 'axios'
import { 
    DASHBOARD_REQUEST, 
    DASHBOARD_SUCCESS, 
    DASHBOARD_FAIL, 
    DASHBOARD_ACTIVECOURSE_SUCCESS,
    JOURNEY_COURSE,
} from '../Constants/dashboardConstants'
import { INSTRUCTOR_BATCH_SUCCESS } from '../Constants/Instructor'

export const dashboard = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: DASHBOARD_REQUEST
        })

        const { userLogin : { userInfo } }  = getState()

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                authorization: userInfo.token
            }
        }

        const ddata = await axios.get('/api/course/dashboard', config)

        dispatch({
            type: DASHBOARD_SUCCESS,
            payload: ddata.data
        })

    }
    catch (error) {
        const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Unauthorized') {
        dispatch('logout')
    }
    dispatch({
        type: DASHBOARD_FAIL,
        payload: message
    })
    }
}

export const activeCourseGroup = (cid) => (dispatch) => {
    dispatch({ type: DASHBOARD_ACTIVECOURSE_SUCCESS, payload: cid })
}

export const journeycourse = (course) => (dispatch) => {
    dispatch({type : JOURNEY_COURSE, payload: course})
}

