import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import { validateToken } from '../../Actions/userAction'

const ValidateResetLink = () => {
    const { isValid, error } = useSelector((state) => state.userValidateToken)
    const {token} = useParams()
    const dispatch = useDispatch()
    console.log(error)
    useEffect(() => {
        dispatch(validateToken(token))
    }, [])
    return (
        <div>
            {isValid ? (
                <Redirect to="/resetPassword" />
            ) : isValid !== undefined ? (
                <div className="text-danger text-center">
                    {error}
                </div>
            ) : (
                <div className="text-warning">
                    Loading...
                </div>
            )}
        </div>
    )
}

export default ValidateResetLink
