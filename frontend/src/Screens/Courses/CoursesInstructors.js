import React from 'react'
import './css/CoursesInstructors.css'
import iitd from './img/iitd.png'
import google from './img/google.png'
import programming from './img/instructor.png'
import calendar from './img/calendar.png'

const instructors=[
    {
        "id" : 1,
        "name" : "Abhishek Gupta",
        "details" : "IIT DElhi ( Computer Software ) Head of Robotics in IIT delhi Worked at Google",
        "logo1" : iitd,
        "logo2" : google,
        "image" : programming
    },
    {
        "id" : 2,
        "name" : "Abhishek Gupta",
        "details" : "IIT DElhi ( Computer Software ) Head of Robotics in IIT delhi Worked at Google",
        "logo1" : iitd,
        "logo2" : google,
        "image" : programming
    },
    {
        "id" : 3,
        "name" : "Abhishek Gupta",
        "details" : "IIT DElhi ( Computer Software ) Head of Robotics in IIT delhi Worked at Google",
        "logo1" : iitd,
        "logo2" : google,
        "image" : programming
    },
    {
        "id" : 4,
        "name" : "Abhishek Gupta",
        "details" : "IIT DElhi ( Computer Software ) Head of Robotics in IIT delhi Worked at Google",
        "logo1" : iitd,
        "logo2" : google,
        "image" : programming
    },
]

const InstructorCard = (props) => {
    return(
        <>
        <div className="instructor">
            <div className="instructor-pic"><img src={props.image} alt={props.name} /></div>
            <div className="instructor-info">
                <div className="instructor-name">{props.name}</div>
                <hr />
                <div className="instructor-details">{props.details}</div>
                <div className="logos row mx-0">
                    <img src={props.logo1} alt={props.logo1} />
                    <img src={props.logo2} alt={props.logo2}/>
                </div>
            </div>
        </div>
        </>
    )
}

const CourseInstructors = () => {
    return (
        <>
            <div className="courses-instructors">
                <div className="courses-instructors-title">Learn from the best in the world</div>
                <div className="courses-instructors-subtitle">Meet our instructors</div>
                <div className="row mx-0">
                    {
                        instructors.map((i) => {
                            return(<InstructorCard key={i.id} name={i.name} logo1={i.logo1} logo2={i.logo2} details={i.details} image={i.image}/>)
                        })
                    }
                </div>
                <div className="text-center"><button><img src={calendar} alt="freeclass" />Book a free class now</button></div>
            </div>
        </>
    )
}

export default CourseInstructors