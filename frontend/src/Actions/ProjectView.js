import {
    GET_PROJECT_FAIL,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_REQUEST
 } from "../Constants/ProjectView"

import axios from 'axios'

const getProject = (projectId) => async (dispatch) => {

    dispatch({type: GET_PROJECT_REQUEST})
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await axios.get(`/api/profile/student/projects/${projectId}`, config)
    .then(res2 => {
        dispatch({
            type: GET_PROJECT_SUCCESS,
            payload: res2.data
        })
    })
    .catch(error => {
        dispatch({
            type: GET_PROJECT_FAIL,
            payload: error.response && error.response.data
                ? error.response.data : error
        })
    })
}

export {getProject}