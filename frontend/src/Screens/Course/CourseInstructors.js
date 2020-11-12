import React from 'react'
import './css/CourseInstructors.css'

const CourseInstructorCard = ({instructor}) => {
    const {image, name, description} = instructor
    return (
        <div className="course-instructor-card">
            <div className="img"></div>
            <div className="name">{name.first} {name.last}</div>
            <div className="desc">{description}</div>
        </div>
    )
}

const CourseInstructors = ({instructors}) => {
    return (
        <div className="course-instructors course-margin">
            <div className="title">COURSE CREATOR</div>
            <div className="instructors">
                {
                    instructors.map((instructor, ii) => {
                        return (<CourseInstructorCard key={instructor._id} instructor={instructor} />)
                    })
                }
            </div>
        </div>
    )
}

export default CourseInstructors
