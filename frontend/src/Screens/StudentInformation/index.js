import React from 'react'
import './css/StudentInfo.css'
import {useState, useEffect}  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {update, updateUserInfo} from '../../Actions/userAction'
import {updateHeader, setDefaultHeader} from '../../Actions/Header'
import codes from './codes'

function validateEmail(email){	
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;	
            if (reg.test(email) == false) 	
            {	
                return (false);	
            }	
            else	
            return true	
}

const StudentInfo = ( { history, location} ) => {

    const dispatch = useDispatch()

    const [fname, setFname] = useState('')	
    const [lname, setLname] = useState('')	
    const [pcontact, setPcontact] = useState('')	
    const [pdialcode, setPdialcode] = useState('+91')
    const [grade, setGrade] = useState('6')	
    const [email, setEmail] = useState('')	
    const [message, setMessage] = useState(null)
	
    const [isSubmitted, setIsSubmitted] = useState(false)

    const {userInfo} = useSelector((state) => state.userRegister)
    const { userInfo: loginUserInfo} = useSelector(state => state.userLogin)
    const {isUpdated} = useSelector((state) => state.studenInfo)
    const redirectPath = location.pathname

    const parentDetails = {
        "name": {
            "first": fname,
            "last": lname
        },		
	    "mobileNo": {
            "code": pdialcode,
            "number": pcontact
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if(fname==="" || pcontact==="" || grade==="" || email==="" )	
        {	
            setMessage('Please fill all details')	
        }else if(!(validateEmail(email))){	
            setMessage('Please enter a valid email address')	
        }	
        else {
            dispatch(update(parentDetails, grade))
            setIsSubmitted(true)
        }
    }

    useEffect(() => {
        dispatch(updateHeader({backgroundColor: '#0A0E2A'}))
        return () => {
            dispatch(setDefaultHeader())
        }
    }, [])

    useEffect(() => {
        if(!userInfo && !loginUserInfo) {
            const path='/login'
            history.replace(`${path}?redirect=${redirectPath}`)
        }
    }, [userInfo, loginUserInfo])

    useEffect(() => {
        if(isSubmitted && isUpdated) {
            if(userInfo)
                dispatch(updateUserInfo(userInfo))
            history.replace('/dashboard?mode=signup')
        }
    }, [isSubmitted, isUpdated])

    return (
        <div className="StudentInfo">
            <div className="row">
                <div className="col-xl">
                    <div className="card">
                        <form>
                            <div className="row">
                                <div className="col-lg-6">
                                    <label for="parent-fname">PARENT'S FIRST NAME<span className="important-field">*</span></label>
                                    <input type="text"
                                        name="parent-fname"
                                        placeholder="Parent's First Name here"
                                        value={fname}
                                        onChange={(e) => setFname(e.target.value)}></input>
                                </div>
                                <div className="col-lg-6">
                                    <label for="parent-lname">PARENT'S LAST NAME</label>
                                    <input type="text"
                                        name="parent-lname"
                                        placeholder="Parent's Last Name here "
                                        value={lname}
                                        onChange={(e) => setLname(e.target.value)}></input>
                                </div>
                            </div>
                            <label>PARENT'S CONTACT NUMBER<span className="important-field">*</span></label>
                            <div className="row mx-0">
                            <div className="pr-0" id="p-dialcode">
                                <input list="pdialcodes" name="country-code" className="border-right"
                                    placeholder="+91"
                                    value={pdialcode}
                                    onChange={(e) => setPdialcode(e.target.value)}
                                    style={{paddingLeft:"1vw"}} />
                                <datalist id="pdialcodes">
                                {
                                    codes.map(code => <option value={code.dial_code}>{code.dial_code} ({code.name})</option>)
                                }
                                </datalist>
                            
                            </div>
                            <div className="pl-0" id="p-contact">
                                <input type="text" name="parent-contact"
                                placeholder="Contact number"
                                value={pcontact}
                                onChange={(e) => setPcontact(e.target.value)}></input>
                            </div></div>
                            <label for="email">PARENT'S EMAIL<span className="important-field">*</span></label>
                            <input type="text" name="email"
                                placeholder="labsrancho@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}></input>
                            <label for="class">CLASS YOU STUDY IN<span className="important-field">*</span></label>
                            <select value={grade} onChange={(e) => setGrade(e.value)}>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                            </select>
                            {message ? <p style={{color:"red"}}>{message}</p> : setMessage}
                            <button type="submit" className="submit d-flex mx-auto" onClick={submitHandler}>SIGNUP</button>
                        </form>
                    </div>
                </div>
                <div className="col-xl" style={{ textAlign: "right" }}>
                    <div className="welcome">
                        WELCOME<br /> to Rancho Labs<br /><br /><span id="step">One more step for a <br />better learning experience</span><br /><br />KEEP LEARNING<br /> BUILDING<br /> and <br />INNOVATING
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentInfo