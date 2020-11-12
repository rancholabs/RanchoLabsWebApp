import React from 'react'
import './css/CourseLearn.css'

const CourseLearnItem = ({topic, descs}) => {
    return (
        <div className="course-learn-item">
            <h2>{topic}</h2>
            {descs.map((desc, di) => {
                return (<p key={di}>{desc.split('covered: ').map((s, si, sArr)=><React.Fragment key={si}> {s} {si < sArr.length-1 ? 'covered:' : ''}<br/></React.Fragment>)}</p>)
            })}
        </div>
    )
}

const CourseLearn = ({learns}) => {
    return (
        <div className="course-main course-margin course-learn">
            <div className="course-sub-topic">
                <div>WHAT YOU'LL LEARN?</div>
            </div>
            {
                learns.map((learn, li) => {
                    const {_id: id, topic, description} = learn
                    return (<CourseLearnItem key={id} topic={topic} descs={Array.isArray(description) ? description : [description]} />)
                })
            }
        </div>
    )
}

export default CourseLearn
