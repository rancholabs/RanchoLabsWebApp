import React, { useEffect, useState } from 'react'
import Fontawesome from 'react-fontawesome'
import './css/InstructorProfile.css'
import codes from './codes'
import InstructorMenu from '../../Components/InstructorMenu'
import deepak from './img/deepak.png'
import { useDispatch, useSelector } from 'react-redux'
import { instructorInfo } from '../../Actions/Instructor'
import { update, logout, sendMessage } from '../../Actions/userAction'
import { useHistory } from 'react-router-dom'
import { setDefaultFooter } from '../../Actions/Footer'
import { setDefaultHeader } from '../../Actions/Header'
import $ from 'jquery'

function validateEmail(email){	
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;	
            if (reg.test(email) == false) 	
            {	
                return (false);	
            }	
            else	
            return true	
}

const InstructorProfile = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [edit, setedit] = useState(false)
    const [message, setMessage] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [contact, setContact] = useState('')
    const [dialcode, setdialcode] = useState('+91')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rpassword, setRpassword] = useState('')
    const [vpassword, setVpassword] = useState(false)
    const [vrpassword, setVrpassword] = useState(false)
    const [instructorMessage, setInstructorMessage] = useState('')

    const { userInfo } = useSelector((state) => state.userLogin)
    const { loading, error, instructorInfo:instructor } = useSelector((state) => state.instructorInfo)
    const { isUpdated } = useSelector((state) => state.userUpdate)

    function setForm(){
        setedit(true)
    }

    useEffect(()=>{
        if(isUpdated)
        {
            setedit(false)
            alert('Profile Updated!')
        }
    },[isUpdated])

    useEffect(()=>{
        if(userInfo){
            dispatch(instructorInfo())
        }
        else{
            history.replace('/login')
            dispatch(setDefaultFooter)
            dispatch(setDefaultFooter)
        }
        if(instructor && !edit){
            setFname(instructor.name.first)
            setLname(instructor.name.last)
            setdialcode(instructor.mobileNo.code)
            setContact(instructor.mobileNo.number)
            setEmail(instructor.email)
            setPassword(instructor.password)
            setRpassword(instructor.password)
        }
        var form = document.getElementById("info");
        var elements = form.elements;
        for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].disabled = !edit;

        document.getElementById('save').disabled = !edit
        }
    },[userInfo, history])

    useEffect(() => {

        if(instructor && !edit){
            setFname(instructor.name.first)
            setLname(instructor.name.last)
            setdialcode(instructor.mobileNo.code)
            setContact(instructor.mobileNo.number)
            setEmail(instructor.email)
            setPassword(instructor.password)
            setRpassword(instructor.password)
        }

        var form = document.getElementById("info");
        var elements = form.elements;
        for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].disabled = !edit;

        document.getElementById('save').disabled = !edit
    }})

    const saveHandler = (e) => {
        setMessage('')
        if(email === "" || fname==="" || lname==="" || contact === "" || password === "" || rpassword === "" || dialcode === "")	
        {	
            setMessage('Please fill all details')

        }else if(!(validateEmail(email))){	
            setMessage('Please enter a valid email address')	
        } 
        else if(password != rpassword){
            setMessage('Passwords donot match')	
        }else{
            const updateInfo = {
                "email" : email,
                "name" : {
                    "first" : fname,
                    "last" : lname
                },
                "mobileNo" : {
                    "code" : dialcode,
                    "number" : contact
                },
                "password" : password
            }

            dispatch(update(updateInfo))
        }
    }

    const LogoutInstructor = () => {
        dispatch(logout())
    }

    const MessageHandler = () => {
        if(instructorMessage != '')
        {
            dispatch(sendMessage( instructor.name.first, instructor.email,  instructorMessage))
            setInstructorMessage('')
        }
    }

        useEffect(() => {
            $("#profile-pic").click(function(e) {
                $("#upload-pic").click();
            });
        },[])

        function fasterPreview( uploader ) {
            if ( uploader.files && uploader.files[0] ){
                  $('#instructor-pic').attr('src', 
                     window.URL.createObjectURL(uploader.files[0]) );
            }
        }

        useEffect(() => {
            $("#upload-pic").change(function(){
                fasterPreview( this );
            });
        })
        

    return(
        <>
            <InstructorMenu />
            <div className="instructor-profile">
                <div className="row mx-0">
                    <div>
                    <div className="profile-logout text-center">
                        <div className="profile-pic">
                            <img src={deepak} id="instructor-pic" alt="" />
                            <input type="file" id="upload-pic" className="upload-pic" capture/>
                            <span id="profile-pic"><Fontawesome name="camera"></Fontawesome></span>
                            <div className="instructor-name">{fname} {lname}</div>
                        </div>
                        <div className="logout-button">
                            <button onClick={LogoutInstructor}>Log Out</button>
                        </div>
                    </div>

                    <div className="profile-help">
                        <div className="profile-help-top text-center">
                            <Fontawesome name="question-circle"  style={{marginRight:"calc(29*var(--vp))", fontSize:"calc(32*var(--vp))"}}/>
                            Need any Help?
                        </div>
                        <div className="message">
                            <textarea placeholder="Write to us" 
                            value={instructorMessage}
                            onChange={(e) => setInstructorMessage(e.target.value)}/>
                        </div>
                        <div className="send-button">
                            <button onClick={MessageHandler}>Send Message</button>
                        </div>
                    </div>
                    </div>
                    <div className="personal-info">
                        <div className="personal-info-title">Personal Info<button onClick={setForm}><Fontawesome name="pencil-square-o" /></button></div>
                        <form id="info">
                            <div className="row mx-0" style={{justifyContent:"space-between"}}>
                                <div className="name">
                                    <label for="fname">First Name</label>
                                    <input type="text" 
                                    placeholder="First Name" 
                                    value={fname}
                                    onChange={(e) => setFname(e.target.value)}/>
                                </div>
                                <div className="name">
                                    <label for="fname">Last Name</label>
                                    <input type="text" 
                                    placeholder="Last Name" 
                                    value={lname}
                                    onChange={(e) => setLname(e.target.value)}/>
                                </div>
                            </div>
                            <label for="fname" style={{marginTop:"calc(39*var(--vp))"}}>Contact Number</label>
                            <div className="row mx-0" style={{justifyContent:"space-between"}}>
                                <div className="dial-code">
                                <input list="pdialcodes" 
                                name="country-code" 
                                placeholder="+91"
                                value={dialcode}
                                onChange={(e) => setdialcode(e.target.value)}/>
                                <datalist id="pdialcodes">
                                {
                                    codes.map(code => <option value={code.dial_code}> {code.name}</option>)
                                }
                                </datalist>
                                </div>
                                <div className="contact-no">
                                    <input type="text" 
                                    placeholder="Contact Number"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)} />
                                </div>
                            </div>
                            <label for="email" style={{marginTop:"calc(25*var(--vp))"}}>Email Id</label>
                            <input type="text" 
                            placeholder="Email Id"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                            <label for="password" style={{marginTop:"calc(35*var(--vp))"}}>Reset Password</label>
                            <div className="row mx-0" style={{justifyContent:"space-between",marginTop:"calc(18*var(--vp))", marginBottom:"calc(39*var(--vp))", alignItems:"center"}}>
                                <div><label for="new-password" style={{marginBottom:"0"}}>New Password</label></div>
                                <div className="row mr-0 ml-auto">
                                <div className="password">
                                    <input type="password" 
                                    placeholder="New Password" 
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div>
                                    <label className="visibility d-flex align-items-center">
                                       <input type="checkbox" 
                                       onChange={()=>{
                                           document.getElementById('password').type= (!vpassword ? 'text' : 'password')
                                           setVpassword(!vpassword)
                                        }}/>
                                       {
                                           !vpassword ? 
                                           <Fontawesome name="eye-slash" />:
                                           <Fontawesome name="eye" />
                                       }
                                    </label>
                                </div>
                                </div>
                            </div>
                            <div className="row mx-0" style={{justifyContent:"space-between", alignItems:"center", marginBottom:"calc(45*var(--vp))"}}>
                                <div><label for="repeat-password" style={{marginBottom:"0"}}>Repeat Password</label></div>
                                <div className="row mx-0">
                                <div className="password row mr-0 ml-auto">
                                    <input type="password" 
                                    placeholder="Repeat Password" 
                                    id="rpassword"
                                    value={rpassword}
                                    onChange={(e) => setRpassword(e.target.value)}/>
                                </div>
                                <div>
                                <label className="visibility d-flex align-items-center">
                                <input type="checkbox" 
                                onChange={()=>{
                                        document.getElementById('rpassword').type= (!vrpassword ? 'text' : 'password')
                                        setVrpassword(!vrpassword)
                                    }}/>
                                       {
                                           !vrpassword ? 
                                           <Fontawesome name="eye-slash" />:
                                           <Fontawesome name="eye" />
                                       }
                                    </label>
                                </div>
                                </div>
                            </div>
                            {message && <p> {message}</p>}
                            <button id="save" onClick={saveHandler}>Save Details</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InstructorProfile