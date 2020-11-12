import React, { useState } from 'react'
import './css/CoursesList.css'

const CoursesListItem = ({course, isVisited, clickHandler}) => {
    const {name, img} = course
    return (
        <div className="courses-list-item" onClick={() => !isVisited ? clickHandler(true) : ""}>
            <div className="name">{name}</div>
            <img src={img} alt={name} />
        </div>
    )
}

const CoursesList = ({courses}) => {
    const [isVisited, setIsVisited] = useState(false)
    return (
        <div className={`courses-list${isVisited ? " visited" : ""}`}>
            {
                courses.map((course, ci) => {
                    return (<CoursesListItem key={ci} course={course} isVisited={isVisited} clickHandler={setIsVisited} />)
                })
            }
        </div>
    )
}

export default CoursesList
