import Modal from 'react-bootstrap/Modal'
import React, { useState, useLayoutEffect } from 'react';
import contactus from './img/contactus.png'
import './css/AboutUsCallModal.css'


function CallModal() {

const [modalShow, setModalShow] = React.useState(true);

if(modalShow)
{
    document.body.style.overflow = "hidden"
}

function clickedclose(){
    setModalShow(!modalShow)
    document.body.style.overflow = "scroll"
}

window.onclick = function(event) {
    setModalShow(false)
}

return (
    <>
    {
        modalShow && <>
        {
            <div className="requestcallmodal">
        <span class="close" onClick={clickedclose}>&times;</span>
            <div className="send-message">
                    <div className="callus-title">Your call matters to us</div>
                    <hr />
                    <div className="messagebox-email">
                        <input type="text" placeholder="Your name here" name="name"/>
                    </div>
                    <div className="contact">
                        <input type="text" placeholder="Your phone number here" name="email"/>
                    </div>
                    <div className="send-button"><button>Request now</button></div>
                </div>
        </div>
        }</>
    }
    </>
);
}

  export default CallModal