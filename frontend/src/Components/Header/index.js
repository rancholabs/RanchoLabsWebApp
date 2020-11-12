import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from 'react-redux'
import './index.css'
import Logo from './../img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import SideNav from '../SideNav'
import { useHistory } from 'react-router-dom'

const Header = () => {
    const header = useRef()
    const { appName, isIPadMiniMobileView } = useSelector((state) => state.appDetails)
    const { backgroundColor, color, iconColor, iconDisplay, headerDisplay } = useSelector((state) => state.header)
    const [isNavOpen, setIsNavOpen] = useState(false)
    const navOpenHandler = () => {
        setIsNavOpen(true)
    }
    const navCloseHandler = () => {
        setIsNavOpen(false)
    }
    const history = useHistory()
    const goHome = () => {
      history.push('/')
    }

    useEffect(() => {
        const onresize = () => {
            if(window.screen.width <= 600 || (isIPadMiniMobileView && window.screen.width <=768))
                header.current.classList.add('mobile')
            else
                header.current.classList.remove('mobile')
        }
        window.addEventListener('resize', onresize)
        onresize()

        return () => {
            window.removeEventListener('resize', onresize)
        }
    }, [isIPadMiniMobileView])

    return (
        <div>
            <header className="header" ref={header} style={{backgroundColor: backgroundColor, display: headerDisplay}}>
                <div className="header-app-line">
                    <div className="logo" onClick={goHome}>
                        <img className="app-icon" alt="app-icon" src={Logo} />
                        <div className="app-name" style={{color: color}}>{appName}</div>
                    </div>
                    {isNavOpen ?
                        (
                            <SideNav isOpen={isNavOpen} navCloseHandler={navCloseHandler} />
                        ) 
                        : 
                        (
                            <div className="nav-menu">
                                <svg aria-hidden="true" onClick={() => navOpenHandler(true)} style={{color: iconColor, display:iconDisplay}} focusable="false" data-prefix="far" data-icon="bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-bars fa-w-14 fa-3x nav-menu-icon"><path fill="currentColor" d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z" className=""></path></svg>
                            </div>
                        )
                    }
                </div>
            </header>
        </div>
    )
}

export default Header
