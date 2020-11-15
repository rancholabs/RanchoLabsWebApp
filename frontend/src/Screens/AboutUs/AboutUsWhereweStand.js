import React from 'react'
import $ from 'jquery'
import './css/AboutUsWhereweStand.css'
import i1 from './img/i1.png'
import i2 from './img/i2.png'
import i3 from './img/i3.png'
import { useLayoutEffect } from 'react'
import { useCountUp } from 'react-countup';

const wwscrads = [
    {
        "img" : i3,
        "title" : "15000",
        "content" : "Classes Taken"
    },
    {
        "img" : i2,
        "title" : "3000",
        "content" : "Students enrolled"
    },
    {
        "img" : i1,
        "title" : "5000",
        "content" : "Happy Parents"
    }
]

const Wherewestandcard = (props) => {

    const { countUp } = useCountUp({ end: props.title });

    return(
        <div className="wws-card">
            <div className="wws-card-image"><img className="img-fluid" src={props.img} alt={props.title}/></div>
            <div className="wws-card-info">
                <div className="wws-card-title"><span className="">{countUp}</span>+</div>
                <div className="wws-card-content">{props.content}</div>
            </div>
        </div>
    )
}

const WhereweStand = () => {
    return(
        <div>
            <div className="aboutus-stand">
                <div className="wherewestand-title">Our Growth So Far</div>
                <div className="wherewestand-desc">RanchoLabs keeps transforming the lives of students. 
                With each day, our passion for teaching and problem solving only grows stronger.</div>
                <div className="wws-cards row mx-0 align-items-center">
                    {
                        wwscrads.map((w) => {
                            return(
                            <Wherewestandcard key={w.img} img={w.img} title={w.title} content={w.content} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default WhereweStand