import React from 'react'
import './css/CourseMain.css'
import ai from './img/ai.png'
import pk from './img/practicalknowledge.png'
import brightcareer from './img/brightcareer.png'
import pl from './img/playfullearning.png'
import lt from './img/logicthinking.png'

const CourseMain = () => {
    return (
        <>
            <div className="coursepage-main row mx-0">
            <div className="course-main-text">
                <div className="course-main-title">Your Child Can Be India’s <br />Next Tech Millionaire</div>
                <hr />
                <div className="course-main-desc">Artificial Intelligence Refers To The Intelligence Portrayed By The Machines. It Is A Branch Of ‘Computer Science’ That Deals With The Study</div>
            </div>
            <div className="course-main-illustrations">
                <div className="row mx-0">
                    <div>
                        <img src={lt} alt="" />
                        <div className="course-main-image">Brain development</div>
                    </div>
                    <div>
                        <img src={pl} alt="" />
                        <div className="course-main-image">Fun Learning</div>
                    </div>
                </div>
                <div className="row mx-0">
                    <div>
                        <img src={pk} alt="" />
                        <div className="course-main-image">Build Your Own Aps</div>
                    </div>
                    <div>
                        <img src={brightcareer} alt="" />
                        <div className="course-main-image">Bright Career</div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default CourseMain