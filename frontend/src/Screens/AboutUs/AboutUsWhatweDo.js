import React from 'react'
import './css/AboutUsWhatweDo.css'
import i4 from './img/i4.png'
import i5 from './img/i5.png'
import i6 from './img/i6.png'
import i7 from './img/i7.png'

const whatwedocards = [
    {
        "img" : i5,
        "title" : "Creative thinking",
        "desc" : "Help students think laterally and in a structured manner"
    },
    {
        "img" : i7,
        "title" : "Innovative learning",
        "desc" : "A pinch of innovation coupled along with a curious mind can do wonders for any student"
    },
    {
        "img" : i6,
        "title" : "PROBLEM-SOLVING",
        "desc" : "Assist students in generating, evaluating and implementing new ideas"
    },
    {
        "img" : i4,
        "title" : "Bright Career",
        "desc" : "The curriculum is focused on providing each student with a promising career"
    }
]

const Whatwedocard = (props) =>{
    return(
        <>
            <div className="whatwedocard">
                <div className="image"><img className="img-fluid" alt={props.title} src={props.img}></img></div>
                <div className="wwd-title">{props.title}</div>
                <div className="wwd-desc">{props.desc}</div>
            </div>
        </>
    )
}

const WhatweDo = () => {
    return(
        <div className="whatwedo">
            <div className="whatwedo-title">What we do at Rancho Labs</div>
            <div className="whatwedo-desc">Each student needs practical knowledge and problem-solving skills to survive in the future. 
            We form our base curriculum keeping students as our first and utmost priority.</div>
            <div className="row whatwedocards mx-0">
                {
                    whatwedocards.map(Whatwedocard)
                }
            </div>
        </div>
    )
}

export default WhatweDo