import React, { useState } from 'react'
import './css/DashboardCongratsCard.css'
import Certificate from './img/certificate.png'

const Congarts = () => {

    const [close, isClose] =  useState(false)

    function displaycard(){
        isClose(!close)
    }

    return(
        <>
        { 
        !close &&
        <>
        <div className="congrats-card">
        <span className="close"><button onClick={displaycard}>&times;</button></span>
        <div className="congrats-image">
            <img src={Certificate} alt =""></img>
        </div>
        <div className="congrats-title">CONGRATULATIONS</div>
        <div className="congrats-content">
        Congratulations on completing the workshop with Rancho labs You've taken a big 
        step towards transforming your career! We are preparing your certificate. 
        You will get notified once the certificate is available for download.</div>
        </div>
        </>
        }
        </>
    )
}

export default Congarts