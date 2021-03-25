import React from 'react'
import './css/FreeclassBanner.css'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updateStudent, updateStudentFreeEnroll } from '../../Actions/Student'

const Banner = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userLogin)
    const { student } = useSelector(state => state.studentInfo)

    function freeClasshandler() {
        if (userInfo) {
            if (userInfo.role === 'student') {
                if(student && student.freeEnrollment.freeClass.completed){
                    alert('You have already completed free class')
                }
                else if (student && !student.freeEnrollment.freeClass.enrolled) {
                    var updates = {
                        "freeEnrollment": {
                            "freeClass" : {
                                "enrolled" : true,
                                "completed" : student.freeEnrollment.freeClass.completed
                            },
                            "freeWorkshop" : {
                                "enrolled" : student.freeEnrollment.freeWorkshop.enrolled,
                                "completed" : student.freeEnrollment.freeWorkshop.completed
                            }
                            
                        }
                    }
                    dispatch(updateStudentFreeEnroll(updates))
                }
                else{
                    alert('You have already enrolled for free class')
                }
                history.push('/dashboard')
            }
        }
        else {
            history.push('/freeclass?loginfor=freeclass')
        }
    }

    return(
        <>
        <div className="freeclass-banner">
            <div className="banner-title">It's time to launch your career</div>
            <div className="banner-content">Take a step towards your dream and passion with Rancho Labs.</div>
            <div className="freeclass-button"><button onClick={freeClasshandler}>Book A Free Class Now</button></div>
        </div>
        </>
    )
}

export default Banner