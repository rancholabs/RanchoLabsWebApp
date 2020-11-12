import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './css/CreateAcc.css'
import google from './img/google.png'
import facebook from './img/facebook.png'
import { register } from '../../Actions/userAction'

const CreateAcc = ({ location, history }) => {

    const [fname, setfName] = useState('')
    const [lname, setlName] = useState('')
    const [email, setEmail] =  useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'


    useEffect(() => {
        if (userInfo) {
          history.push(redirect)
        }
      }, [history, userInfo, redirect])
    
      const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
          setMessage('Passwords do not match')
        } else {

          const name = {
              "fname" : fname,
              "lname" : lname
          }  

          dispatch(register(name, email, password))
        }
      }

    return(
        <div>
            {
                error && <Popup message = {} symbol = {}></Popup>
            }
            <div className="CreateAcc">
            <div className="row">
                <div className="col-xl-5" style={{textAlign:"center", marginTop:"auto"}}>
                    <div className="heading">Create your account</div>
                    <div className="content">Learn, build and Innovate with Rancho Labs</div>
                </div>
                <div className="col-xl-7">
                    <div className="card">
                        <div className="row">
                            <div className="col-6 clogo">
                                <img src={google} alt="Google"></img>
                                <div className="signupw">Sign up with Google</div>
                            </div>
                            <div className="col-6 clogo">
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
                            {message ? <p style={{color:"#FFFFFF"}}>{message}</p> : setMessage} 
                            {error && <p style={{color:"#FFFFFF"}}>{error.message}</p>} 

                            <button type="submit">SIGNUP</button>
                            <div className="login">Already have an account? <a href = {redirect ? `/login?redirect=${redirect}` : '/loginAccount'}>Log in</a> here</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
            <div className="row clowerrow"></div>
        </div>
    )
}

export default CreateAcc