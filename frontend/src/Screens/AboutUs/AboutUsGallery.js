import React from 'react'
import FontAwesome from 'react-fontawesome'
import './css/AboutUsGallery.css'
import ga1 from './img/ga1.jpeg'
import ga2 from './img/ga2.jpeg'
import ga3 from './img/ga3.jpeg'
import ga4 from './img/ga4.jpeg'
import ga5 from './img/ga5.jpeg'
import ga6 from './img/ga6.jpeg'
import ga7 from './img/ga7.jpeg'
import ga9 from './img/ga9.jpeg'

const Gallery = () => {
    return(
        <div className="aboutus-gallery">
            <div className="gallery-title">Students &nbsp;<FontAwesome name="heart" style={{color:"red"}}></FontAwesome> &nbsp;RanchoLabs</div>
            <div className="gallery-desc">There is never a dull day when we are around. Children double up the fun. <br/>RanchoLabs is incomplete without its students.</div>
            <div className="gallery-images">
                <div className="row mx-0 justify-content-center">
                    <div className="small"><img src={ga6} alt=""  /></div>
                    <div className="large"><img src={ga1} alt=""  /></div>
                </div>
                <div className="row mx-0 justify-content-center">
                    <div className="small"><img src={ga7} alt=""  /></div>
                    <div className="small"><img src={ga3} alt=""  /></div>
                    <div className="small"><img src={ga9} alt=""  /></div>
                </div>
                <div className="row mx-0 justify-content-center">
                    <div className="large"><img src={ga2} alt=""  /></div>
                    <div className="small"><img src={ga4} alt=""  /></div>
                </div>
            </div>
        </div>
    )
}

export default Gallery