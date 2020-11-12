import React from 'react'
import './css/CoursesGrowth.css'
import calendar from './img/calendar.png'

const CoursesGrowth = () => {
    return(
        <>
        <div className="courses-growth">
            <div className="courses-growth-title">Growth starts here!</div>
            <div className="courses-growth-subtitle">Set your child up for success with Rancho Labs. Book a free trial today!!</div>
            <div className="freeclass-button">
            <div className="text-center"><button><img src={calendar} alt="freeclass" />Book a free class now</button></div>
            </div>
        </div>
        </>
    )
}

export default CoursesGrowth