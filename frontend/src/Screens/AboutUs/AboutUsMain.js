import React from 'react'
import './css/AboutUsMain.css'
import mainimg from './img/main.png'
import future from './img/future.jpeg'

const smallsections = ['Robotics', 'Programming', 'AI', 'Blog']

const Sections = () => {
    return(
        <>
        <div className="row section">
            <a><div className="aboutRl">About Us</div></a>
            {
                smallsections.map( (section) => {
                    return(
                        <a href="#" className=""><div className="smallsection">{section}</div></a>
                    )
                })
            }
        </div>
        </>
    )
}

const AboutUsMainContent = () => {
    return(
        <div className="main-content">
            <div className="row mx-0">
            <div>
            <div className="main-content-title">Transforming Potential<br /> into Talent</div>
            <div className="sub-content">We are a group of passionate individuals dedicated to making the 
            learning experience of students, a memorable and impactful one. Started by IIT Delhi Alumni and Professors, 
            are a company that aims to ignite the curious minds of students and shine the light on lucrative career 
            paths in AI, Coding, and Robotics, through practical knowledge.</div>
            <hr />
            </div>
            <div className="main-image">
                <img src={mainimg} alt=""></img>
            </div>
            </div>
        </div>
    )
}

const AboutUsVideo = () => {
    return (
        <div className="row aboutus-video mx-0">
            <div className="video-frame">
                {/* <video width="100%" height="100%" controls>
                    <source src={video} />
                </video> */}
                <img src={future} alt="" style={{width:"100%", height:"100%"}}></img>
            </div>
            <div className="aboutus-vidoe-content align-self-center">
                <div className="video-title">The Need of The Hour</div>
                <div className="video-desc">The future is all about automation, programming, robots and computers. 
                It’s time to take the right step forward now.</div>
            </div>
        </div>
    )
}

const AboutUsMain = () => {
    return(
        <>
            <div className="aboutUs">
                <Sections />
                <AboutUsMainContent />
                <AboutUsVideo />
            </div>
        </>
    )
}

export default AboutUsMain