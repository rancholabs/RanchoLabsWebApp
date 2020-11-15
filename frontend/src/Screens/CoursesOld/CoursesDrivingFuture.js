import React from 'react'
import './css/CoursesDrivingFuture.css'
import Assist from './../img/assist.png'
import ClassByIIT from './../img/class-by-iit.png'
import Innovation from './../img/innovation.png'
import Livestream from './../img/ls.png'

const CoursesDrivingFutureItem = ({img, desc}) => {
    return (
        <div className="courses-driving-future-item">
            <img src={img} alt={desc} />
            <div className="desc">{desc}</div>
        </div>
    )
}

const CoursesDrivingFuture = () => {
    return (
        <div className="courses-driving-future">
            <div className="title">
                Courses
                <span>:</span>
                <span><br /></span>
                Driving the future
            </div>
            <div className="desc">
                We are not waiting for tomorrow.
                <br />
                We are <span>creating the future today.</span>
            </div>
            <div className="items">
                <CoursesDrivingFutureItem img={Livestream} desc="Live Classes" />
                <CoursesDrivingFutureItem img={Innovation} desc="Project based active learning" />
                <CoursesDrivingFutureItem img={ClassByIIT} desc="Solve Real Life Problem" />
                <CoursesDrivingFutureItem img={Assist} desc="24*7 Doubt Support" />
            </div>
        </div>
    )
}

export default CoursesDrivingFuture
