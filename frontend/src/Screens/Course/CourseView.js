import React from 'react'
import './css/CourseView.css'

const CourseView = ({overview, detailedView}) => {
    return (
        <div className="course-view course-margin">
            <div>Course Overview</div>
            <p>{overview}</p>
            <div>Why this Course?</div>
            <p>{detailedView}</p>
        </div>
    )
}

export default CourseView
