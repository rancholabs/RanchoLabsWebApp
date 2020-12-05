import { ADD_PREVIEW_OPEN_HANDLER,
    ADD_UPLOAD_HANDLER,
    FORM_UPLOADED_HANDLER,
    UPDATE_PREVIEW_SAVE_HANDLER,
    UPDATE_PREVIEW_HEADER, 
    UPDATE_PREVIEW_BRIEF, 
    UPDATE_PREVIEW_COMPONENTS,
    UPDATE_PREVIEW_STEPS,
    UPDATE_PREVIEW_CONCLUSION,
    UPDATE_INNOVATION_FAIL,	
    UPDATE_INNOVATION_SUCCESS,	
    UPDATE_INNOVATION_REQUEST,
    GET_INNOVATION_FAIL,
    GET_INNOVATION_SUCCESS,
    GET_INNOVATION_REQUEST
 } from "../Constants/InnovationPreview"

import axios from 'axios'

const uploadFile = async(file, token) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'authorization' : token
        }
    }
    const formData = new FormData()
    formData.append('files', file)
    return await axios.post('/api/file', formData, config)
    .then(res => res.data.fileId)
    .catch(error => ({message: 'Error'}))
}

const UpdateInnovation = async (data, attr, dispatch, getState) => {
    dispatch({type: UPDATE_INNOVATION_REQUEST})
    console.log(attr, data)

    const userInfo = localStorage.getItem('userInfo')
    const token = userInfo ? JSON.parse(userInfo).token : ''

    if(Array.isArray(data)) {
        data = await Promise.all(data.map(async d => {
            if(d.image) {
                if(d.image._id) {
                    d.image = d.image._id
                }
                else {
                    const res = await uploadFile(d.image, token)
                    d.image = !res.message ? res : undefined
                }
            }
            return d
        }))
    }
    else {
        if(data.image) {
            if(data.image._id) {
                data.image = data.image._id
            }
            else {
                const res = await uploadFile(data.image, token)
                data.image = !res.message ? res : undefined
            }
        }
    
        if(data.video) {
            if(data.video._id) {
                data.video = data.video._id
            }
            else {
                const res = await uploadFile(data.video, token)
                data.video = !res.message ? res : undefined
            }
        }
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization' : token
        }
    }

    const { innovationPreview : { innovationId } }  = getState()
    if(innovationId) {
        await axios.put(`/api/profile/student/innovations/${innovationId}/${attr}`, data, config)
        .then(async res => {
            dispatch({
                type: UPDATE_INNOVATION_SUCCESS,
                payload: res.data.innovationId
            })
            dispatch({
                type: GET_INNOVATION_REQUEST,
                payload: res.data.innovationId
            })
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
        })
        .catch(error => {
            dispatch({
                type: UPDATE_INNOVATION_FAIL,
                payload: error.response && error.response.data
                    ? error.response.data : error
            })
        })
    }
    else {
        await axios.post('/api/profile/student/innovations', {[attr]: data}, config)
        .then(async res => {
            dispatch({
                type: UPDATE_INNOVATION_SUCCESS,
                payload: res.data.innovationId
            })
            await axios.get(`/api/profile/student/innovations/${res.data.innovationId}`, config)
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
        })
        .catch(error => {
            dispatch({
                type: UPDATE_INNOVATION_FAIL,
                payload: error.response && error.response.data
                    ? error.response.data : error
            })
        })
    }
}

const AddPreviewOpenHandler = (data) => (dispatch) => {
  dispatch({ type: ADD_PREVIEW_OPEN_HANDLER, payload: data });
}

const AddUploadHandler = (data) => (dispatch) => {
    dispatch({ type: ADD_UPLOAD_HANDLER, payload: data });
}

const FormUploadedHandler = (data) => (dispatch) => {
    dispatch({ type: FORM_UPLOADED_HANDLER, payload: data });
}

const UpdatePreviewSaveHandler = (data) => (dispatch) => {
    dispatch({ type: UPDATE_PREVIEW_SAVE_HANDLER, payload: data });
  }

const UpdatePreviewHeader = (data) => (dispatch, getState) => {
    UpdateInnovation(data, 'header', dispatch, getState)
    dispatch({ type: UPDATE_PREVIEW_HEADER, payload: data });
}

const UpdatePreviewBrief = (data) => (dispatch, getState) => {
    UpdateInnovation({brief: data}, 'brief', dispatch, getState)
    dispatch({ type: UPDATE_PREVIEW_BRIEF, payload: data });
}

const UpdatePreviewComponents = (data) => (dispatch, getState) => {
    UpdateInnovation(data, 'components', dispatch, getState)
    dispatch({ type: UPDATE_PREVIEW_COMPONENTS, payload: data });
}

const UpdatePreviewSteps = (data) => (dispatch, getState) => {
    UpdateInnovation(data, 'steps', dispatch, getState)
    dispatch({ type: UPDATE_PREVIEW_STEPS, payload: data });
}

const UpdatePreviewConclusion = (data) => (dispatch, getState) => {
    UpdateInnovation(data, 'conclusion', dispatch, getState)
    dispatch({ type: UPDATE_PREVIEW_CONCLUSION, payload: data });
}

const UploadInnovation = () => (dispatch, getState) => {
    dispatch({type: FORM_UPLOADED_HANDLER, payload: true})
    UpdateInnovation({isUploaded: true}, 'isUploaded', dispatch, getState)
}

const GetInnovation = (innovationId) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    
    await axios.get(`/api/profile/student/innovations/${innovationId}`, config)
    .then(res => {
        dispatch({
            type: GET_INNOVATION_SUCCESS,
            payload: res.data
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

export { 
    AddPreviewOpenHandler,
    FormUploadedHandler,
    UpdatePreviewSaveHandler,
    AddUploadHandler,
    UpdatePreviewHeader,
    UpdatePreviewBrief,
    UpdatePreviewComponents,
    UpdatePreviewSteps,
    UpdatePreviewConclusion,
    UploadInnovation,
    GetInnovation
}