import React, { useRef } from 'react'
import {useState, useEffect}  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {login, loginGoogle, loginFacebook} from '../../Actions/userAction'
import './css/LogIn.css'
import google from './img/google.png'
import facebook from './img/facebook.png'
import Modal from './../../Components/Modal'
import { GoogleSignIn } from '../../Components/SocialSignIn/Google'
import { FacebookSignIn } from '../../Components/SocialSignIn/Facebook'
import { Link, useHistory } from 'react-router-dom'
import { setDefaultHeader, updateHeader } from '../../Actions/Header'
import { setIsIpadMiniMobileView } from '../../Actions/App'
import { updateFooter } from '../../Actions/Footer'

function validateEmail(email){	
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;	
            if (reg.test(email) == false) 	
            {	
                return (false);	
            }	
            else	
            return true	
}


const LogIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const history = useHistory()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const signuplink = userInfo ? '/' : '/freeclass'
    
      const submitHandler = (e) => {
        e.preventDefault()
        if(password==="" || email ==="") {
            setMessage('Please fill all details')
        }
        else if(!(validateEmail(email))){	
            setMessage('Please enter a valid email address')	
        }
        else {
            dispatch(login(email, password))
        }
    }

    if(error)
        console.log('login error:',error)

    // const googleBtn = useRef()
    // const facebookBtn = useRef()

    useEffect(()=>{
        dispatch(setDefaultHeader())
        dispatch(updateHeader({backgroundColor: '#F0F0F2', color: '#171636', iconColor: '#0A0E2A'}))
        dispatch(setIsIpadMiniMobileView(true))
        dispatch(updateFooter({footerDisplay:'block'}))
        return () => {
            dispatch(setDefaultHeader())
            dispatch(setIsIpadMiniMobileView(false))
        }
    }, [])

    useEffect(() => {
        if(userInfo) {
            console.log(userInfo)

            if(userInfo.role === "student")
            {
                history.push('/dashboard')
            }
            else if(userInfo.role === "instructor"){
                history.push('/instructor/schedule') 
            }
            else{
                history.push('/') 
            }
        }
        else {
            // GoogleSignIn(googleBtn.current, loginGoogle, dispatch)
            // FacebookSignIn(facebookBtn.current, loginFacebook,  dispatch)
        }
    }, [userInfo])


    // useEffect(() => {
    //     if(userInfo) {
    //         history.replace(redirectingPath)
    //     }
    // }, [userInfo])

    return (
        <div>
            <div className="LogIn">

            {
                !userInfo &&
                <>
                <div className="row">
                    <div className="col-xl-5" style={{ textAlign: "center", marginTop: "auto" }}>
                        <div className="heading">Log in to your account</div>
                        <div className="content">Learn, build and Innovate with Rancho Labs</div>
                    </div>
                    <div className="col-xl-7">
                        <div className="card">
                            {/* <div className="row">
                                <div ref={googleBtn} className="col-6 p-0 llogo">
                                    <img src={google} alt="Google"></img>
                                    <div className="signupw">Login with Google</div>
                                </div>
                                <div ref={facebookBtn} className="col-6 p-0 llogo">
                                    <img src={facebook} alt="Facebook"></img>
                                    <div className="signupw">Login with Facebook</div>
                                </div>
                            </div>
                            <div className="row or d-flex" style={{ justifyContent: "center" }}>
                                <div className="col-4" style={{ paddingRight: "0", alignSelf: "center" }}>
                                    <hr style={{ margin: "0", borderColor: "#4D4D4F" }}></hr>
                                </div>
                                <div className="col-1" style={{ padding: "0", textAlign: "center", color: "#4D4D4F", fontSize: "1.255vw" }}>or</div>
                                <div className="col-4" style={{ paddingLeft: "0", alignSelf: "center" }}>
                                    <hr style={{ margin: "0", borderColor: "#4D4D4F" }}></hr>
                                </div>
                            </div> */}
                            <form onSubmit={submitHandler}>
                                <div className="row" style={{ margin: "unset" }}>
                                    <input type="text"
                                    name="email" 
                                    placeholder="Email Address" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}></input>
                                </div>
                                <div className="row" style={{ margin: "unset" }}>
                                    <input type="password"
                                    name="password" 
                                    placeholder="Password"
                                    value={password} onChange={(e) => setPassword(e.target.value)}></input>
                                </div>
                                <div className="forgotpass"><Link to="/forgotPassword">Forgot your password?</Link></div>
                                {message ? <p style={{color:"#FFFFFF",  marginBottom:"0"}}>{message}</p> : setMessage}	
	                            {error && <p style={{color:"#FFFFFF", marginBottom:"0"}}>{error.auth === false ? 'Invalid Username/Password' : error.user === false ? 'Seems like you have not registered account with us. Please signup to continue' : error.message}</p>}
                                <button type="submit" onClick = {submitHandler}>LOGIN</button>
                                <div className="login">New to Rancho Labs? <Link to={signuplink}>Sign Up</Link> here</div>
                            </form>
                        </div>
                    </div>
                </div>
                </>
            }
            </div>

            <div className="row llowerrow mr-0"></div>
        </div>
    )
}

export default LogIn