import { ADD_PREVIEW_OPEN_HANDLER,
    ADD_UPLOAD_HANDLER,
    FORM_UPLOADED_HANDLER,
    UPDATE_PREVIEW_SAVE_HANDLER,
    UPDATE_PREVIEW_HEADER, 
    UPDATE_PREVIEW_BRIEF, 
    UPDATE_PREVIEW_COMPONENTS,
    UPDATE_PREVIEW_STEPS,
    UPDATE_PREVIEW_CONCLUSION,
    UPDATE_PROJECT_FAIL,	
    UPDATE_PROJECT_SUCCESS,	
    UPDATE_PROJECT_REQUEST,
    GET_PROJECT_FAIL,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_REQUEST,
    RESET_PROJECT
 } from "../Constants/ProjectPreview"

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

const UpdateProject = async (data, attr, dispatch, getState) => {
    dispatch({type: UPDATE_PROJECT_REQUEST})
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

    const { projectPreview : { projectId } }  = getState()
    console.log(attr, data)
    if(projectId) {
        await axios.put(`/api/profile/student/projects/${projectId}/${attr}`, data, config)
        .then(async res => {
            dispatch({
                type: UPDATE_PROJECT_SUCCESS,
                payload: res.data.projectId
            })
            dispatch({
                type: GET_PROJECT_REQUEST,
                payload: res.data.projectId
            })
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
        })
        .catch(error => {
            dispatch({
                type: UPDATE_PROJECT_FAIL,
                payload: error.response && error.response.data
                    ? error.response.data : error
            })
        })
    }
    else {
        await axios.post('/api/profile/student/projects', {[attr]: data}, config)
        .then(async res => {
            dispatch({
                type: UPDATE_PROJECT_SUCCESS,
                payload: res.data.projectId
            })
            await axios.get(`/api/profile/student/projects/${res.data.projectId}`, config)
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
        })
        .catch(error => {
            dispatch({
                type: UPDATE_PROJECT_FAIL,
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
    UpdateProject(data, 'header', dispatch, getState)
    dispatch({ type: UPDATE_PREVIEW_HEADER, payload: data });
}

const UpdatePreviewBrief = (data) => (dispatch, getState) => {
    UpdateProject({brief: data}, 'brief', dispatch, getState)
    dispatch({ type: UPDATE_PREVIEW_BRIEF, payload: data });
}

const UpdatePreviewComponents = (data) => (dispatch, getState) => {
    UpdateProject(data, 'components', dispatch, getState)
    dispatch({ type: UPDATE_PREVIEW_COMPONENTS, payload: data });
}

const UpdatePreviewSteps = (data) => (dispatch, getState) => {
    UpdateProject(data, 'steps', dispatch, getState)
    dispatch({ type: UPDATE_PREVIEW_STEPS, payload: data });
}

const UpdatePreviewConclusion = (data) => (dispatch, getState) => {
    UpdateProject(data, 'conclusion', dispatch, getState)
    dispatch({ type: UPDATE_PREVIEW_CONCLUSION, payload: data });
}

const UploadProject = () => (dispatch, getState) => {
    dispatch({type: FORM_UPLOADED_HANDLER, payload: true})
    UpdateProject({isUploaded: true}, 'isUploaded', dispatch, getState)
}

const GetProject = (projectId) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    await axios.get(`/api/profile/student/projects/${projectId}`, config)
    .then(res => {
        dispatch({
            type: GET_PROJECT_SUCCESS,
            payload: res.data
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

const ResetProject = () => (dispatch) => {
    dispatch({type: RESET_PROJECT})
}

export { 
    AddPreviewOpenHandler,
    UpdatePreviewSaveHandler,
    AddUploadHandler,
    FormUploadedHandler,
    UpdatePreviewHeader,
    UpdatePreviewBrief,
    UpdatePreviewComponents,
    UpdatePreviewSteps,
    UpdatePreviewConclusion,
    UploadProject,
    GetProject,
    ResetProject
}