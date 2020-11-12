import React, { useState } from 'react'
import './css/WorkshopFaq.css'
import RobotImg from './img/robot-2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons'

const WorkshopFaqItem = ({faq}) => {

    const {question, answer} = faq

    const [isHidden, setIsHidden] = useState(true)

    const faqClickHandler = () => {
        setIsHidden(!isHidden)
    }

    return (
        <div className={`workshop-faq-item${!isHidden ? ' open' : ''}`} onClick={() => faqClickHandler()}>
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

const WorkshopFaq = ({faqs}) => {

    return (
        <div className="workshop-faq workshop-margin">
            <div className="title">FAQ's</div>
            <div className="row">
                <div className="col-md-7" style={{ alignSelf: "center" }}>
                    {
                        faqs.map((faq, fi) => {
                            return (<WorkshopFaqItem  key={faq._id ? faq._id : fi} faq={faq} />)
                        })
                    }
                </div>
                <div className="col-md-5">
                    <img className="img-fluid" alt="robot-img" src={RobotImg} />
                </div>
            </div>
        </div>
    )
}

export default WorkshopFaq