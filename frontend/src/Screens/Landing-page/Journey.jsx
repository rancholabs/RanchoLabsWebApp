import React from 'react'
import './css/index.css'
import './css/Journey.css'

import robot from './img/54998decefee4eff03de436edd73d832-removebg-preview.png'

function Journey()
{
    return(
        <div className="journey">
            <h4 className="journey-title">BEGIN YOUR JOURNEY WITH US</h4>
            <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="innercontent-title">Our Vision</div>
                    <div className="innercontent">Inspire India's creative minds to reflect on their dreams and turn them into reality</div>
                </div>
                <div className="col-md-4">
                    <div className="innercontent-title">Our Mission</div>
                    <div className="innercontent">To foster young minds pursue their passion and dreams in technology</div>
                </div>
                <div className="col-md-4">
                    <div className="innercontent-title">What do we do?</div>
                    <div className="innercontent">Enable children to kick-start their journey in technology and make them future-ready</div>
                </div>
            </div>
            <img src={robot} alt="robot"></img>
            </div>
        </div>
    )
}

export default Journey