import React, { useEffect, useState } from 'react'
import './InstructorMenu.css'
import deepak from './img/deepak.png'
import dashboard from './img/dashboardactive.png'
import Fontawesome from 'react-fontawesome'
import { updateFooter } from '../../Actions/Footer'
import { setDefaultHeader, updateHeader } from '../../Actions/Header'
import { useDispatch } from 'react-redux'

const InstructorMenu = ({location}) => {

    const dispatch = useDispatch()

    const [pclass, setPclass] = useState('')
    const [dclass, setDclass] = useState('')

    const active = window.location.pathname.split('instructor/')[1] 

    
    useEffect(()=>{
        if(active === 'profile')
        {setPclass('active-section')}
        else if(active === 'schedule')
        {setDclass('active-section')}
    })

    useEffect(()=>{
        dispatch(updateHeader({backgroundColor: '#171636', color: '#FFFFFF', iconColor: '#3CFAFF', iconDisplay: 'block', headerDisplay: 'none'}))
        dispatch(updateFooter({footerDisplay: 'none'}))
    })

    return(
        <>
            <div className="instructor-menu">
                <div className="instructor-pic">
                    <img src={deepak} className="img-fluid" alt=""></img>
                </div>
                <div className="instructor-greeting">Hi Deepak!</div>
                <div className="instructor-greeting-desc">Keep learning building and innovating</div>
                <div className="links">
                    <div className={dclass}>
                        <a href="/instructor/schedule">
                        {/* <img src={dashboard} /> */}
                        <Fontawesome name="th-large" />
                        <div className="section-name">Dashboard</div>
                        </a>
                    </div>
                    <div className={pclass}>
                        <a href="/instructor/profile" >
                        <Fontawesome name="user" />
                        <div className="section-name">Profile</div>
                        </a>
                    </div>
                    {/* <div className="">
                        <Fontawesome name="comment" /> 
                        <div className="section-name">Inbox</div>
                    </div>
                    <div className="">
                        <Fontawesome name="calendar" />
                        <div className="section-name">Schedule</div>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default InstructorMenu