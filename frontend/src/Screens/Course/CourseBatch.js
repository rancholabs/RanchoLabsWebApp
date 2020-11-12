import React, {useEffect, useState} from 'react'
import './css/CourseBatch.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faDotCircle } from '@fortawesome/free-regular-svg-icons'
import { setBatchDetails } from '../../Actions/Payment'
import { useDispatch, useSelector } from 'react-redux'
import Payment from './../../Components/Payment'

const CourseBatchItem = ({batch, durationPerWeek, noOfWeeks, isSelected, clickHandler}) => {
    console.log(batch)
    const getDateString = (date) => {
        let oDate = new Date(date)
        return `${oDate.getDate()} ${oDate.toLocaleString('default', { month: 'short' })} ${oDate.getFullYear()}`
    }
    const startDate = getDateString(batch.startDate)
    const endDate = getDateString(batch.endDate)

    return (
        <div className="course-batch-item" onClick={() => !isSelected ? clickHandler(batch._id) : ''}>
            <div>
                { 
                    (!isSelected) ? (
                        <div>
                            <FontAwesomeIcon className="icon" icon={faCircle} size="3x" color="#3CFAFF" />
                        </div>
                    ) : (
                        <div>
                            <FontAwesomeIcon className="icon" icon={faDotCircle} size="3x" color="#3CFAFF" />
                        </div>
                    )
                }
                <div className="name">
                    { `${startDate} - ${endDate}` }
                </div>
            </div>
            <div className="duration">
                {durationPerWeek} hrs a week | {noOfWeeks} week
            </div>
        </div>
    )
}

const CourseBatch = ({durationInHours, hoursPerWeek, noOfWeeks, batches, id}) => {
    const dispatch = useDispatch()
    const [courseBatch, setCourseBatch] = useState(batches.length ? batches[0]._id : undefined)
    const [isEnrolled, setIsEnrolled] = useState(false)
    const {courses} = useSelector((state) => state.studentCourses)
    const {userInfo} = useSelector((state) => state.userLogin)

    const clickHandler = (batc) => {
        setCourseBatch(batc)
    }
    useEffect(() => {
        if(courseBatch)
            dispatch(setBatchDetails({batchId: courseBatch}))
    }, [courseBatch])

    useEffect(() => {
        const isregistered = courses.some(course => course.courseId === id)
        if(isregistered && userInfo) {
            setIsEnrolled(true)
        }
        else {
            setIsEnrolled(false)
        }
    }, [courses, userInfo])

    return (
        <>
        {!isEnrolled && (
            <div className="course-batch course-margin">
                <div className="name">PICK A BATCH</div>
                <div className="duration">{durationInHours} hrs live classes</div>
                <div>
                    {
                        batches.map((batch, bi) => {
                            return (
                                <CourseBatchItem
                                    key={batch._id} 
                                    batch={batch} 
                                    durationPerWeek={hoursPerWeek} 
                                    noOfWeeks={noOfWeeks}
                                    isSelected={batch._id === courseBatch}
                                    clickHandler={clickHandler}
                                />)
                        })
                    }
                </div>
                <Payment className="enroll-btn" >
                        <div className="text">Enroll Now</div>
                </Payment>
            </div>
        )}
        </>
    )
}

export default CourseBatch
