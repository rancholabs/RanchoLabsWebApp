import React from 'react'
import './css/CoursesBanner.css'
import banner from './img/banner.png'
import calendar from './img/calendar.png'

const CoursesBanner = () => {
    return (
        <>
            <div className="courses-banner">
                <div className="courses-banner-title">Customize Your Journey Path Now</div>
                    <div className="courses-banner-desc">Take the free trial class and our guidance counsellor will help build a custom path based on your child’s performance.</div>
                    <div className="banner-button text-center">
                       <button><img src={calendar} alt="calendar" /> Book A Free Class Now</button>
                    </div>
            </div>
        </>
    )
}

export default CoursesBanner