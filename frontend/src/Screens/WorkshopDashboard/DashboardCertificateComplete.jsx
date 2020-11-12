import React from 'react'
import './css/DashboardCertificateComplete.css'
import certificate from './img/certificatemodal.png'
import Fontawesome from 'react-fontawesome'

const CertificateComplete = () =>{
    return(
        <div className="dashboard-certificate-complete">
            <div className="row mx-0">
                <div className="certificate-image">
                    <img src={certificate} alt="" />
                </div>
                <div className="complete-certificate-content">
                    <div className="complete-congrats">CONGRATULATIONS</div>
                    <div className="complete-desc">We are glad to share the certificate to you. The certificate has been 
                    added to your website. You can check your profile for further certifications.</div>
                    <div className="complete-button"><a><button><Fontawesome name="external-link" /> &nbsp;Visit Your Website</button></a></div>
                    <div className="row mx-0" style={{justifyContent:"space-between"}}>
                        <div className="complete-button"><button><span class="downloadicon"></span>Download</button></div>
                        <div className="complete-button"><button><span class="shareicon"></span>Share <span className="mobile-hide">Certificate</span></button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CertificateComplete