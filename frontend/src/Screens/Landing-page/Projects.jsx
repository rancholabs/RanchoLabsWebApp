import React from 'react'
import './css/index.css'
import './css/Projects.css'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import robot from './img/54998decefee4eff03de436edd73d832-removebg-preview.png'


function Project(){
    return(
        <div className="projects">
            <div className="project-title">CHECK OUT OUR STUDENT PROJECTS</div>
            <div className="project-description">Students with determination and enthusiasm<br></br> with pinch of learning 
            and guidance<br></br> come up with some great innovations at<br></br> Rancho Labs.</div>
            <div className="row">
                <div className="col-md-6">
                    <div className="card project-cards">
                        <div className="title">Title here</div>
                        <div className="subtitle">Subtitle here</div>
                        <div className="btn">DETAILS</div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card project-cards">
                        <div className="title">Title here</div>
                        <div className="subtitle">Subtitle here</div>
                        <div className="btn">DETAILS</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function MobileProjects(){
    return(
        <div className="mobileprojects">
            <div className="mobile-project-title">CHECK OUT OUR STUDENT PROJECTS</div>
            <div className="mobile-project-description">Students with determination and enthusiasm<br></br> with pinch of learning 
            and guidance<br></br> come up with some great innovations at<br></br> Rancho Labs.</div>
            <div className="carousel-wrapper">
            <Carousel infiniteLoop useKeyboardArrows autoPlay>
                <div className="card mobile-project-cards">
                    <div className="mobile-project-title">Title here</div>
                    <div className="mobile-project-subtitle">Subtitle here</div>
                    <div className="btn learnmore">Learn more</div>
                </div>
                <div className="card mobile-project-cards">
                    <div className="mobile-project-title">Title here</div>
                    <div className="mobile-project-subtitle">Subtitle here</div>
                    <div className="btn learnmore">Learn more</div>
                </div>
                <div className="card mobile-project-cards">
                    <div className="mobile-project-title">Title here</div>
                    <div className="mobile-project-subtitle">Subtitle here</div>
                    <div className="btn learnmore">Learn more</div>
                </div>
            </Carousel>
        </div>
            </div>
        
    )
}


function Projects(){
    return(
        <>
        <Project />
        <MobileProjects />
        </>
    )
}

export default Projects