import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserForgotPassword } from '../../Actions/userAction'
import './css/ForgotPass.css'

import robot from './img/robot.png'
// import robot2 from './img/robot2.png'

function ForgotPass(){

    const [email, setEmail] = useState('')
    const [mailSent, setMailSent] = useState(false)
    const {error, isMailSent} = useSelector(state => state.userForgotPassword )
    const dispatch = useDispatch()

    useEffect(() => {
        if(isMailSent) {
            setMailSent(true)
        }
    }, [isMailSent])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(UserForgotPassword(email))
    }

    return(
        <div>
        <div className="ForgotPass">
            <div className="row">
                <div className="col-xl-5" style={{textAlign:"center", alignSelf:"flex-end"}}>
                    <div className="heading">{!mailSent ? "eh? It's difficult to remember" : "Great !" }</div>
                    <div className="content">{!mailSent ? "Forgot your password? no worries" : "It's almost done"} </div>
                </div>
                <div className="col-xl-7">
                    <div className="card">
                        {mailSent ? (
                            <div className="mail-sent">
                                A <span className="link-message">link has been sent to your registered Email id</span>. Please go to your Email account and <br />
                                set your new password. <br /><br />
                                KEEP LEARNING <br />
                                BUILDING <br />
                                and <br />
                                INNOVATING <br /><br />
                                <span className="come-back">COME BACK SOON !</span>
                            </div>
                        ) : error ? (
                            <div className="error">{error}</div>
                        ) : (
                           <>
                             <div className="row" style={{textAlign:"center"}}>
                                <div className="questionmark d-flex mx-auto">?</div>
                            </div>
                            <form>
                                <div className="row" style={{margin:"unset"}}>
                                    <input type="text" id="email" name="email" placeholder="Email Address"
                                    onChange={(e) => setEmail(e.target.value)} value={email}></input>
                                </div>
                                <button type="submit" onClick={submitHandler}>RESET PASSWORD</button>
                            </form>
                           </>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <div className="row flowerrow mr-0">
            <img src={robot} alt="robot"></img>
        </div>
        </div>
    )
}

export default ForgotPass