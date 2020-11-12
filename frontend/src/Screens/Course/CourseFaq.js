import React, { useState } from 'react'
import './css/CourseFaq.css'
import RobotImg from './img/robot-2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons'

const CourseFaqItem = ({faq}) => {
    const {question, answer} = faq

    const [isHidden, setIsHidden] = useState(true)

    const faqClickHandler = () => {
        setIsHidden(!isHidden)
    }

    return (
        <div className={`course-faq-item${!isHidden ? ' open' : ''}`} onClick={() => faqClickHandler()}>
            <FontAwesomeIcon className="icon" icon={isHidden ? faAngleRight : faAngleDown} />
            <div>
                <div className="box">
                    <div className="text">{question}</div>
                </div>
                {!isHidden && (
                    <div className="box ans-box">
                        <div className="text">-{answer}</div>
                    </div>
                )}
            </div>
            
        </div>
    )
}

const CourseFaq = ({faqs}) => {
    return (
        <div className="course-faq course-margin">
            <div className="title">FAQ's</div>
            {
                faqs.map((faq, fi) => {
                    return (<CourseFaqItem key={faq._id ? faq._id : fi} faq={faq} />)
                })
            }
            <img className="img" alt="robot-img" src={RobotImg} />
        </div>
    )
}

export default CourseFaq
