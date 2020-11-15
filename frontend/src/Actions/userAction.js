import axios from 'axios'
import { USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS, 
  USER_LOGIN_FAIL, 
  USER_REGISTER_REQUEST, 
  USER_REGISTER_SUCCESS, 
  USER_REGISTER_FAIL,
  USER_ERROR_RESET, 
  USER_WORKSHOP_REGISTER_SUCCESS, 
  USER_WORKSHOP_REGISTER_REQUEST, 
  USER_WORKSHOP_REGISTER_FAIL, 
  USER_SETPASSWORD_REQUEST, 
  USER_SETPASSWORD_SUCCESS, 
  USER_SETPASSWORD_FAIL,
  USER_FORGOTPASSWORD_REQUEST, 
  USER_FORGOTPASSWORD_SUCCESS, 
  USER_FORGOTPASSWORD_FAIL,
  USER_LOGOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_VALIDATE_REQUEST,
  USER_VALIDATE_SUCCESS,
  USER_VALIDATE_FAIL,
  USER_MESSAGE_REQUEST,	
  USER_MESSAGE_FAIL,	
  USER_MESSAGE_SUCCESS,	
  USER_CALLBACK_FAIL,	
  USER_CALLBACK_SUCCESS,	
  USER_CALLBACK_REQUEST

 } from "../Constants/userConstant"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        await axios.post('/api/login', { email, password }, config)
        .then(res => {
          localStorage.setItem('userInfo', JSON.stringify(res.data))
          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: res.data
          })
        })
        .catch(error => {
          dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data
                ? error.response.data : error
          })
        })
    }
    catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data
                ? error.response.data : error
        })
    }
}

export const loginFacebook = (email, token) => async (dispatch) => {
  try {
      dispatch({
          type: USER_LOGIN_REQUEST
      })

      const config = {
          header: {
              'Content-Type': 'application/json'
          }
      }

      await axios.post('/api/login/facebook', { email, token }, config)
      .then(res => {
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: res.data
        })
      })
      .catch(error => {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: error.response && error.response.data
              ? error.response.data : error
        })
      })
  }
  catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data
          ? error.response.data : error
    })
  }
}

export const loginGoogle = (token) => async (dispatch) => {
  try {
      dispatch({
          type: USER_LOGIN_REQUEST
      })

      const config = {
          header: {
              'Content-Type': 'application/json'
          }
      }

      await axios.post('/api/login/google', { token }, config)
      .then(res => {
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: res.data
        })
      })
      .catch(error => {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: error.response && error.response.data
              ? error.response.data : error
        })
      })
  }
  catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data
          ? error.response.data : error
    })
  }
}

export const register = (name, email, password='') => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      } 
  
      await axios.post(
        '/api/register',
        { name, email, password },
        config
      )
      .then(res => {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: res.data
        })
      })

    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? {message: error.response.data.message, emailExists: error.response.data.emailExists} : {message: error.message, emailExists: error.emailExists}
      })
    }
}

export const registerGoogle = (token) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await axios.post(
      '/api/register/google',
      { token },
      config
    )
    .then(res => {
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: res.data
      })
    })

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? {message: error.response.data.message, emailExists: error.response.data.emailExists} : {message: error.message, emailExists: error.emailExists}
    })
  }
}

export const registerFacebook = (email, token) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await axios.post(
      '/api/register/facebook',
      { email, token },
      config
    )
    .then(res => {
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: res.data
      })
    })

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? {message: error.response.data.message, emailExists: error.response.data.emailExists} : {message: error.message, emailExists: error.emailExists}
    })
  }
}


