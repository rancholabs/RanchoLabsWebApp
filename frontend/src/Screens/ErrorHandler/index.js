import React, { useEffect } from 'react'
import './index.css'
import { useHistory } from 'react-router-dom'
import {setDefaultHeader, updateHeader} from './../../Actions/Header'
import { useDispatch } from 'react-redux'

const ErrorHandler = (props) => {

    const history = useHistory()
    const goHome = () => {
      history.push('/')
    }
    console.log(props.location.search)
    const message = props.location.search ? props.location.search.split("=")[1] : 'Unknown Error';
    const dispatch = useDispatch()
    
    useEffect(()=> {
        dispatch(updateHeader({backgroundColor: '#F0F0F2', color: '#171636', iconColor: '#0A0E2A'}))

        return () => {
          dispatch(setDefaultHeader())
        }
    }, [])

    return (
        <div className="error-handler">
          <div className="eh-card">
            <h2 className="text-danger">Error</h2>
            <p>{message}</p>
            <div className="eh-footer">
              <div className="text-success" onClick={goHome}> <b>&lt;</b> Home</div>
            </div>
          </div>
        </div>
    )
}

export default ErrorHandler
