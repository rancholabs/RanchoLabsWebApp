import React from 'react'
import {useState, useEffect}  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './css/WSignup.css'
import { register, resetError } from '../../Actions/userAction'
import ai from './img/mobileai.png'
import signup from './img/signup.png'
import { Link, useHistory } from 'react-router-dom'


const FormComponent = (props) => {

    var history = props.history

    const [email, setEmail] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')

    const hHistory = useHistory()
	
    function validateEmail(email){	
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;	
                if (reg.test(email) === false) 	
                {	
                    return (false);	
                }	
                else	
                return true	
    }

    const dispatch = useDispatch()
	
    const userWorkshopRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo, isRegistered } = userWorkshopRegister
    const [message, setMessage] = useState(null)
    const [isEmailExists, setIsEmailExists] = useState(false)
    const {userInfo: loginUserInfo} = useSelector(state => state.userLogin)

    useEffect(() => {
        if(loginUserInfo) {
            hHistory.replace('/freeWorkshop')
        }
    }, [loginUserInfo])

    useEffect(() => {
        if(isRegistered) {
            hHistory.push('/setPassword')
        }
    }, [isRegistered])

    const submitHandler = (e) => {
        e.preventDefault()
        if(email ==="" || fname==="" || lname === "")	
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
    
            dispatch(register(name, email))	
        }
    }

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

    return (
        <form>
            <label for="location">FIRST NAME<span className="important-field">*</span></label>
            <input type="text"
                name="fname"
                placeholder="First name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}></input>
            <label for="location">LAST NAME<span className="important-field">*</span></label>
            <input type="text"
                name="email"
                placeholder="Last name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}></input>
            <label for="email">EMAIL ADDRESS<span className="important-field">*</span></label>
            <input type="text"
                name="email"
                placeholder="LabsRancho@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}></input>
            {/* <input type="text" id="class" name="class" placeholder="10th"></input> */}
            {/* <label for="workshop">CHOOSE WORKSHOP</label> */}
            {/* <input type="text" id="workshop" name="workshop" placeholder="Robotics"></input> */}
            {message ? <p style={{color:"#70707A", marginBottom:"0"}}>{message}</p> : setMessage} 
            {isEmailExists ? <p style={{color:"#70707A", marginBottom:"0"}}>Seems like you already have an account with us. Please <Link to="/login">login</Link> to continue</p> : ''} 
            <center><button type="submit" className="btn submit mx-auto" onClick={submitHandler}>SUBMIT</button></center>
        </form>
    )
}

function Signup( props ) {

    return (
        <div className="signup">
            <div className="row">
                <div className="col card">
                    <div className="form-tag">TRY IT YOURSELF</div>
                    <div className="form-title">Sign up for a free workshop</div>
                    <FormComponent history = {props.history}/>
                </div>
                <div className="col">
                    <img src={ai} alt="drone"></img>
                </div>
            </div>
        </div>
    )
}

function MobileSignUp(props) {

    return (
        <div className="mobilesignup card">
            <div className="row">
                <img src={signup} alt="drone"></img>
            </div>
            <div className="form-tag">TRY IT YOURSELF</div>
            <div className="form-title">Sign up for a free workshop</div>
            <FormComponent history = {props.history}/>
        </div>
    )
}

function WorkshopSignUpForm( props ) {
    return (
        <>
            <Signup history = {props.history}/>
            <MobileSignUp history = {props.history}/>
        </>
    )
}

export default WorkshopSignUpForm