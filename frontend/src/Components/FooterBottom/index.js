import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const FooterBottom = () => {

    const { isIPadMiniMobileView } = useSelector((state) => state.appDetails)
    const footerBottom = useRef()

    useEffect(() => {
        const onresize = () => {
            if(window.screen.width <= 600 || (isIPadMiniMobileView && window.screen.width <=768)) {
                footerBottom.current.classList.add('mobile')
            }
            else {
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
        <footer>
            <div className="footer-bottom" ref={footerBottom}>
                <p>@ Ranchovation Labs Pvt Ltd | Rancho Labs</p>
            </div>
        </footer>
    )
}

export default FooterBottom
