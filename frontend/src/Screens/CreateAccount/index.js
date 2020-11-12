import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './css/CreateAcc.css'
import google from './img/google.png'
import facebook from './img/facebook.png'
import { register, registerGoogle, registerFacebook, updateUserInfo, resetError } from '../../Actions/userAction'
import EmailExistsAlertModal from './EmailExistsAlertModal'
import { GoogleSignIn } from '../../Components/SocialSignIn/Google'
import { FacebookSignIn } from '../../Components/SocialSignIn/Facebook'
import { Link, Redirect } from 'react-router-dom';
import { setDefaultHeader, updateHeader } from '../../Actions/Header';
import { setIsIpadMiniMobileView } from '../../Actions/App';

function validateEmail(email){	
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;	
            if (reg.test(email) == false) 	
            {	
                return (false);	
            }	
            else	
            return true	
}

const CreateAcc = ({ history }) => {

    const [fname, setfName] = useState('')
    const [lname, setlName] = useState('')
    const [email, setEmail] =  useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [isEmailExists, setIsEmailExists] = useState(false)

    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    
      const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
          setMessage('Passwords do not match')
        } else if(password==="" || confirmPassword==="" || email ==="" || fname==="" || lname === "")	
        {	
            setMessage('Please fill all details')	
        } else if(!(validateEmail(email))){	
            setMessage('Please enter a valid email address')	
        }else	
         {	
          const name = {	
              "first" : fname,	
              "last" : lname	
          }  	
    
          dispatch(register(name, email, password))	
        }
      }

    const googleBtn = useRef()
    const facebookBtn = useRef()

    useEffect(() => {
        GoogleSignIn(googleBtn.current, registerGoogle, dispatch)
        FacebookSignIn(facebookBtn.current, registerFacebook, dispatch)
        dispatch(updateHeader({backgroundColor: '#F0F0F2', color: '#171636', iconColor: '#0A0E2A'}))
        dispatch(setIsIpadMiniMobileView(true))
        return () => {
            dispatch(setDefaultHeader())
            dispatch(setIsIpadMiniMobileView(false))
          }
    }, [])

    useEffect(() => {
        if(userInfo) {
            history.replace('/studentInfo')
        }
    }, [userInfo])

    useEffect(() => {
        if(error) {
            if(error && error.emailExists) {
                setIsEmailExists(true)
            }
        }
        return () => {
            if(error)
                dispatch(resetError())
        }
    }, [error])

    const closeHandler = () => {
        setIsEmailExists(false)
    }

    return(
        <div>
        {
            (isEmailExists) ?
            <>
                <EmailExistsAlertModal closeHandler={closeHandler} />
            </>:
            <>
            <div className="CreateAcc">
            <div className="row">
                <div className="col-xl-5" style={{textAlign:"center", marginTop:"auto"}}>
                    <div className="heading">Create your account</div>
                    <div className="content">Learn, build and Innovate with Rancho Labs</div>
                </div>
                <div className="col-xl-7">
                    <div className="card">
                        <div className="row">
                            <div ref={googleBtn} className="col-6 p-0 clogo">
                                <img src={google} alt="Google"></img>
                                <div className="signupw">Sign up with Google</div>
                            </div>
                            <div ref={facebookBtn} className="col-6 p-0 clogo">
                                <img src={facebook} alt="Facebook"></img>
                                <div className="signupw">Sign up with Facebook</div>
                            </div>
                            
                        </div>
                        <div className="row or d-flex" style={{justifyContent:"center"}}>
                                <div className="col-4" style={{paddingRight:"0", alignSelf:"center"}}>
                                <hr style={{margin:"0", borderColor:"#4D4D4F"}}></hr>
                                </div>
                                    <div className="col-1"style={{padding:"0", textAlign:"center", color:"#4D4D4F",fontSize:"1.255vw"}}>or</div>
                                <div className="col-4" style={{paddingLeft:"0", alignSelf:"center"}}>
                                <hr style={{margin:"0", borderColor:"#4D4D4F"}}></hr>
                                </div>
                            </div>
                        <form onSubmit = {submitHandler}>
                            <div className="row">
                                <div className="col-6" style={{paddingRight:"0.5rem"}}>
                                    <input type="text" 
                                    name="fname"
                                    placeholder="First Name"
                                    value={fname}
                                    onChange = {(e) => setfName(e.target.value)}></input>
                                </div>
                                <div className="col-6" style={{paddingLeft:"0.5rem"}}>
                                    <input type="text"
                                    name="lname" 
                                    placeholder="Last Name"
                                    value={lname}
                                    onChange = {(e) => setlName(e.target.value)}></input>
                                </div>
                            </div>
                            <div className="row" style={{margin:"unset"}}>
                                <input type="text" 
                                name="email" 
                                placeholder="Email Address"
                                value = {email}
                                onChange = {(e) => setEmail(e.target.value)}></input>
                            </div>
                            <div className="row">
                                <div className="col-6" style={{paddingRight:"0.5rem"}}>
                                    <input type="password"
                                    name="password"
                                    placeholder="Password"
                                    value = {password}
                                    onChange = {(e) => setPassword(e.target.value)}></input>
                                </div>
                                <div className="col-6" style={{paddingLeft:"0.5rem"}}>
                                    <input type="password"
                                    name="cpassword" 
                                    placeholder="Confirm Pasword"
                                    value = {confirmPassword}
                                    onChange = {(e) => setConfirmPassword(e.target.value)}></input>
                                </div>
                            </div>
                            {message ? <p style={{color:"#FFFFFF", marginBottom:"0"}}>{message}</p> : setMessage} 
                            <button type="submit">SIGNUP</button>
                            <div className="login">Already have an account? <Link to="/login">Log in</Link> here</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
            </>
        }
            <div className="row clowerrow"></div>
        </div>
    )
}

export default CreateAcc
