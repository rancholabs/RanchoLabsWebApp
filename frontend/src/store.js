import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
//import Cookie from 'js-cookie'
import { AppReducer } from './Reducers/App'
import { HeaderReducer } from './Reducers/Header'
import { FooterReducer } from './Reducers/Footer'
import { ForgotPasswordReducer, SetPasswordReducer, userLoginReducer, userRegisterReducer, userRegisterWorkshopReducer, ValidateToken } from './Reducers/userReducer'
import { dashboardReducer, dashboardActiveCourseReducer , journeycourseReducer} from './Reducers/dashboardReducers'
import { coursegroupReducer, courseGroupsListReducer } from './Reducers/courseReducers'
import { userUpdateReducer} from './Reducers/userReducer'
import { PaymentReducer } from './Reducers/Payment'
import { studentCoursesReducer, studentUpdateReducer, studentInfoReducer, studentFreeEnrollUpdateReducer } from './Reducers/Student'
import { sendMailReducer } from './Reducers/userReducer'
import { instructorInfoReducer, instructorScheduleReducer, instructorBatchReducer, instructorNoteReducer } from './Reducers/Instructor'
//const userInfo = Cookie.getJSON('userInfo') || null;

const reducer = combineReducers({
    appDetails: AppReducer,
    header: HeaderReducer,
    footer:FooterReducer,
    paymentDetails: PaymentReducer,
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userSetPassword: SetPasswordReducer,
    userForgotPassword: ForgotPasswordReducer,
    userUpdate : userUpdateReducer,
    userValidateToken: ValidateToken,
    dashboard : dashboardReducer,
    workshop : userRegisterWorkshopReducer,
    courseGroups : coursegroupReducer,
    courseGroupsList: courseGroupsListReducer,
    activeCourse : dashboardActiveCourseReducer,
    studentInfo : studentInfoReducer,
    studentFreeEnrollUpdate : studentFreeEnrollUpdateReducer,
    studentUpdate :  studentUpdateReducer,
    studentCourses: studentCoursesReducer,
    message : sendMailReducer,
    journeycourse: journeycourseReducer,
    instructorInfo : instructorInfoReducer,
    instructorSchedule : instructorScheduleReducer,
    instructorBatch : instructorBatchReducer,
    instructorNote : instructorNoteReducer
})

let userInfofromStorage

try {
    userInfofromStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo')):null
}
catch(err) {
    userInfofromStorage = null
}

let instructorNote 
try{
    instructorNote = localStorage.getItem('instructorNote') ? JSON.parse(localStorage.getItem('instructorNote')):null 
}
catch(e){
    instructorNote = null
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
    //userSignin: { userInfo },
    appDetails: { appName: 'RANCHO LABS', author: {authorName: 'Gokulnath B', authorLink: 'http://gokulnathb.dx.am'} },
    userLogin : { userInfo : userInfofromStorage },
    instructorNote : { note : instructorNote }
}


const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)

export default store;