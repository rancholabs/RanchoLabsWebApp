import {
    GET_PROFILE_FAIL,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_REQUEST,
    ENABLE_PROFILE_EDITING,
    SET_IS_SHARE_OPEN
 } from "../Constants/StudentProfile"

import { USER_LOGOUT } from "../Constants/userConstant"

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

const enableEditing = (isEnabled) => (dispatch) => {
    dispatch({type: ENABLE_PROFILE_EDITING, payload: isEnabled})
}

const setIsShareOpen = (data) => (dispatch) => {
    dispatch({type: SET_IS_SHARE_OPEN, payload: data})
}

const getProfile = (profileId) => async (dispatch) => {

    dispatch({type: GET_PROFILE_REQUEST})

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let path = '/api/profile/student'

    if(profileId) {
        path += `/${profileId}`
    }
    else {
        const userInfo = localStorage.getItem('userInfo')
        const token = userInfo ? JSON.parse(userInfo).token : ''
        config.headers['authorization'] = token
    }

    await axios.get(path, config)
    .then(res => {
        dispatch({
            type: GET_PROFILE_SUCCESS,
            payload: res.data
        })
    })
    .catch(error => {
        if(error.response && error.response.status === 403) {
            dispatch({type: USER_LOGOUT})
        }
        dispatch({
            type: GET_PROFILE_FAIL,
            payload: error.response && error.response.data
                ? error.response.data : error
        })
    })
}

const updateProfile = (data) => async (dispatch) => {
    const userInfo = localStorage.getItem('userInfo')
    const token = userInfo ? JSON.parse(userInfo).token : ''

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    }

    await axios.post('/api/profile/student/profile', data, config)
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.log(error)
    })
}

const updateProfilePic = (profilePic) => async (dispatch) => {
    const userInfo = localStorage.getItem('userInfo')
    const token = userInfo ? JSON.parse(userInfo).token : ''

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    }

    if(profilePic._id) {
        profilePic = profilePic._id
    }
    else {
        const res = await uploadFile(profilePic, token)
        profilePic = !res.message ? res : undefined
    }

    await axios.post('/api/profile/student/profile', {profilePic}, config)
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.log(error)
    })
}

const updateAboutMe = (data) => async (dispatch) => {
    const userInfo = localStorage.getItem('userInfo')
    const token = userInfo ? JSON.parse(userInfo).token : ''

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    }

    await axios.post('/api/profile/student/academic', data, config)
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.log(error)
    })
}

const updateExtracurricular = (data) => async (dispatch) => {
    const userInfo = localStorage.getItem('userInfo')
    const token = userInfo ? JSON.parse(userInfo).token : ''

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    }

    await axios.post('/api/profile/student/extracurriculars', data, config)
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.log(error)
    })
}

const updateSkills = (data) => async (dispatch) => {
    const userInfo = localStorage.getItem('userInfo')
    const token = userInfo ? JSON.parse(userInfo).token : ''

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    }

    await axios.post('/api/profile/student/skills', data, config)
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.log(error)
    })
}

const updateProjects = (id, isEnabled) => async (dispatch) => {
    const userInfo = localStorage.getItem('userInfo')
    const token = userInfo ? JSON.parse(userInfo).token : ''

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    }
    if(isEnabled !== undefined) {
        const data = {isEnabled: isEnabled}
        await axios.put(`/api/profile/student/projects/${id}/isEnabled`, data, config)
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.log(error)
        })
    }
    else {
        await axios.delete(`/api/profile/student/projects/${id}`, config)
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.log(error)
        })
    }
}

const updateInnovations = (id, isEnabled) => async (dispatch) => {
    const userInfo = localStorage.getItem('userInfo')
    const token = userInfo ? JSON.parse(userInfo).token : ''

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    }
    if(isEnabled !== undefined) {
        const data = {isEnabled: isEnabled}
        await axios.put(`/api/profile/student/innovations/${id}/isEnabled`, data, config)
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.log(error)
        })
    }
    else {
        await axios.delete(`/api/profile/student/innovations/${id}`, config)
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.log(error)
        })
    }
}

const updateCourses = (data) => async (dispatch) => {
    const userInfo = localStorage.getItem('userInfo')
    const token = userInfo ? JSON.parse(userInfo).token : ''

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    }

    await axios.post('/api/profile/student/courses', data, config)
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.log(error)
    })
}

const updateCertificates = (data) => async (dispatch) => {
    const userInfo = localStorage.getItem('userInfo')
    const token = userInfo ? JSON.parse(userInfo).token : ''

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    }

    const newData = await Promise.all([...data].map(async d => {
        const d_n = {...d}
        if(d_n.file) {
            console.log(d_n.file)
            if(d_n.file._id) {
                d_n.file = d_n.file._id
            }
            else {
                const res = await uploadFile(d_n.file, token)
                d_n.file = !res.message ? res : undefined
            }
        }
        return d_n
    }))

    await axios.post('/api/profile/student/certificates', newData, config)
    .then(res => {
        console.log(newData, res.data)
    })
    .catch(error => {
        console.log(error)
    })
}

export {
    getProfile, enableEditing, setIsShareOpen, updateProfile, 
    updateProfilePic, updateAboutMe, updateExtracurricular, updateSkills,
    updateProjects, updateInnovations, updateCourses, updateCertificates
}