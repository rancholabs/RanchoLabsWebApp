import React from 'react'
import './css/CourseStructure.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

const CourseStructureBox = () => {
    return (
        <>
            <div className="name">
                COURSE STRUCTURE
            </div>
            <FontAwesomeIcon className="icon" icon={faCaretRight} color="#0A0E2A" />
        </>
    )
}

const CourseStructure = ({structure}) => {
    return (
        <div className="course-structure course-margin">
            {structure ? (
                <a href={structure} target="_blank" className="box">
                    <CourseStructureBox />
                </a>
            ): (
                <div className="box">
                    <CourseStructureBox />
                </div>
            )}
        </div>
    )
}

export default CourseStructure
