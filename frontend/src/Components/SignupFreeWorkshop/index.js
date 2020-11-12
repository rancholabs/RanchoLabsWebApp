import React from 'react'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateStudent, updateStudentFreeEnroll } from '../../Actions/Student'

const SignupFreeWorkshop = ({onclickHandler}) => {
    const history = useHistory()
    const dispatch =  useDispatch()
    const { userInfo } = useSelector(state => state.userLogin)
    const { student } = useSelector(state => state.studentInfo)

    const routeChange = (onclickHandler) =>{ 
        if(onclickHandler)
            onclickHandler()
    }

    return (
        <div className="signup-free-btn" onClick={() => routeChange(onclickHandler)}>
            <div>Sign Up For Free Class</div>
            <FontAwesomeIcon className="icon" icon={faCaretRight} />
        </div>
    )
}

export default SignupFreeWorkshop
