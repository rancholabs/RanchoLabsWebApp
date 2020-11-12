import { APP_UPDATE_NAME, APP_UPDATE_AUTHOR, APP_UPDATE_LOCATION, APP_UPDATE_IPAD_MINI_MOBILE_VIEW } from "../Constants/App";

const updateAppName = (data) => (dispatch) => {
  dispatch({ type: APP_UPDATE_NAME, payload: data });
}

const updateAuthor = (data) => (dispatch) => {
  dispatch({ type: APP_UPDATE_AUTHOR, payload: data });
}

const updateLocation = (data) => (dispatch) => {
  dispatch({ type: APP_UPDATE_LOCATION, payload: data });
}

const setIsIpadMiniMobileView = (data) => (dispatch) => {
  dispatch({ type: APP_UPDATE_IPAD_MINI_MOBILE_VIEW, payload: data });
}

export { updateAppName, updateAuthor, updateLocation, setIsIpadMiniMobileView }