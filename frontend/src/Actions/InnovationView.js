import {
    GET_INNOVATION_FAIL,
    GET_INNOVATION_SUCCESS,
    GET_INNOVATION_REQUEST
 } from "../Constants/InnovationView"

import axios from 'axios'

const getInnovation = (innovationId) => async (dispatch) => {

    dispatch({type: GET_INNOVATION_REQUEST})
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await axios.get(`/api/profile/student/innovations/${innovationId}`, config)
    .then(res2 => {
        dispatch({
            type: GET_INNOVATION_SUCCESS,
            payload: res2.data
        })
    })
    .catch(error => {
        dispatch({
            type: GET_INNOVATION_FAIL,
            payload: error.response && error.response.data
                ? error.response.data : error
        })
    })
}

export {getInnovation}