import { ADD_PREVIEW_OPEN_HANDLER,
    ADD_UPLOAD_HANDLER,
    FORM_UPLOADED_HANDLER,
    UPDATE_PREVIEW_SAVE_HANDLER,
    UPDATE_PREVIEW_HEADER, 
    UPDATE_PREVIEW_BRIEF, 
    UPDATE_PREVIEW_COMPONENTS,
    UPDATE_PREVIEW_STEPS,
    UPDATE_PREVIEW_CONCLUSION,
    UPDATE_INNOVATION_REQUEST,
    UPDATE_INNOVATION_SUCCESS,
    UPDATE_INNOVATION_FAIL,
    GET_INNOVATION_REQUEST,
    GET_INNOVATION_SUCCESS,
    GET_INNOVATION_FAIL,
    RESET_INNOVATION
 } from "../Constants/InnovationPreview"

function InnovationPreviewReducer(state = { isFormUploaded: false, innovationId: '', previewOpenHandler: () => {} }, action) {
  switch (action.type) {
    case ADD_PREVIEW_OPEN_HANDLER:
      return { ...state, previewOpenHandler: action.payload }
    case ADD_UPLOAD_HANDLER:
        return {...state, innovationUploadHandler: action.payload}
    case FORM_UPLOADED_HANDLER:
        return {...state, isFormUploaded: action.payload}
    case UPDATE_PREVIEW_SAVE_HANDLER:
        return { ...state, previewSaveHandler: action.payload }
    case UPDATE_PREVIEW_HEADER:
        return { ...state, header: action.payload }
    case UPDATE_PREVIEW_BRIEF:
        return { ...state, brief: action.payload }
    case UPDATE_PREVIEW_COMPONENTS:
        return { ...state, components: action.payload }
    case UPDATE_PREVIEW_STEPS:
        return { ...state, steps: action.payload }
    case UPDATE_PREVIEW_CONCLUSION:
        return { ...state, conclusion: action.payload }
    case UPDATE_PREVIEW_CONCLUSION:
        return { ...state, conclusion: action.payload }
    case UPDATE_INNOVATION_REQUEST:
        return {...state, loading: true}
    case UPDATE_INNOVATION_SUCCESS:
        if(action.payload)
            return {...state, loading: false, innovationId: action.payload}
        else
            return {...state, loading: false}
    case UPDATE_INNOVATION_FAIL:
        return {...state, loading: false, error: action.payload}
    case GET_INNOVATION_REQUEST:
        return {...state, loading: true}
    case GET_INNOVATION_SUCCESS:
        return {...state, ...action.payload, innovationId: action.payload._id}
    case GET_INNOVATION_FAIL:
        return {...state, loading: false, error: action.payload}
    case RESET_INNOVATION:
        return { isFormUploaded: false, innovationId: '', previewOpenHandler: () => {}}
    default:
      return state
  }
}
export { InnovationPreviewReducer }