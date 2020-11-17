import React from 'react'
import './css/AboutUsFamily.css'
import image from './img/t3.png'
import Anshul from './img/Anshul.png'
import Aman from './img/Aman.jpg'
import Heera from './img/Heera.jpeg'
import Rohan from './img/Rohan.jpeg'
import Vignesh from './img/Vignesh.jpg'
import Neha from './img/Neha.jpg'
import Rucha from './img/Rucha.jpeg'
import GokulnathB from './img/GokulnathB.jpg'
import FontAwesome from 'react-fontawesome'

const FamilyMembers = [
    {
        "name" : "Anshul Agarwal",
        "designation" : "Co-Founder",
        "img": Anshul,
        "linkedin" : "https://www.linkedin.com/in/anshulagrawal017"
    },
    {
        "name" : "Aman Kumar",
        "designation" : "Co-Founder",
        "img": Aman,
        "linkedin" : "https://www.linkedin.com/in/aman-kumar-84426415b"
    },
    {
        "name" : "Rohan Yuttham",
        "designation" : "Robotics Head",
        "img": Rohan,
        "linkedin" : "https://www.linkedin.com/in/rohanyuttham"
    },
    {
        "name" : "Gokulnath B",
        "designation" : "Junior Web Developer",
        "img": GokulnathB
    },
    {
        "name" : "Rucha Deshpande",
        "designation" : "Junior Web Developer",
        "img": Rucha
    },
    {
        "name" : "Neha Khuwal",
        "designation" : "UI/UX Designer",
        "img": Neha
    },
    {
        "name" : "Vignesh Hariharan",
        "designation" : "Product Manager",
        "img": Vignesh
    },
    {
        "name" : "Heera Shetty",
        "designation" : "Product Manager",
        "img": Heera
    }
]

const Triangle = () => {
    return(
        <div className="f-triangle"></div>
    )
}

const FamilyMeber = (props) => {
    return(
            <div className="col-md-6 row fmember p-0 mx-0">
                <div className="col-6 fimage p-0">
                    <img src={props.img} style={{alignSelf:"flex-end"}}></img>
                    <Triangle />
                </div>
                <div className="col-6 details">
                    <div className="fmember-name">{props.name} {
                    props.linkedin && <><a href={props.linkedin} target="blank"><FontAwesome name="linkedin-square"></FontAwesome></a></>
                    }</div>
                    <div className="fmember-designation">{props.designation}</div>
                </div>
            </div>
    )
}

const Family = () => {
    return(
        <div className="aboutus-family">
            <div className="line row mx-0">
                <div className="col-6"></div>
            </div>
            <div className="family-title">Meet our Family</div>
            <div className="family-content">RanchoLabs is run by a group of young, dedicated entrepreneurs who aim to revolutionize the K-12 educational system.</div>
            <div className="family-grid">
                <div className="row mx-0">
                    {
                        FamilyMembers.map((f) => {
                            return(
                                <FamilyMeber key={f.name} name={f.name} designation={f.designation} img={f.img} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Family