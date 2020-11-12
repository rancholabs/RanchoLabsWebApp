import { DEFAULT, FOOTER } from "../Constants/Footer";

const updateFooter = (data) => (dispatch) => {
  dispatch({ type: FOOTER, payload: data })
}

const setDefaultFooter = () => (dispatch) => {
  dispatch({type: DEFAULT})
}

export { updateFooter, setDefaultFooter }