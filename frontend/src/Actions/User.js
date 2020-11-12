import Axios from "axios";
import Cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_REGISTER_FINISH,
  USER_MESSAGE_REQUEST,
  USER_MESSAGE_FAIL,
  USER_MESSAGE_SUCCESS,
  USER_CALLBACK_FAIL,
  USER_CALLBACK_SUCCESS,
  USER_CALLBACK_REQUEST} from "../Constants/User";

const update = ({ name, email }) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { name, email } });
  try {
    const { data } = await Axios.put("/api/user/",
      { name, email }, {
      headers: {
        Authorization: '' + userInfo.token
      }
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
}

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/login", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
}

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await Axios.post("/api/register", { name, email, password });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
}

const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT })
}
const registerFinished = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_REGISTER_FINISH })
}
export { signin, register, logout, registerFinished, update };


export const sendMessage = (senderName, senderMail, message) => async (dispatch) => {
  try {
    dispatch({
      type: USER_MESSAGE_REQUEST,
    })

    
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