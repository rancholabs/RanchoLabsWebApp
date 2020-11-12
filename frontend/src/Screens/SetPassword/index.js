import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setIsIpadMiniMobileView } from '../../Actions/App'
import { setDefaultHeader, updateHeader } from '../../Actions/Header'
import SetPass from './SetPass'

function SetPassword({location})
{
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(updateHeader({backgroundColor: '#F0F0F2', color: '#171636', iconColor: '#0A0E2A'}))
        dispatch(setIsIpadMiniMobileView(true))
        return () => {
            dispatch(setDefaultHeader())
            dispatch(setIsIpadMiniMobileView(false))
        }
    }, [])

    return(
        <>
            <SetPass location={location} />
        </>
    )
}

export default SetPassword