import React from 'react'
import './css/CoursesLearn.css'
import b1 from './img/b1.png'
import b2 from './img/b2.png'
import b3 from './img/b3.png'
import b4 from './img/b4.png'

const courseLearns = [
    {
        "image": b1,
        "title": "Live & interactive classes",
        "desc": "Artificial Intelligence Refers To The Intelligence Portrayed By The Machines."
    },
    {
        "image": b4,
        "title": "Solve real life problems",
        "desc": "Artificial Intelligence Refers To The Intelligence Portrayed By The Machines."
    },
    {
        "image": b2,
        "title": "Customized & Convienient learning",
        "desc": "Artificial Intelligence Refers To The Intelligence Portrayed By The Machines."
    },
    {
        "image": b3,
        "title": "Project based active learning",
        "desc": "Artificial Intelligence Refers To The Intelligence Portrayed By The Machines."
    },
]

const CoursesLearn = () => {
    return (
        <>
            <div className="courses-learn">
                <div className="courses-learn-title">Why learn with Rancho Labs?</div>
                <div className="row mx-0">
                    {courseLearns.map((cl) => {
                        return (
                            <>
                                <div className="learn-item row mx-0">
                                <div className="learn-image"><img src={cl.image} className="img-fluid" alt="image" /></div>
                                <div className="learn-details">
                                    <div className="learn-title">{cl.title}</div>
                                    <div className="learn-desc">{cl.desc}</div>
                                </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default CoursesLearn