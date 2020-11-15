import React, { useEffect } from 'react'
import './css/index.css'

import Main from './Main'
import Courses from './Courses'
import Learning from './Learning'
import Things from './ThingsYouSee'
import Journey from './Journey'
// import Signup from './Signup'
import StudentProjects from './StudentProjects'
import { useDispatch } from 'react-redux'
import { setDefaultHeader, updateHeader } from '../../Actions/Header'
import { setIsIpadMiniMobileView } from '../../Actions/App'
import Banner from './FreeclassBanner'
import { updateFooter } from '../../Actions/Footer'


function LandingPage({history})
{
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(updateHeader({backgroundColor: 'transparent'}))
        dispatch(updateFooter({footerDisplay:'block'}))
        return () => {
            dispatch(setDefaultHeader())
        dispatch(setIsIpadMiniMobileView(false))
        }
    }, [])
    return(
        <>
        <Main />
        <Courses />
        <Learning />
        <Things />
        <Journey />
        <StudentProjects />
        <Banner />
        {/* <Signup history = {history}/> */}
        </>

    )
}

export default LandingPage