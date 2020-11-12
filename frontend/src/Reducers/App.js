import { APP_UPDATE_NAME, APP_UPDATE_AUTHOR, APP_UPDATE_LOCATION, APP_UPDATE_IPAD_MINI_MOBILE_VIEW } from "../Constants/App"

function AppReducer(state = { appName: '', priceUnit: '', isIPadMiniMobileView: false }, action) {
  switch (action.type) {
    case APP_UPDATE_NAME:
      return { ...state, appName: action.payload }
    case APP_UPDATE_AUTHOR:
      return {...state, author: action.payload}
    case APP_UPDATE_LOCATION:
        return {...state, location: action.payload}
    case APP_UPDATE_IPAD_MINI_MOBILE_VIEW:
        return {...state, isIPadMiniMobileView: action.payload}
    default:
      return state
  }
}

export { AppReducer }