import React from 'react'
import './css/CoursesCourses.css'
import robotics from './img/robotics2.png'
import ai from './img/ai2.png'
import programming from './img/programming2.png'
import recommended from './img/recommended.png'

const Courses = [
    {
        "name" : "Recommended",
        "image" : recommended
    },
    {
        "name" : "Robotics",
        "image" : robotics
    },
    {
        "name" : "Artificial Intelligence",
        "image" : ai
    },
    {
        "name" : "Programming",
        "image" : programming
    }
]


const CourseCard = (props) => {
    return(
        <>
        <div className="courses-course-card col p-0" style={{alignSelf:"flex-end"}}>
            <button>
            <div className="course-image">
                <img src={props.image} className="img-fluid"/>
            </div>
            </button>
            <div className="course-name text-center">{props.name}</div>
        </div>
        </>
    )
}

const CoursesCourses = () => {
    return (
        <>
            <div className="courses-courses row mx-0">
                {Courses.map(CourseCard)}
            </div>
        </>
    )
}

export default CoursesCourses