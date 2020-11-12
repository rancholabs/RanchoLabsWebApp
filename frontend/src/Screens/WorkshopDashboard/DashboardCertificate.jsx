import React, { useState } from 'react'
import './css/DashboardCertificate.css'
import certificate from './img/certificatemodal.png'
import lock from './img/lock.png'
import medal from './img/medal.gif'
import Fontawesome from 'react-fontawesome'
import fb from './img/fb.png'
import wa from './img/whatsapp.png'
import twitter from './img/twitter.png'
import gmail from './img/gmail.png'
import messenger from './img/messanger.png'
import linkedin from './img/linkedin.png'
import share from './img/share.png'

const shareIcons = [
    {
        icon : fb ,
        name : "Facebook"
    },
    {
        icon : messenger,
        name : "Messenger"
    },
    {
        icon  : wa,
        name : "WhatsApp"
    },
    {
        icon : gmail,
        name : "Gmail"
    },
    {
        icon : linkedin,
        name : "LinkedIn"
    },
    {
        icon : twitter,
        name : "Twitter"
    }
]


const Certificate = () => {

    const [iscertificate, setCertficate] = useState(false)
    const [isShareExp, setShareExp] = useState(false)

    function showCertificate(){
        setCertficate(!iscertificate)
    }

    if(iscertificate || isShareExp){
        document.body.style.overflow = "hidden"
    }else{
        document.body.style.overflow = "auto"
    }


    return(
        <>
        <div className="dashboardcertificate row mx-auto">
                <div className="certificate-content">
                    <div className="certificate-title">CONGRATULATIONS</div>
                    <div className="certificate-desc">
                        Dear X, we are so pleased to see you complete our workshop. Excellence isn't a skill but an attitude. 
                        Keep up your good work and continue to strive for perfection! As a token of appreciation, we are giving 
                        you a Certificate of Completion.
                    </div>
                    <div className="get-certificate">
                        <a><button onClick={showCertificate}>GET IT NOW &nbsp; <Fontawesome name="arrow-right" /></button></a>
                    </div>
                </div>
                <div className="medal">
                    <img src={medal} alt=""></img>
                </div>
        </div>
        { iscertificate && 
        <>
        <div className="dashboard-certificate-modal">
        <span className="close"><button onClick={showCertificate}>&times;</button></span>
            <div className="row mx-0 cmodal-content">
            <div className="certificate-details">
                <div className="certificate-title">CONGRATULATIONS</div>
                <div className="certificate-modal-content">
                Dear X, Congratulations on completing the free workshop offered by RanchoLabs. 
                Not all students get this opportunity and we really applaud your efforts in taking time 
                to learn new things. We hope this is the first achievement amongst many to follow.
                </div>
                <div className="certificate-modal-content-unlock">
                To unlock your certificate, Tell three friends about your experience at RanchoLabs’ Workshop.
                </div>
                <div className="certificate-share align-items-center">
                    <button 
                    onClick= {() => {setShareExp(true)
                    showCertificate()}}><img src={share} /> SHARE EXPERIENCE</button>
                </div>
            </div>
            <div className="certificate-image">
                <img src={certificate} alt="" />
                <img className="lock" src={lock} />
            </div>
            </div>
        </div>
        </>
        }
        {
            isShareExp &&
            <div className="dashboard-share-exp">
            <div className="close"><button onClick={() => setShareExp(false)}>&times;</button></div>
            <div className="share-exp-content">
                <div className="share-exp-title">Share the Experience</div>
                <div className="share-exp-subtitle">Tell others what you did at Rancho Labs</div>
                <div className="row mx-0 share-icons">
                    {
                        shareIcons.map((i) => {
                            return(
                                <div className="text-center" style={{alignSelf:"flex-end"}}>
                                    <div><img className="img-fluid" src={i.icon} /></div>
                                    <div className="icon-name">{i.name}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="share-link">
                    <input type="text" placeholder="link"/>
                    <button>COPY</button>
                </div>
            </div>
        </div>
        }
        </>
    )
}


export default Certificate