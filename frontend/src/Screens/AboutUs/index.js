import React, { useEffect } from 'react'
import AboutUsMain from './AboutUsMain'
import AboutUsWhatweDo from './AboutUsWhatweDo'
import AboutUsThoughtprocess from './AboutUsThoughtprocess'
import AboutUsInvest from './AboutUsinvest'
import AboutUsWhereweStand from './AboutUsWhereweStand'
import AboutUsFamily from './AboutUsFamily'
import AboutUsContact from './AboutUsContact'
import AbouUsGallery from './AboutUsGallery'
import { useDispatch } from 'react-redux'
import { updateHeader } from '../../Actions/Header';
// import AboutUsCallModal from './AboutUsCallModal'

const AboutUs = () =>
{
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateHeader({backgroundColor: '#0A0E2A', color: '#FFFFFF', iconColor: '#3CAFF'}))
    }, [])

    return(
        <>
            <AboutUsMain />
            <AboutUsWhatweDo />
            <AboutUsThoughtprocess />
            <AboutUsInvest />
            <AboutUsWhereweStand />
            <AboutUsFamily />
            <AbouUsGallery />
            <AboutUsContact />
            {/* <AboutUsCallModal /> */}
        </>
    )
}

export default AboutUs