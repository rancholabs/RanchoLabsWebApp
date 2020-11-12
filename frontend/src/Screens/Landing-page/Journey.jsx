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
                    <div className="innercontent-title">Why Choose us?</div>
                    <div className="innercontent">Cross your boundaries with your imagination and innovation</div>
                </div>
                <div className="col-md-4">
                    <div className="innercontent-title">Our Mission</div>
                    <div className="innercontent">To ensure that the next global tech leaders are from India</div>
                </div>
                <div className="col-md-4">
                    <div className="innercontent-title">What do we do?</div>
                    <div className="innercontent">Help you kickstart your journey and make you future-ready</div>
                </div>
            </div>
            <img src={robot} alt="robot"></img>
            </div>
        </div>
    )
}

export default Journey