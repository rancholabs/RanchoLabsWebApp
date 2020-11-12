import React from 'react'
import './css/DashboardBuild.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import lock from './img/lock.svg'


function DeadlineOver(deadline) {
    var d = new Date().toISOString;
    return deadline < d ? true : false
}

function getDeadline(deadline) {
    var d = new Date().toISOString;
    var dline = deadline < d ? 'Over' : deadline
    return dline
}

function ProjectItemDesk(projectItem) {

    var DeadlineOver = true
    var SubmissionOver = false

    return (
        <div className="project-item">
            <div className="row">
                <div className="col-5 pr-0 pl-1">
                    <div className="project-no">Project {projectItem.projectNo}</div>
                </div>
                <div className="col-7 pl-0 align-self-center">
                    <div className="deadline text-right p-0">Deadline: {getDeadline(projectItem.deadline)}</div>
                </div>
            </div>
            <div>
                <img className="" src={projectItem.projectimage} alt={projectItem.title} style={{ padding: "1vw", height: "13vw", width: "auto", borderRadius: "40vw" }}></img>
            </div>
            <div className="project-name">{projectItem.topic}</div>
            <div className="row" style={{ marginTop: "3.5vw", justifyContent: "space-evenly" }}>
                {
                    DeadlineOver ? <div className="startbuilding"><button>View Submission</button></div> :
                        <>
                            {
                                SubmissionOver  ?
                                    <>
                                        <div className="startbuilding"><button>Start Building</button></div>
                                        <div className="editsub"><button>Edit submission</button></div>
                                    </> :
                                    <>
                                        <div className="startbuilding"><button>Start Building</button></div>
                                        <div className="submitbuild"><button>SUBMIT</button></div>
                                    </>
                            }
                        </>
                }
            </div>
        </div>
    )
}

const ProjectItemMob = (projectItem) => {

    
    var DeadlineOver = true
    var SubmissionOver = false

    return (

        <div className="row">
            <div className="col-5 align-self-center">
                <img className="img-src" src={projectItem.projectimage} alt={projectItem.title} style={{ borderRadius: "40vw" }}></img>
            </div>
            <div className="col-7" style={{padding:"0 0 0 10px"}}>
                <div className="project-no">Project {projectItem.projectNo}</div>
                <div className="deadline">Deadline:  {getDeadline(projectItem.deadline)}</div>
                <div className="projectname">{projectItem.topic}</div>
                <div className="row mx-0" style={{ marginTop: "1rem", justifyContent: "space-around" }}>
                    <div className="row" style={{ marginTop: "1.5vw", justifyContent: "space-evenly" , width:"100%"}}>
                        {
                            !DeadlineOver ? <div className="startbuilding"><button>View Submission</button></div> :
                                <>
                                    {
                                        !SubmissionOver ?
                                            <>
                                                <div className="startbuilding"><button>Start Building</button></div>
                                                <div className="editsub"><button>Edit submission</button></div>
                                            </> :
                                            <>
                                                <div className="startbuilding"><button>Start Building</button></div>
                                                <div className="submitbuild"><button>SUBMIT</button></div>
                                            </>
                                    }
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

function Lockhover(){
    return(
        <div className="hoverlock">
            <div className="lock-msg">
            Unlock this feature by enrolling in our courses and build your projects step by step
            </div>
        </div>
    )
}

const DashboardBuildMobile = (props) => {

    var Dbuild = props.data
    return (
        <div className="card buildcardmobile">
            <div className="dproject">
                {
                    Dbuild ? <Carousel emulateTouch swipeable useKeyboardArrows infiniteLoop>
                    {
                        // Dbuild.map(ProjectItemMob)
                    }
                </Carousel>:
                
                <>
            <div className="text-center lock" style={{margin:"auto"}}>
            <img src={lock} alt ="locked" className="img-fluid" style={{margin:"auto", width:"20%"}}></img>
            <Lockhover />
            </div>
            </>
                }   
            </div>
        </div>
    )
}

function DashboardBuildCard(props) {

    var Dbuild = props.data

    return (
        <div className="card buildcard" style={{ padding: "1.8vw", float:"right" }}>
            {
            Dbuild ?
            <div className="dproject align-self-center">
                <>
                <Carousel emulateTouch swipeable useKeyboardArrows infiniteLoop>
                    {
                        // Dbuild.projects.map(ProjectItemDesk)
                    }
                </Carousel>
                </>
            </div> :
            <>
            <div className="text-center lock" style={{margin:"auto"}}>
            <img src={lock} alt ="locked" className="img-fluid" style={{margin:"auto", width:"6.56vw"}}></img>
            <Lockhover />
            </div>
            </>
            }
        </div>
    )
}

const DashboardBuild = (props) => {
    
    var Dbuild = props.build

    return (
        <div>
            <DashboardBuildCard data={Dbuild} />
            <DashboardBuildMobile data={Dbuild} />
        </div>
    )
}

export default DashboardBuild