import React from 'react'
import './css/CourseGroundInnovation.css'
import { Carousel } from 'react-responsive-carousel'
import glove from './../Landing-page/img/glove2.jpg'
import vca from './../Landing-page/img/vcak.jpg'
import ist from './../Landing-page/img/isto.jpg'
import lfr from './../Landing-page/img/lfr.jpg'
import btb from './../Landing-page/img/siddharthproject.png'
import aryan from './../Landing-page/img/aryan.jpeg'
import vibhav from './../Landing-page/img/vibhav.PNG'
import karandeep from './../Landing-page/img/karandeep.jpeg'
import Siddharth from './../Landing-page/img/siddharth.jpg'
import Shaik from './../Landing-page/img/shaikarif.jpeg'

const projects = [
    {
        "title" : "Smart Glove",
        "subtitle" : "Glove to convert gesture to text",
        "studentname" : "Vibhav Agrawal",
        "studentimg" : vibhav,
        "category" : "Innovation and Robotics",
        "link" : "",
        "image" : glove
    },
    {
        "title" : "Voice controlled automation",
        "subtitle" : "Multipurpose voice control system to control home applicances & robots",
        "studentname" : "Karandeep Singh",
        "studentimg" : karandeep,
        "category" : "AI and Robotics",
        "link" : "",
        "image" : vca
    },
    {
        "title" : "Intuitive Sanitizing Tunnel",
        "subtitle" : "A sanitization tunnel using UV Bath to kill the bacterias and viruses",
        "studentname" : "Aryan Verma",
        "studentimg" : aryan,
        "category" : "Robotics and Innovation",
        "link" : "",
        "image" : ist
    },
    {
        "title" : "Bed-o-Boat",
        "subtitle" : "Smart bed which converts into a boat at time of flood",
        "studentname" : "Siddharth Kumar Gopal",
        "studentimg" : Siddharth,
        "category" : "Robotics and Innovation",
        "link" : "",
        "image" : btb
    },
    {
        "title" : "Fire rescue robot",
        "subtitle" : "An automated robot to detect smoke and rescue",
        "studentname" : "Shaik Arif",
        "studentimg" : Shaik,
        "category" : "Robotics and Innovation",
        "link" : "",
        "image" : lfr
    }
]

const ProjectCard = ({project}) => {
    return(
            <div className="center">
                <div className="card">
                    <div className="card-img">
                        <img src={project.image} className="img-fluid"></img>
                    </div>
                    <div className="project-student">
                        <img src={project.studentimg} className="img-fluid"></img>
                    </div>
                    <div className="card-body">
                        <div className="project-cat">{project.category}</div>
                        <div className="project-title">{project.title}</div>
                        <div className="reveal">
                            <div className="project-subtitle">{project.subtitle}</div>
                            <div className="student-info" style={{verticalAlign:"baseline"}}>{project.studentname}</div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

const CourseGroundInnovation = ({innovation}) => {
    const {title, subTitle, link} = innovation
    return (
        <div className="course-ground-innovation course-margin-bottom">
            <div className="topic">ON GROUND INNOVATION BY STUDENT</div>
            <div className="desc">
                Students came up with some great innovation to solve some real life problems
            </div>
            <Carousel className="carousel-size" showStatus={false} showThumbs={false} showArrows={true} showIndicators={false} infiniteLoop useKeyboardArrows autoPlay>
                {
                    projects.map((project, idx) => <ProjectCard key={idx} project={project} />)
                }
            </Carousel>
            {
                /*
                    <div className="card">
                        <div className="title">{title}</div>
                        <div className="sub-title">{subTitle}</div>
                        <div className="details-btn">
                            <div className="text">Details</div>
                        </div>
                    </div>
                 */
            }
        </div>
    )
}

export default CourseGroundInnovation
