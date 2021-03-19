import React , {useEffect, useState}from "react";
import "./css/DashboardBuild.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import lock from "./img/lock.svg";
import axios from "axios";

function DeadlineOver(deadline) {
  var d = new Date().toISOString;
  return deadline < d ? true : false;
}

function getDeadline(deadline) {
  var d = new Date().toISOString;
  var dline = deadline < d ? "Over" : deadline;
  // console.log(dline)
  return dline;
  
}

function ProjectItemDesk(projectItem) {
  var DeadlineOver = false;
  var SubmissionOver = false;
  // console.log(projectItem.singleProject);

  const goToProjectBuild = () => {
    window.location.href = `/buildproject?project=${projectItem.singleProject._id}&batch=${projectItem.batchId}`;
  };

  if (projectItem.singleProject && projectItem.singleProject.no) {
    return (
      <div className="project-item">
        <div className="row">
          <div className="col-5 pr-0 pl-1">
            <div className="project-no">
              Project {projectItem.singleProject.no}
            </div>
          </div>
          <div className="col-7 pl-0 align-self-center">
            <div className="deadline text-right p-0">
              Deadline: {getDeadline(projectItem.singleProject.deadline)}
            </div>
          </div>
        </div>
        <div>
          <img
            className=""
            src={projectItem.singleProject?.image?.filePath}
            alt={projectItem.singleProject?.name}
            style={{
              padding: "1vw",
              height: "130px",
              width: "130px",
              borderRadius: "50%",
            }}
          ></img>
        </div>
        <div className="project-name">{projectItem.singleProject.name}</div>
        <div
          className="row"
          style={{ marginTop: "3.5vw", justifyContent: "space-evenly" }}
        >
          {DeadlineOver ? (
            <div className="startbuilding">
              <button>View Submission</button>
            </div>
          ) : (
            <>
              {SubmissionOver ? (
                <>
                  <div className="startbuilding">
                    <button onClick={goToProjectBuild}>Start Building</button>
                  </div>
                  <div className="editsub">
                    <button>Edit submission</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="startbuilding">
                    <button onClick={goToProjectBuild}>Start Building</button>
                  </div>
                  <div className="submitbuild">
                    <button>SUBMIT</button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  } else return null;
}

const ProjectItemMob = (projectItem) => {
  var DeadlineOver = false;
  var SubmissionOver = false;

  return (
    <div className="row">
      <div className="col-5 align-self-center">
        <img
          className="img-src"
          src={projectItem.singleProject?.image?.filePath}
          alt={projectItem.singleProject?.name}
          style={{ borderRadius: "40vw", width: "100%" }}
        ></img>
      </div>
      <div className="col-7" style={{ padding: "0 0 0 10px" }}>
        <div className="project-no">
          Project {projectItem.singleProject?.no}
        </div>
        <div className="deadline">
          Deadline: {getDeadline(projectItem.singleProject?.deadline)}
        </div>
        <div className="projectname">{projectItem.singleProject?.name}</div>
        <div
          className="row mx-0"
          style={{ marginTop: "1rem", justifyContent: "space-around" }}
        >
          <div
            className="row"
            style={{
              marginTop: "1.5vw",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            {!DeadlineOver ? (
              <div className="startbuilding">
                <button>View Submission</button>
              </div>
            ) : (
              <>
                {!SubmissionOver ? (
                  <>
                    <div className="startbuilding">
                      <button>Start Building</button>
                    </div>
                    <div className="editsub">
                      <button>Edit submission</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="startbuilding">
                      <button>Start Building</button>
                    </div>
                    <div className="submitbuild">
                      <button>SUBMIT</button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function Lockhover({ title }) {
  return (
    <div className="hoverlock">
      <div className="lock-msg">
        {title
          ? title
          : "Unlock this feature by enrolling in our courses and build your projects step by step"}
      </div>
    </div>
  );
}

const DashboardBuildMobile = (props) => {
  var Dbuild = props.data;

    const [showEnabledProjects, setShowEnabledProjects] = React.useState(false);
  const [allEnabledProjects, setallEnabledProjects] = React.useState([]);
  React.useEffect(() => {
    if (Dbuild?.projects) {
      let enabledProjects = Dbuild?.projects?.filter(
        (proj) => proj.isActive === true
      );
      if (enabledProjects.length > 0) {
        setallEnabledProjects(enabledProjects);
        setShowEnabledProjects(true);
      } else {
        setallEnabledProjects([]);
        setShowEnabledProjects(false);
      }
    }
  }, [props.data]);
//  console.log(allEnabledProjects)

const [showSingleProject, setShowSingleProject] = useState(false)
  const [enableSingleProject, setEnableSingleProject] = useState(null)
  
  React.useEffect(() => {
    if(Dbuild?.batch && Dbuild?.batch.batchType === "normal"){
      if(Dbuild.projects.length > 0){
        setEnableSingleProject(Dbuild.projects[0])
        //console.log(enableSingleProject)
        setShowSingleProject(true)
      }
    }
  }, [props.data])
  return (
    <div className="card buildcardmobile">
      <div className="dproject">
        {Dbuild && Dbuild.batch ? (
          Dbuild.batch.batchType === "normal" ? (
            showEnabledProjects ? (allEnabledProjects.map((proj) => {
              if(proj.name && proj.deadline && proj.no){
                return (
                <Carousel emulateTouch swipeable useKeyboardArrows infiniteLoop showArrows>
                  <ProjectItemMob singleProject={proj} />
                </Carousel>
            
              );
              }
  
            }) 
            ) : (<>
              {/* <div className="text-center lock" style={{ margin: "auto" }}>
                <img
                  src={lock}
                  alt="locked"
                  className="img-fluid"
                  style={{ margin: "auto", width: "20%" }}
                ></img>
                <Lockhover />
              </div> */}
              {
                Dbuild.batch && Dbuild.batch.batchType === "normal" ? (
                  showSingleProject ? (
                    <Carousel emulateTouch swipeable useKeyboardArrows infiniteLoop showArrows>
                      <ProjectItemMob singleProject={enableSingleProject} />
                    </Carousel>
                  ) : (<div className="text-center lock" style={{ margin: "auto" }}>
                  <img
                    src={lock}
                    alt="locked"
                    className="img-fluid"
                    style={{ margin: "auto", width: "20%" }}
                  ></img>
                  <Lockhover />
                </div>)
                ) : (<div className="text-center lock" style={{ margin: "auto" }}>
                <img
                  src={lock}
                  alt="locked"
                  className="img-fluid"
                  style={{ margin: "auto", width: "20%" }}
                ></img>
                <Lockhover />
              </div>)
              }
            </>
            )
            // Dbuild.projects.map((proj) => {
            //   return (
            //     <Carousel emulateTouch swipeable useKeyboardArrows infiniteLoop>
            //       <ProjectItemMob singleProject={proj} />
            //     </Carousel>
            //   );
            // })
          ) : (
            <ProjectItemMob singleProject={Dbuild.projects[0]} />
          )
        ) : (
          <>
            <div className="text-center lock" style={{ margin: "auto" }}>
              <img
                src={lock}
                alt="locked"
                className="img-fluid"
                style={{ margin: "auto", width: "20%" }}
              ></img>
              <Lockhover />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

function DashboardBuildCard(props) {
  var Dbuild = props.data;
  console.log(Dbuild);
    const [showEnabledProjects, setShowEnabledProjects] = React.useState(false);
  const [allEnabledProjects, setallEnabledProjects] = React.useState([]);
  React.useEffect(() => {
    if (Dbuild?.projects) {
      let enabledProjects = Dbuild?.projects?.filter(
        (proj) => proj.isActive === true
      );
      if (enabledProjects.length > 0) {
        setallEnabledProjects(enabledProjects);
        setShowEnabledProjects(true);
      } else {
        setallEnabledProjects([]);
        setShowEnabledProjects(false);
      }
    }
  }, [props.data]);

  const [showSingleProject, setShowSingleProject] = useState(false)
   const [enableSingleProject, setEnableSingleProject] = useState(null)
   
   React.useEffect(() => {
     if(Dbuild?.batch && Dbuild?.batch.batchType === "normal"){
       if(Dbuild.projects.length > 0){
         setEnableSingleProject(Dbuild.projects[0])
        // console.log(enableSingleProject)
         setShowSingleProject(true)
       }
     }
   }, [props.data])


  return (
    <div
      className="card buildcard"
      style={{ padding: "1.8vw", float: "right" }}
    >
      {Dbuild && Dbuild.batch ? (
        <div className="dproject align-self-center">
          <>
            {Dbuild.batch.batchType === "normal" ? (
              showEnabledProjects ? (
                <Carousel
                  emulateTouch
                  swipeable
                  useKeyboardArrows
                  infiniteLoop
                  showArrows={true}
                >
                  {allEnabledProjects.map((proj) => {

                      return (
                      <ProjectItemDesk
                        singleProject={proj}
                        batchId={Dbuild.batchId}
                      />
                    );
                      
                  })}
                </Carousel>
              ) : (
                // <div className="text-center lock" style={{ margin: "auto" }}>
                //   <img
                //     src={lock}
                //     alt="locked"
                //     className="img-fluid"
                //     style={{ margin: "auto", width: "6.56vw" }}
                //   ></img>
                //   <Lockhover title="Projects not enabled yet!" />
                // </div>
                <>
                {
                  Dbuild?.batch && Dbuild?.batch.batchType === "normal" ? (
                    showSingleProject ? (
                      <Carousel emulateTouch
                      swipeable
                      useKeyboardArrows
                      infiniteLoop
                      showArrows={true}>
                        <ProjectItemDesk singleProject={enableSingleProject} 
                        batchId = {Dbuild.batchId}
                        />
                      </Carousel>
                    ) : (<div className="text-center lock" style={{ margin: "auto" }}>
                    <img
                      src={lock}
                      alt="locked"
                      className="img-fluid"
                      style={{ margin: "auto", width: "20%" }}
                    ></img>
                    <Lockhover />
                  </div>)
                  ) : (<div className="text-center lock" style={{ margin: "auto" }}>
                  <img
                    src={lock}
                    alt="locked"
                    className="img-fluid"
                    style={{ margin: "auto", width: "20%" }}
                  ></img>
                  <Lockhover />
                </div>)
                }</>
              )
            ) : Dbuild.batch.batchType === "freeclass" ? (
              <ProjectItemDesk
                singleProject={Dbuild.projects[0]}
                batchId={Dbuild.batchId}
              />
            ) : (
              <>
                <Carousel
                  emulateTouch
                  swipeable
                  useKeyboardArrows
                  infiniteLoop
                  showArrows={true}
                >
                  <ProjectItemDesk
                    singleProject={Dbuild.projects[0]}
                    batchId={Dbuild.batchId}
                  />
                  <ProjectItemDesk
                    singleProject={Dbuild.projects[1]}
                    batchId={Dbuild.batchId}
                  />
                </Carousel>
              </>
            )}
          </>
        </div>
      ) : (
        <>
          <div className="text-center lock" style={{ margin: "auto" }}>
            <img
              src={lock}
              alt="locked"
              className="img-fluid"
              style={{ margin: "auto", width: "6.56vw" }}
            ></img>
            <Lockhover />
          </div>
        </>
      )}
    </div>
  );
}

const DashboardBuild = (props) => {
  var Dbuild = props.build;
  //  console.log(Dbuild);

  return (
    <div>
      <DashboardBuildCard data={Dbuild} />
      <DashboardBuildMobile data={Dbuild} />
    </div>
  );
};

export default DashboardBuild;


// import React, { useState } from "react";
// import "./css/DashboardBuild.css";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import lock from "./img/lock.svg";
// import axios from "axios";

// function DeadlineOver(deadline) {
//   var d = new Date().toISOString;
//   return deadline < d ? true : false;
// }

// function getDeadline(deadline) {
//   var d = new Date().toISOString;
//   var dline = deadline < d ? "Over" : deadline;
//   //console.log(dline)
//   return dline;
  
// }

// function ProjectItemDesk(projectItem) {
//   var DeadlineOver = false;
//   var SubmissionOver = false;
//   //console.log(projectItem.singleProject);

//   const goToProjectBuild = () => {
//     window.location.href = `/buildproject?project=${projectItem.singleProject._id}&batch=${projectItem.batchId}`;
//   };

//   if (projectItem.singleProject) {
//     return (
//       <div className="project-item">
//         <div className="row">
//           <div className="col-5 pr-0 pl-1">
//             <div className="project-no">
//               Project {projectItem.singleProject.no}
//             </div>
//           </div>
//           <div className="col-7 pl-0 align-self-center">
//             <div className="deadline text-right p-0">
//               Deadline: {getDeadline(projectItem.singleProject.deadline)}
//             </div>
//           </div>
//         </div>
//         <div>
//           <img
//             className=""
//             src={projectItem.singleProject?.image?.filePath}
//             alt={projectItem.singleProject?.name}
//             style={{
//               padding: "1vw",
//               height: "130px",
//               width: "130px",
//               borderRadius: "50%",
//             }}
//           ></img>
//         </div>
//         <div className="project-name">{projectItem.singleProject.name}</div>
//         <div
//           className="row"
//           style={{ marginTop: "3.5vw", justifyContent: "space-evenly" }}
//         >
//           {DeadlineOver ? (
//             <div className="startbuilding">
//               <button>View Submission</button>
//             </div>
//           ) : (
//             <>
//               {SubmissionOver ? (
//                 <>
//                   <div className="startbuilding">
//                     <button onClick={goToProjectBuild}>Start Building</button>
//                   </div>
//                   <div className="editsub">
//                     <button>Edit submission</button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div className="startbuilding">
//                     <button onClick={goToProjectBuild}>Start Building</button>
//                   </div>
//                   <div className="submitbuild">
//                     <button>SUBMIT</button>
//                   </div>
//                 </>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     );
//   } else return null;
// }

// const ProjectItemMob = (projectItem) => {
//   var DeadlineOver = false;
//   var SubmissionOver = false;

//   return (
//     <div className="row">
//       <div className="col-5 align-self-center">
//         <img
//           className="img-src"
//           src={projectItem.singleProject?.image?.filePath}
//           alt={projectItem.singleProject?.name}
//           style={{ borderRadius: "40vw", width: "100%" }}
//         ></img>
//       </div>
//       <div className="col-7" style={{ padding: "0 0 0 10px" }}>
//         <div className="project-no">
//           Project {projectItem.singleProject?.no}
//         </div>
//         <div className="deadline">
//           Deadline: {getDeadline(projectItem.singleProject?.deadline)}
//         </div>
//         <div className="projectname">{projectItem.singleProject?.name}</div>
//         <div
//           className="row mx-0"
//           style={{ marginTop: "1rem", justifyContent: "space-around" }}
//         >
//           <div
//             className="row"
//             style={{
//               marginTop: "1.5vw",
//               justifyContent: "space-evenly",
//               width: "100%",
//             }}
//           >
//             {DeadlineOver ? (
//               <div className="startbuilding">
//                 <button>View Submission</button>
//               </div>
//             ) : (
//               <>
//                 {SubmissionOver ? (
//                   <>
//                     <div className="startbuilding">
//                       <button>Start Building</button>
//                     </div>
//                     <div className="editsub">
//                       <button>Edit submission</button>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div className="startbuilding">
//                       <button>Start Building</button>
//                     </div>
//                     <div className="submitbuild">
//                       <button>SUBMIT</button>
//                     </div>
//                   </>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// function Lockhover({ title }) {
//   return (
//     <div className="hoverlock">
//       <div className="lock-msg">
//         {title
//           ? title
//           : "Unlock this feature by enrolling in our courses and build your projects step by step"}
//       </div>
//     </div>
//   );
// }

// const DashboardBuildMobile = (props) => {
//   var Dbuild = props.data;
//   //console.log(Dbuild)

//   const [showEnabledProjects, setShowEnabledProjects] = React.useState(false);
//   const [allEnabledProjects, setallEnabledProjects] = React.useState([]);
//   React.useEffect(() => {
//     if (Dbuild?.projects) {
//       let enabledProjects = Dbuild?.projects?.filter(
//         (proj) => proj.isActive === true
//       );
//       if (enabledProjects.length > 0) {
//         setallEnabledProjects(enabledProjects);
//         setShowEnabledProjects(true);
//       } else {
//         setallEnabledProjects([]);
//         setShowEnabledProjects(false);
//       }
//     }
//   }, [props.data]);
// //  console.log(allEnabledProjects)

// const [showSingleProject, setShowSingleProject] = useState(false)
//   const [enableSingleProject, setEnableSingleProject] = useState(null)
  
//   React.useEffect(() => {
//     if(Dbuild?.batchId && Dbuild?.batch.batchType === "normal"){
//       if(Dbuild.projects.length > 0){
//         setEnableSingleProject(Dbuild.projects[0])
//         //console.log(enableSingleProject)
//         setShowSingleProject(true)
//       }
//     }
//   }, [props.data])
//   return (
//     <div className="card buildcardmobile">
//       <div className="dproject">
//         {Dbuild && Dbuild.batch ? (
//           Dbuild.batch.batchType === "normal" ? (
//             showEnabledProjects ? (allEnabledProjects.map((proj) => {
//               return (
//                 <Carousel emulateTouch swipeable useKeyboardArrows infiniteLoop showArrows>
//                   <ProjectItemMob singleProject={proj} />
//                 </Carousel>
            
//               );
//             }) 
//             ) : (<>
//               {/* <div className="text-center lock" style={{ margin: "auto" }}>
//                 <img
//                   src={lock}
//                   alt="locked"
//                   className="img-fluid"
//                   style={{ margin: "auto", width: "20%" }}
//                 ></img>
//                 <Lockhover />
//               </div> */}
//               {
//                 Dbuild.batch && Dbuild.batch.batchType === "normal" ? (
//                   showSingleProject ? (
//                     <Carousel emulateTouch swipeable useKeyboardArrows infiniteLoop showArrows>
//                       <ProjectItemMob singleProject={enableSingleProject} />
//                     </Carousel>
//                   ) : (<div className="text-center lock" style={{ margin: "auto" }}>
//                   <img
//                     src={lock}
//                     alt="locked"
//                     className="img-fluid"
//                     style={{ margin: "auto", width: "20%" }}
//                   ></img>
//                   <Lockhover />
//                 </div>)
//                 ) : (<div className="text-center lock" style={{ margin: "auto" }}>
//                 <img
//                   src={lock}
//                   alt="locked"
//                   className="img-fluid"
//                   style={{ margin: "auto", width: "20%" }}
//                 ></img>
//                 <Lockhover />
//               </div>)
//               }
//             </>
//             )
//             // Dbuild.projects.map((proj) => {
//             //   return (
//             //     <Carousel emulateTouch swipeable useKeyboardArrows infiniteLoop>
//             //       <ProjectItemMob singleProject={proj} />
//             //     </Carousel>
//             //   );
//             // })
//           ) : (
//             <ProjectItemMob singleProject={Dbuild.projects[0]} />
//           )
//         ) : (
//           <>
//             <div className="text-center lock" style={{ margin: "auto" }}>
//               <img
//                 src={lock}
//                 alt="locked"
//                 className="img-fluid"
//                 style={{ margin: "auto", width: "20%" }}
//               ></img>
//               <Lockhover />
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// function DashboardBuildCard(props) {
//   var Dbuild = props.data;
//    //console.log(Dbuild);

//   // const [showEnabledProjects, setShowEnabledProjects] = React.useState(false);
//   // const [allEnabledProjects, setallEnabledProjects] = React.useState([]);
//   // React.useEffect(() => {
//   //   if (Dbuild?.projects) {
//   //     let enabledProjects = Dbuild?.projects?.filter(
//   //       (proj) => proj.isActive === true
//   //     );
//   //     if (enabledProjects.length > 0) {
//   //       setallEnabledProjects(enabledProjects);
//   //       setShowEnabledProjects(true);
//   //     } else {
//   //       setallEnabledProjects([]);
//   //       setShowEnabledProjects(false);
//   //     }
//   //   }
//   // }, [props.data]);

//   const [showSingleProject, setShowSingleProject] = useState(false)
//    const [enableSingleProject, setEnableSingleProject] = useState(null)
   
//    React.useEffect(() => {
//      if(Dbuild?.batchId && Dbuild?.batch.batchType === "normal"){
//        if(Dbuild.projects.length > 0){
//          setEnableSingleProject(Dbuild.projects[0])
//         // console.log(enableSingleProject)
//          setShowSingleProject(true)
//        }
//      }
//    }, [props.data])


//   return (
//     <div
//       className="card buildcard"
//       style={{ padding: "1.8vw", float: "right" }}
//     >
//       {Dbuild && Dbuild.batch ? (
//         <div className="dproject align-self-center">
//           <>
//             {Dbuild.batch.batchType === "normal" ? (
//               showEnabledProjects ? (
//                 <Carousel
//                   emulateTouch
//                   swipeable
//                   useKeyboardArrows
//                   infiniteLoop
//                   showArrows={true}
//                 >
//                   {allEnabledProjects.map((proj) => {
//                     return (
//                       <ProjectItemDesk
//                         singleProject={proj}
//                         batchId={Dbuild.batchId}
//                       />
//                     );
//                   })}
//                 </Carousel>
//               ) : (
//                 // <div className="text-center lock" style={{ margin: "auto" }}>
//                 //   <img
//                 //     src={lock}
//                 //     alt="locked"
//                 //     className="img-fluid"
//                 //     style={{ margin: "auto", width: "6.56vw" }}
//                 //   ></img>
//                 //   <Lockhover title="Projects not enabled yet!" />
//                 // </div>
//                 <>
//                 {
//                   Dbuild.batch && Dbuild.batch.batchType === "normal" ? (
//                     showSingleProject ? (
//                       <Carousel>
//                         <ProjectItemDesk singleProject={enableSingleProject} 
//                         batchId = {Dbuild.batchId}
//                         />
//                       </Carousel>
//                     ) : (<div className="text-center lock" style={{ margin: "auto" }}>
//                     <img
//                       src={lock}
//                       alt="locked"
//                       className="img-fluid"
//                       style={{ margin: "auto", width: "20%" }}
//                     ></img>
//                     <Lockhover />
//                   </div>)
//                   ) : (<div className="text-center lock" style={{ margin: "auto" }}>
//                   <img
//                     src={lock}
//                     alt="locked"
//                     className="img-fluid"
//                     style={{ margin: "auto", width: "20%" }}
//                   ></img>
//                   <Lockhover />
//                 </div>)
//                 }</>
//               )
//             ) : Dbuild.batch.batchType === "freeclass" ? (
//               <ProjectItemDesk
//                 singleProject={Dbuild.projects[0]}
//                 batchId={Dbuild.batchId}
//               />
//             ) : (
//               <>
//                 <Carousel
//                   emulateTouch
//                   swipeable
//                   useKeyboardArrows
//                   infiniteLoop
//                   showArrows={true}
//                 >
//                   <ProjectItemDesk
//                     singleProject={Dbuild.projects[0]}
//                     batchId={Dbuild.batchId}
//                   />
//                   <ProjectItemDesk
//                     singleProject={Dbuild.projects[1]}
//                     batchId={Dbuild.batchId}
//                   />
//                 </Carousel>
//               </>
//             )}
//           </>
//         </div>
//       ) : (
//         <>
//           <div className="text-center lock" style={{ margin: "auto" }}>
//             <img
//               src={lock}
//               alt="locked"
//               className="img-fluid"
//               style={{ margin: "auto", width: "6.56vw" }}
//             ></img>
//             <Lockhover />
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// const DashboardBuild = (props) => {
//   var Dbuild = props.build;
//   //  console.log(Dbuild);

//   return (
//     <div>
//       <DashboardBuildCard data={Dbuild} />
//       <DashboardBuildMobile data={Dbuild} />
//     </div>
//   );
// };

// export default DashboardBuild;
