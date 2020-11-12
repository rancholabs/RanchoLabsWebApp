import React, { useEffect } from 'react'
import './index.css'
import { useHistory } from 'react-router-dom'
import {setDefaultHeader, updateHeader} from './../../Actions/Header'
import { useDispatch } from 'react-redux'

const PageNotFound = () => {

    const history = useHistory()
    const goBack = () => {
      history.goBack()
    }

    const dispatch = useDispatch()
    
    useEffect(()=> {
        dispatch(updateHeader({backgroundColor: '#F0F0F2', color: '#171636', iconColor: '#0A0E2A'}))

        return () => {
          dispatch(setDefaultHeader())
        }
    }, [])

    return (
        <div className="page-not-found">
          <div className="pnf-card">
            <h2>Page Not Found</h2>
            <p>Looks like you've followed a broken link or entered a URL that doesn't exist on this site.</p>
            <div className="pnf-footer">
              <div className="text-success" onClick={goBack}> <b>&lt;</b> Go Back</div>
            </div>
          </div>
        </div>
    )
}

export default PageNotFound
