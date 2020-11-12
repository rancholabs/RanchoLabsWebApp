import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './css/AboutUsContact.css'
import contactus from './img/contactus.png'
import 'font-awesome/css/font-awesome.min.css';
import FontAwesome from 'react-fontawesome'
import { sendMessage } from '../../Actions/userAction'
import AboutUsCallModal from './AboutUsCallModal'
import './css/AboutUsCallModal.css'
import { callbackRequest } from '../../Actions/userAction'

const ContactUs = () => {

    const dispatch = useDispatch()

    const [modal, setModal] = useState(false)

    if (modal) {
        document.body.style.overflow = "hidden"
    }

    function showmodal() {
        setModal(!modal)
    }

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [cname, setCname] = useState('')
    const [cnumber, setCnumber] = useState('')
    const [errormessage1, setErrormrssage1] = useState('')
    const [errormessage2, setErrormrssage2] = useState('')
    const [requested, setRequested] = useState(false)
    const [response, setResponse] = useState(false)

    const submithandler = (e) => {
        e.preventDefault()
        if (name === "" || email === "" || message === "") {
            setErrormrssage1('Please fill all the details')
        }
        else {
            dispatch(sendMessage(name, email, message))
            setResponse(true)
        }
    }


    const callrequest = (e) => {
        e.preventDefault()
        if (cname === "" || cnumber === "") {
            setErrormrssage2('Please fill all the details')
        }
        else {
            dispatch(callbackRequest(cname, cnumber))
            setRequested(true)
        }
    }

    function clickedclose() {
        document.body.style.overflow = "scroll"
        setModal(false)
        setRequested(false)
    }

    function clickedclose2() {
        document.body.style.overflow = "scroll"
        setResponse(false)
    }

    if (response) {
        document.body.style.overflow = "hidden"
    }

    return (
        <div className="aboutus-contactus-outer">
            <div className="aboutus-contactus">
                <div className="row mx-0">
                    <div className="send-message">
                        <div className="contactus-title">We'd love to hear from you</div>
                        <hr />
                        <div className="messagebox-email">
                            <input type="text" placeholder="Your name here" name="name" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="messagebox-email">
                            <input type="text" placeholder="Your e-mail address" name="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="messagebox-message">
                            <textarea placeholder="Type your message..." rows="6" onChange={(e) => setMessage(e.target.value)} />
                        </div>
                        {
                            errormessage1 && <p style={{ color: "red" }}>{errormessage1}</p>
                        }
                        {
                            (response) && <>
                                <div className="messagemodal text-center">
                                    <span className="close" onClick={clickedclose2}>&times;</span>
                                    <div className="response-success"><FontAwesome name="check"></FontAwesome></div>
                                    <div className="success-title">Thank you for your response!</div>
                                </div>
                            </>
                        }
                        <div className="send-button"><button onClick={submithandler}>Send Message</button></div>
                    </div>
                    <div className="illustration">
                        <img alt="contacus" src={contactus} style={{ width: "100%" }} />
                    </div>
                </div>
            </div>
            <div className="contact-row row mx-0">
                <div className="call-us">
                    {/* <button> */}
                        <FontAwesome className=""
                            name="phone"
                        ></FontAwesome>
                        Call us at +91-7427800499
                        <div className="contact-or">or<br /></div>
            {/* </button> */}
                </div>
                <div className="request-call">
                    <button onClick={showmodal}>
                        <FontAwesome className=""
                            name="volume-control-phone"
                            style={{ transform: "rotate(-40deg)" }}></FontAwesome>
                        Request a call back
                </button>
                </div>
                <div className="mail-us">
                    <a href="mailto:labs.rancho@gmail.com">
                        <FontAwesome className=""
                            name="envelope"
                        ></FontAwesome>
                        labs.rancho@gmail.com
            </a>
                </div>

            </div>
            {
                modal &&
                <>
                    <div className="requestcallmodal">
                        <span className="close" onClick={clickedclose}>&times;</span>
                        {
                            !requested ?
                                <>
                                    <div className="send-message">
                                        <div className="callus-title">Your call matters to us</div>
                                        <hr />
                                        <div className="messagebox-email">
                                            <input type="text" placeholder="Your name here" name="name" onChange={(e) => setCname(e.target.value)} />
                                        </div>
                                        <div className="contact">
                                            <input type="text" placeholder="Your phone number here" name="contact" onChange={(e) => setCnumber(e.target.value)} />
                                        </div>
                                        {
                                            errormessage2 && <p style={{ color: "red" }}>{errormessage2}</p>
                                        }
                                        <div className="send-button"><button onClick={callrequest}>Request now</button></div>
                                    </div>
                                </> :
                                <>
                                    <div className="requested">
                                        <div className="callus-title">Your response has been submitted.</div>
                                        <div className="callus-sub">Our team will get in touch with you within 24hrs. Have a good day!</div>
                                    </div>
                                </>
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default ContactUs