export const update = (updateInfo) => async (dispatch, getState) => {

  console.log('updateAction')
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    })

    const { userLogin : { userInfo } }  = getState()

    console.log(userInfo)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'authorization' : userInfo.token
      },
    }

    const { data } = await axios.patch(
      '/api/user/updateUser',
      updateInfo,
      config
    )

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    })

    alert('Profile Updated!')

    // localStorage.setItem('userUpdate', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const workshop_register = (location, email, grade) => async (dispatch) => {
  try {
    dispatch({
      type: USER_WORKSHOP_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    axios.post(
      '/api/workshop/free/register',
      { location, email, grade },
      config
    )
    .then(res => {
      localStorage.setItem('userInfo', JSON.stringify(res.data))
      dispatch({
        type: USER_WORKSHOP_REGISTER_SUCCESS,
        payload: res.data,
      })
    })
    .catch(error => {
      dispatch({
        type: USER_WORKSHOP_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
            
      })
    })

  } catch (error) {
    dispatch({
      type: USER_WORKSHOP_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
          
    })
  }
}

export const logout = (displayAlert = true) => (dispatch ) => {
  localStorage.removeItem('userInfo')
  if(displayAlert)
    alert('Logged out successfully')
  dispatch({ type: USER_LOGOUT })
}

export const setUserPassword = (password, reset = false) => async ( dispatch, getState) => {
  try {
    dispatch({
      type: USER_SETPASSWORD_REQUEST,
    })

    const userInfo = localStorage.getItem('userInfo')
    const token = userInfo ? JSON.parse(userInfo).token : ''
    const { userRegister : { userInfo: regUserInfo } }  = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'authorization' : reset ? token : regUserInfo.token
      },
    }

    await axios.patch(
      `/api/user/${!reset ? 'setPassword' : 'changePassword'}`,
      { password },
      config
    )
    .then(res => {
      dispatch({
        type: USER_SETPASSWORD_SUCCESS,
        payload: res.data,
      })
      if(reset) {
        alert('Your account password has been changed successfully. Please login again to continue.')
      }
      console.log(regUserInfo)
      dispatch({
        type : USER_LOGIN_SUCCESS,
        payload : regUserInfo
      })
    })
    .catch(error => {
      dispatch({
        type: USER_SETPASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    })

  } catch (error) {
    dispatch({
      type: USER_SETPASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const UserForgotPassword = (email) => async ( dispatch) => {
  try {
    dispatch({
      type: USER_FORGOTPASSWORD_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
    }

    await axios.post(
      '/api/forgotPassword',
      { email },
      config
    )
    .then(res => {
      dispatch({
        type: USER_FORGOTPASSWORD_SUCCESS,
        payload: res.data,
      })
    })
    .catch(error => {
      dispatch({
        type: USER_FORGOTPASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    })

  } catch (error) {
    dispatch({
      type: USER_FORGOTPASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const validateToken = (token) => async ( dispatch) => {
  try {
    dispatch({
      type: USER_VALIDATE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
    }

    await axios.post(
      '/api/validateToken',
      { },
      config
    )
    .then(res => {
      localStorage.setItem('userInfo', JSON.stringify(res.data))
      dispatch({
        type: USER_VALIDATE_SUCCESS,
        payload: res.data,
      })
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: res.data,
      })
    })
    .catch(error => {
      dispatch({
        type: USER_VALIDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    })

  } catch (error) {
    dispatch({
      type: USER_VALIDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUserInfo = (userInfo) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN_SUCCESS,
    payload: userInfo,
  })
}

export const resetError = () => async (dispatch) => {
  dispatch({
    type: USER_ERROR_RESET
  })
}

export const sendMessage = (senderName, senderMail, message) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_MESSAGE_REQUEST,
    })

    const { userLogin : { userInfo } }  = getState()
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `/api/about/message`,
      { senderMail, senderName, message },
      config
    )

    dispatch({
      type: USER_MESSAGE_SUCCESS,
      payload: data,
    })

    if(userInfo.role === 'instructor')
    {
      alert('Message sent!')
    }

  } catch (error) {
    dispatch({
      type: USER_MESSAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const callbackRequest = (senderName, senderContact) => async (dispatch) => {
  try {
    dispatch({
      type: USER_CALLBACK_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `/api/about/callback`,
      { senderName, senderContact },
      config
    )

    dispatch({
      type: USER_CALLBACK_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: USER_CALLBACK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}