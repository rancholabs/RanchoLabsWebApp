import React from 'react'
import './css/Learning.css'

import assist from './img/assist.png'
import classbyiit from './img/class-by-iit.png'
import innovation from './img/innovation.png'
import livestream from './img/ls.png'

const LearningData = [
    {
        "name" : "Live Classes",
        "src" : livestream,
    },
    {
        "name" : "Project based active learning",
        "src" : innovation,
    },
    {
        "name" : "Solve real life problems",
        "src" : classbyiit,
    },
    {
        "name" : "24*7 Doubt Support",
        "src" : assist,
    }
]

function Learning()
{
    let pcontent = 'Learning at home with Rancho Labs'
    return(
            <div className="learning">
                <div className="title">Learn from the comfort of home <br />with the best minds</div>
                    <div className="row">
                        {
                                LearningData.map((data)=>
                            
                                <div className="col-md-3">
                                <img src={data.src} alt={data.src}></img>
                                <p>{data.name}</p>
                            </div>
                        )
                        }      
                    </div>
            </div>
    )
}

function MobileLearning(){
    return(
        <div className="mobilelearning">
                <div className="title">Learning at home with<br />  Rancho Labs</div>
                <div className="row">
                    {
                                LearningData.map((data)=>
                            
                                <div className="col-6">
                                <img src={data.src} alt={data.src} style={{marginTop:"auto"}}></img>
                                <p>{data.name}</p>
                            </div>
                        )
                        }
                </div>
            </div>
    )
}

function LearningWithRL(){
    return(
        <>
        <Learning />
        <MobileLearning />
        </>
    )
}

export default LearningWithRL