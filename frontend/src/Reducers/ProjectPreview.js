import { ADD_PREVIEW_OPEN_HANDLER,
    ADD_UPLOAD_HANDLER,
    FORM_UPLOADED_HANDLER,
    UPDATE_PREVIEW_SAVE_HANDLER,
    UPDATE_PREVIEW_HEADER, 
    UPDATE_PREVIEW_BRIEF, 
    UPDATE_PREVIEW_COMPONENTS,
    UPDATE_PREVIEW_STEPS,
    UPDATE_PREVIEW_CONCLUSION,
    UPDATE_PROJECT_REQUEST,
    UPDATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_FAIL,
    GET_PROJECT_REQUEST,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_FAIL
 } from "../Constants/ProjectPreview"

function ProjectPreviewReducer(state = { isFormUploaded: false, projectId: '', previewOpenHandler: () => {} }, action) {
  switch (action.type) {
    case ADD_PREVIEW_OPEN_HANDLER:
      return { ...state, previewOpenHandler: action.payload }
    case ADD_UPLOAD_HANDLER:
        return {...state, projectUploadHandler: action.payload}
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
    case UPDATE_PROJECT_REQUEST:
        return {...state, loading: true}
    case UPDATE_PROJECT_SUCCESS:
        if(action.payload)
            return {...state, loading: false, projectId: action.payload}
        else
            return {...state, loading: false}
    case UPDATE_PROJECT_FAIL:
        return {...state, loading: false, error: action.payload}
    case GET_PROJECT_REQUEST:
        return {...state, loading: true}
    case GET_PROJECT_SUCCESS:
        return {...state, ...action.payload, projectId: action.payload._id}
    case GET_PROJECT_FAIL:
        return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}
export { ProjectPreviewReducer }