import React from 'react'
import './css/CourseOutcome.css'

const CourseOutcomeItem = ({outcome}) => {
    return (
        <div className="course-outcome-item">
            <div className="icon">
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-check fa-w-16 fa-3x icon-sub" color="#F74B42"><path fill="currentColor" d="M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z" className=""></path></svg>
            </div>
            <div className="name">{outcome}</div>
        </div>
    )
}

const CourseOutcome = ({outcomes}) => {
    return (
        <div className="course-outcome course-margin">
            <div className="name">Learner's Outcome</div>
            <div className="outcomes">
                {
                    outcomes.map((outcome, oi) => {
                        return (<CourseOutcomeItem key={oi} outcome={outcome.outcome} />)
                    })
                }
            </div>
        </div>
    )
}

export default CourseOutcome
