import React from 'react'
import './css/CoursesCourses.css'
import robotics from './img/robotics2.png'
import ai from './img/ai2.png'
import programming from './img/programming2.png'
import recommended from './img/recommended.png'

const Courses = [
    {
        "name" : "Recommended",
        "class" : "",
        "image" : recommended
    },
    {
        "name" : "Robotics",
        "class" : "",
        "image" : robotics
    },
    {
        "name" : "Artificial Intelligence",
        "class" : "active",
        "image" : ai
    },
    {
        "name" : "Programming",
        "class" : "",
        "image" : programming
    }
]


const CourseCard = (props) => {
    return(
        <>
        <div className={`courses-course-card col p-0 ` + props.class} style={{alignSelf:"flex-start"}}>
            <button>
            <div className="course-image">
                <img src={props.image} className="img-fluid"/>
            </div>
            </button>
            <div className="course-name text-center">{props.name}</div>
            <div className="active-line"></div>
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