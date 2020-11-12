import React, { useEffect, useState } from 'react'
import './css/CourseHeader.css'
import Payment from './../../Components/Payment'
import { useDispatch, useSelector } from 'react-redux'
import { getStudentCourses } from '../../Actions/Student'

const CoursePriceWithImg = ({courseDetails}) => {
    const {_id: id ,courseImage, price} = courseDetails
    const {amount, currencyCode} = price
    const [isEnrolled, setIsEnrolled] = useState(false)
    const {courses} = useSelector((state) => state.studentCourses)
    const {userInfo} = useSelector((state) => state.userLogin)
    const dispatch = useDispatch()

    useEffect(() => {
        if(userInfo)
            dispatch(getStudentCourses())
    }, [userInfo])

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
        <div className="course-price-with-img">
            <div className = "img">
                <img src={courseImage.filePath} alt="course-img" />
            </div>
            <div className="course-fee-enroll">
                <div className="course-fee">Fee - {amount}/- {currencyCode}</div>
                {!isEnrolled ? <Payment className="course-enroll">ENROLL NOW</Payment>
                 : <div className="course-enroll" style={{cursor: "default"}}>ENROLLED</div>}
            </div>
            <div className="course-fee-enroll-mobile">
                {!isEnrolled ? <Payment className="course-enroll">ENROLL NOW</Payment>
                 : <div className="course-enroll" style={{cursor: "default"}}>ENROLLED</div>}
                <div className="course-fee">Fee - {amount}/- {currencyCode}</div>
            </div>
        </div>
    )
}

const CourseHeader = ({courseDetails}) => {
    const {name, description, level, preReq, durationInHours} = courseDetails
    const shortDesc = description.split(/school students/i)
    return (
        <div className="course-header-main">
            <div className="course-main course-header course-margin">
                <div className="course-topic">{name}</div>
                <p className="short-desc">{shortDesc[0]}{shortDesc.length > 1 && (<span style={{color: '#F74B42'}}>School Students</span>)}{shortDesc.length > 1 ? shortDesc[1] : ''}</p>
                <div className="level-duration">
                    <div>{level.length ? level : 'Beginners'} Level</div>
                    <div className="pre-req">Pre-Req: {preReq.length ? preReq : 'None'}</div>
                    <div>{durationInHours} hrs LIVE classes</div>
                </div>
            </div>
            <CoursePriceWithImg courseDetails={courseDetails} />
        </div>
    )
}

export default CourseHeader
