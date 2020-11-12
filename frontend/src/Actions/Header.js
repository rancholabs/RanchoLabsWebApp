import { DEFAULT, HEADER } from "../Constants/Header";

const updateHeader = (data) => (dispatch) => {
  dispatch({ type: HEADER, payload: data })
}

const setDefaultHeader = () => (dispatch) => {
  dispatch({type: DEFAULT})
}

export { updateHeader, setDefaultHeader }