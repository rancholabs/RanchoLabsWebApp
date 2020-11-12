import React from 'react'
import './css/CoursesFaq.css'

const faqs = [
    {
        "id" : 1,
        "id" : 1,
        "question" : "What is Rancho Labs?",
        "answer" : "Students with determination and enthusiasm with a pinch of learning and guidance come up with some great innovations at Rancho Labs.Students with determination and enthusiasm with a pinch of learning and guidance come up with some great innovations at Rancho Labs."
    },
    {
        "id" : 2,
        "question" : "What is Rancho Labs?",
        "answer" : "Students with determination and enthusiasm with a pinch of learning and guidance come up with some great innovations at Rancho Labs.Students with determination and enthusiasm with a pinch of learning and guidance come up with some great innovations at Rancho Labs."
    },
    {
        "id" : 3,
        "question" : "What is Rancho Labs?",
        "answer" : "Students with determination and enthusiasm with a pinch of learning and guidance come up with some great innovations at Rancho Labs.Students with determination and enthusiasm with a pinch of learning and guidance come up with some great innovations at Rancho Labs."
    },
    {
        "id" : 4,
        "question" : "What is Rancho Labs?",
        "answer" : "Students with determination and enthusiasm with a pinch of learning and guidance come up with some great innovations at Rancho Labs.Students with determination and enthusiasm with a pinch of learning and guidance come up with some great innovations at Rancho Labs."
    },
    {
        "id" : 5,
        "question" : "What is Rancho Labs?",
        "answer" : "Students with determination and enthusiasm with a pinch of learning and guidance come up with some great innovations at Rancho Labs.Students with determination and enthusiasm with a pinch of learning and guidance come up with some great innovations at Rancho Labs."
    },
    {
        "id" : 6,
        "question" : "What is Rancho Labs?",
        "answer" : "Students with determination and enthusiasm with a pinch of learning and guidance come up with some great innovations at Rancho Labs.Students with determination and enthusiasm with a pinch of learning and guidance come up with some great innovations at Rancho Labs."
    }
] 

const Faq = (props) =>{
    return(
        <>
        <div className="faq-question">{props.question}</div>
        <div className="faq-ans">{props.answer}</div>
        </>
    )
}

const CoursesFaq = () => {
    return(
        <>
        <div className="courses-faq">
        <div className="courses-faq-title">FAQ</div>
            {
                faqs.map((faq) => {
                    return(
                        <Faq key={faq.id} question={faq.question} answer={faq.answer}/>
                    )
                })
            }
        </div>
        </>
    )
}

export default CoursesFaq