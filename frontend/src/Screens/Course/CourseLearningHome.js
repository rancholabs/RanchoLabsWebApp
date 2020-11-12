import React from 'react'
import './css/CourseLearningHome.css'
import Assist from './../img/assist.png'
import ClassByIIT from './../img/class-by-iit.png'
import Innovation from './../img/innovation.png'
import Livestream from './../img/ls.png'

const CourseLearningHomeItem = ({img, desc, addClass}) => {
    return (
        <div className={"course-learning-home-item " + addClass }>
            <img src={img} alt={desc} />
            <div>
                <div className="desc">{desc}</div>
            </div>
        </div>
    )
}

const CourseLearningHome = () => {
    return (
        <div className="course-learning-home course-margin">
            <div>
                <div className="topic">Learning at home with Rancho Labs</div>
            </div>
            <div className="learnings">
                <CourseLearningHomeItem addClass="first" img={Livestream} desc="Live Classes" />
                <CourseLearningHomeItem addClass="last" img={Innovation} desc="Project based active learning" />
                <CourseLearningHomeItem addClass="first" img={ClassByIIT} desc="Solve Real Life Problem" />
                <CourseLearningHomeItem addClass="last" img={Assist} desc="24*7 Doubt Support" />
            </div>
        </div>
    )
}

export default CourseLearningHome
