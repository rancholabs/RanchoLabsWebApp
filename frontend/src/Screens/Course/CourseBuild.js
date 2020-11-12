import React from 'react'
import './css/CourseBuild.css'

const CourseBuildItem = ({topic, img}) => {
    return (
        <div className="course-build-item">
            <img src={img} />
            <p>{topic}</p>
        </div>
    )
}

const CourseBuild = ({builds}) => {
    return (
        <div className="course-main course-margin course-build">
            <div className="course-sub-topic">
                <div>WHAT YOU'LL BUILD?</div>
            </div>
            <p className="build-desc">Projects that help you master the concepts</p>
            <div className="course-build-items">
                {
                    builds.map((build, li) => {
                        const {_id: id, topic, image} = build
                        return (<CourseBuildItem key={id} topic={topic} img={image? image.filePath : ''} />)
                    })
                }
            </div>
        </div>
    )
}

export default CourseBuild