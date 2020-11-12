import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setIsIpadMiniMobileView } from '../../Actions/App'
import { setDefaultHeader, updateHeader } from '../../Actions/Header'
import ResetPass from './ResetPass'

function ResetPassword({location})
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
            <ResetPass location={location} />
        </>
    )
}

export default ResetPassword