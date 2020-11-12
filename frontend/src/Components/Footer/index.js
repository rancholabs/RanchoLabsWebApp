import React, { useEffect, useRef } from 'react'
import {useSelector} from 'react-redux'
import './index.css'
import Logo from './../img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { useHistory } from 'react-router-dom'

const Footer = () => {
    const { appName, isIPadMiniMobileView } = useSelector((state) => state.appDetails)
    const { footerDisplay } = useSelector((state) => state.footer)
    const footerTop = useRef()
    const footerLinks = useRef()
    const footerBottom = useRef()

    const history = useHistory()
    const goHome = () => {
      history.push('/')
    }

    useEffect(() => {
      const onresize = () => {
          if(window.screen.width <= 600 || (isIPadMiniMobileView && window.screen.width <=768)) {
              footerTop.current.classList.add('mobile')
              footerLinks.current.classList.add('mobile')
              footerBottom.current.classList.add('mobile')
          }
          else {
              footerTop.current.classList.remove('mobile')
              footerLinks.current.classList.remove('mobile')
              footerBottom.current.classList.remove('mobile')
          }
      }
      window.addEventListener('resize', onresize)
      onresize()

      return () => {
          window.removeEventListener('resize', onresize)
      }
  }, [isIPadMiniMobileView])

  return (
    <footer style={{display:footerDisplay}}>
      <div className="footer-top" ref={footerTop}>
          <div className="flex">
              <div className="reach-us">
                <div className="logo" onClick={goHome}>
                    <img className="app-icon" alt="app-icon" src={Logo} />
                    <div className="app-name">{appName}</div>
                </div>
                <div className="logo-mob" onClick={goHome}>
                    <div className="name">{appName.split(' ').map((word) => { return word[0].toUpperCase() + word.substr(1).toLowerCase()}).join(' ')}</div>
                </div>
                <div className="reach-us-title">Reach Us</div>
                <div className="email-with-icon">
                    <FontAwesomeIcon className="icon" color="#3CFAFF" icon={faEnvelope} />
                    <span className="email">labs.rancho@gmail.com</span>
                </div>
                <div className="icon-list">
                    <FontAwesomeIcon className="icon" color="#3CFAFF" icon={faInstagram} />
                    <FontAwesomeIcon className="icon" color="#3CFAFF" icon={faFacebookF} />
                    <FontAwesomeIcon className="icon" color="#3CFAFF" icon={faLinkedinIn} />
                </div>
              </div>
              <div className="footer-links" ref={footerLinks}>
                <div className="flex">
                    <div>
                        <p className="head">EXPLORE</p>
                        <p>Robotics</p>
                        <p>Space Science</p>
                        <p>AR/VR</p>
                        <p>Artificial Intelligence</p>
                    </div>
                    <div className="company">
                        <p className="head">COMPANY</p>
                        <p>About us</p>
                        <p>Contact us</p>
                        <p>Careers</p>
                        <p>Terms and condition</p>
                    </div>
                </div>
              </div>
          </div>
      </div>
      <div className="footer-bottom" ref={footerBottom}>
        <p>@ Ranchovation Labs Pvt Ltd | Rancho Labs</p>
      </div>
    </footer>
  )
}

export default Footer
