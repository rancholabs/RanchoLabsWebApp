import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminNewCourse.css";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "../../Asssets/Icon feather-edit.png";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

function AdminNewCourse({
  currentCurriculum,
  tobeEditedCourse,
  updateCourseGroups,
  closeAddNewForm,
}) {
  const [allowEdits, setAllowEdits] = useState(false);
  const [labelColor, setlabelColor] = useState(
    tobeEditedCourse._id ? (allowEdits ? "#4320BF" : "#9D9D9D") : "#4320BF"
  );
  const [name, setName] = useState(
    tobeEditedCourse && tobeEditedCourse.name ? tobeEditedCourse.name : ""
  );
  const [durationInHours, setDurationInHours] = useState(
    tobeEditedCourse && tobeEditedCourse.durationInHours
      ? tobeEditedCourse.durationInHours
      : 1
  );
  const [NoOfWeeks, setNoOfWeeks] = useState(
    tobeEditedCourse && tobeEditedCourse.NoOfWeeks
      ? tobeEditedCourse.NoOfWeeks
      : 1
  );
  const [hoursPerWeek, setHoursPerWeek] = useState(
    tobeEditedCourse && tobeEditedCourse.hoursPerWeek
      ? tobeEditedCourse.hoursPerWeek
      : 1
  );
  const [amount, setAmount] = useState(
    tobeEditedCourse && tobeEditedCourse.price?.amount
      ? tobeEditedCourse.price.amount
      : 0
  );
  const [amountAfterDiscount, setAmountAfterDiscount] = useState(
    tobeEditedCourse && tobeEditedCourse.price?.amountAfterDiscount
      ? tobeEditedCourse.price.amountAfterDiscount
      : 0
  );
  const [totalClasses, setTotalClasses] = useState(
    tobeEditedCourse && tobeEditedCourse.totalClasses
      ? tobeEditedCourse.totalClasses
      : 0
  );
  const [learn, setLearn] = useState(
    tobeEditedCourse && tobeEditedCourse.outcomesByTopics?.learns.topics
      ? tobeEditedCourse.outcomesByTopics.learns.topics
      : ["", "", ""]
  );
  const [build, setBuild] = useState(
    tobeEditedCourse && tobeEditedCourse.outcomesByTopics?.builds.topics
      ? tobeEditedCourse.outcomesByTopics.builds.topics
      : ["", "", ""]
  );
  const [innovate, setInnovate] = useState(
    tobeEditedCourse && tobeEditedCourse.outcomesByTopics?.innovates.topics[0]
      ? tobeEditedCourse.outcomesByTopics.innovates.topics[0]
      : ""
  );
  const [minimumGrade, setminimumGrade] = useState(
    tobeEditedCourse && tobeEditedCourse.gradeRange?.minG
      ? tobeEditedCourse.gradeRange.minG
      : 6
  );
  const [maximumGrade, setmaximumGrade] = useState(
    tobeEditedCourse && tobeEditedCourse.gradeRange?.maxG
      ? tobeEditedCourse.gradeRange.maxG
      : 12
  );
  const [curriculumPDF, setcurriculumPDF] = useState(
    tobeEditedCourse && tobeEditedCourse.curriculumPDF
      ? tobeEditedCourse.curriculumPDF
      : ""
  );

  // NEW CLASS VARS
  const [classNo, setclassNo] = useState(0);
  const [classTopic, setclassTopic] = useState("");
  const [quizLink, setquizLink] = useState("");
  const [assignmentLink, setassignmentLink] = useState("");
  const [slidesLink, setslidesLink] = useState("");
  const [videoLink, setvideoLink] = useState("");
  const [refLink, setrefLink] = useState("");
  const [classes, setClasses] = useState([]);

  // NEW PROJECT VARS
  const [projectTitle, setProjectTitle] = useState("");
  const [projectNumber, setprojectNumber] = useState(0);
  const [projectQuestion, setprojectQuestion] = useState("");
  const [projectDeadline, setProjectDeadline] = useState(0);
  const [projectFormat, setProjectFormat] = useState("");
  const [projectMainImage, setprojectMainImage] = useState(null);
  const [projectStudentImage, setprojectStudentImage] = useState(null);
  const [projects, setProjects] = useState([]);

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (tobeEditedCourse._id) {
      const userInfo = localStorage.getItem("userInfo");
      const token = userInfo ? JSON.parse(userInfo).token : "";
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };
      axios
        .get(`/api/course/class/${tobeEditedCourse._id}`, config)
        .then((res) => {
          console.log(res.data);
          const allClassesData = res.data.map((singleclass, idx) => ({
            ...singleclass,
            edit: false,
          }));
          setClasses(allClassesData);
        });
      axios
        .get(`/api/course/project/${tobeEditedCourse._id}`, config)
        .then((res) => {
          console.log(res.data);
          const allProjectsData = res.data.map((singleProject, idx) => ({
            ...singleProject,
            edit: false,
          }));
          setProjects(allProjectsData);
        });
    }
  }, [tobeEditedCourse]);

  // const handleFileUpload = (e) => {
  //   if (e.target.files[0]) {
  //     setcurriculumPDF(e.target.files[0]);
  //   }
  // };

  const getUpdatedClasses = () => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    axios
      .get(`/api/course/class/${tobeEditedCourse._id}`, config)
      .then((res) => {
        const allClassesData = res.data.map((singleclass, idx) => ({
          ...singleclass,
          edit: false,
        }));
        setClasses(allClassesData);
      });
  };

  const getUpdatedProjects = () => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    axios
      .get(`/api/course/project/${tobeEditedCourse._id}`, config)
      .then((res) => {
        const allProjectsData = res.data.map((singleProject, idx) => ({
          ...singleProject,
          edit: false,
        }));
        setProjects(allProjectsData);
      });
  };

  const addNewCourse = async () => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    if (tobeEditedCourse._id) {
      // if (curriculumPDF === null) {
      // console.log("no pdf");
      const body = {
        name: name,
        //   courseImage: "",
        builds: [],
        innovates: [],
        description: "description",
        durationInHours: durationInHours,
        NoOfWeeks: NoOfWeeks,
        hoursPerWeek: hoursPerWeek,
        overview: "overview",
        detailedView: "detailedView",
        gradeRange: {
          minG: minimumGrade,
          maxG: maximumGrade,
        },
        price: {
          amount: amount,
          amountAfterDiscount: amountAfterDiscount,
        },
        outcomesByTopics: {
          learns: {
            topics: [learn[0], learn[1], learn[2]],
          },
          builds: {
            topics: [build[0], build[1], build[2]],
          },
          innovates: {
            topics: [innovate],
          },
        },
        courseStructure: null,
        curriculumPDF: curriculumPDF,
        totalClasses: totalClasses,
        instructors: [],
      };

      axios
        .put(`/api/course/${tobeEditedCourse._id}`, body, config)
        .then(async (res) => {
          await updateCourseGroups();
          closeAddNewForm();
          console.log(res.data);
        })
        .catch((err) => {
          alert("Error updating data.");
        });
      // } else {
      //   setOpen(true);
      //   console.log("uploading pdf...");
      //   // update pdf file
      //   const formData = new FormData();
      //   formData.append("files", curriculumPDF);
      //   const fileID = await axios
      //     .post("/api/file", formData, config)
      //     .then((res) => res.data.fileId)
      //     .catch((error) => {
      //       setOpen(false);
      //       alert("Error uploading file. Please try again.");
      //     });
      //   const body = {
      //     name: name,
      //     //   courseImage: "",
      //     builds: [],
      //     innovates: [],
      //     description: "description",
      //     durationInHours: durationInHours,
      //     NoOfWeeks: NoOfWeeks,
      //     hoursPerWeek: hoursPerWeek,
      //     overview: "overview",
      //     detailedView: "detailedView",
      //     gradeRange: {
      //       minG: minimumGrade,
      //       maxG: maximumGrade,
      //     },
      //     price: {
      //       amount: amount,
      //       amountAfterDiscount: amountAfterDiscount,
      //     },
      //     outcomesByTopics: {
      //       learns: {
      //         topics: [learn[0], learn[1], learn[2]],
      //       },
      //       builds: {
      //         topics: [build[0], build[1], build[2]],
      //       },
      //       innovates: {
      //         topics: [innovate],
      //       },
      //     },
      //     courseStructure: fileID,
      //     totalClasses: totalClasses,
      //     instructors: [],
      //   };

      //   axios
      //     .put(`/api/course/${tobeEditedCourse._id}`, body, config)
      //     .then(async (res) => {
      //       await updateCourseGroups();
      //       closeAddNewForm();
      //       console.log(res.data);
      //       setOpen(false);
      //     })
      //     .catch((err) => {
      //       alert("Error updating data.");
      //       setOpen(false);
      //     });
      // }
    } else {
      // const formData = new FormData();
      // formData.append("files", curriculumPDF);
      // const fileID = await axios
      //   .post("/api/file", formData, config)
      //   .then((res) => res.data.fileId)
      //   .catch((error) => ({ message: "Error" }));
      const body = {
        groupId: currentCurriculum,
        name: name,
        //   courseImage: "",
        builds: [],
        innovates: [],
        description: "description",
        durationInHours: durationInHours,
        NoOfWeeks: NoOfWeeks,
        hoursPerWeek: hoursPerWeek,
        overview: "overview",
        detailedView: "detailedView",
        gradeRange: {
          minG: minimumGrade,
          maxG: maximumGrade,
        },
        price: {
          amount: amount,
          amountAfterDiscount: amountAfterDiscount,
        },
        outcomesByTopics: {
          learns: {
            topics: [learn[0], learn[1], learn[2]],
          },
          builds: {
            topics: [build[0], build[1], build[2]],
          },
          innovates: {
            topics: [innovate],
          },
        },
        courseStructure: null,
        curriculumPDF: curriculumPDF,
        totalClasses: totalClasses,
        instructors: [],
      };
      axios
        .post("/api/course", body, config)
        .then((res) => {
          updateCourseGroups();
          closeAddNewForm();
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleLearnChange = (e, index) => {
    const newLearn = [...learn];
    newLearn[index] = e.target.value;
    setLearn(newLearn);
  };

  const handleBuildChange = (e, index) => {
    var newBuild = [...build];
    newBuild[index] = e.target.value;
    setBuild(newBuild);
  };

  const addClass = (e) => {
    e.preventDefault();
    const body = [
      {
        courseId: tobeEditedCourse._id,
        classNo: classNo,
        topic: classTopic,
        materials: {
          quizLink: quizLink,
          videoLink: videoLink,
          assignmentLink: assignmentLink,
          slideLink: slidesLink,
          references: [
            {
              refType: "text",
              link: refLink,
            },
          ],
        },
      },
    ];
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    axios.post("/api/course/class", body, config).then((res) => {
      document
        .querySelector(".adminNewCourse__newClassForm")
        .classList.remove("show");
      setclassNo(0);
      setclassTopic("");
      setquizLink("");
      setassignmentLink("");
      setvideoLink("");
      setslidesLink("");
      setrefLink("");
      getUpdatedClasses();
    });
  };

  const updateClasses = (e, index) => {
    e.preventDefault();
    console.log(classes[index]);
    const body = {
      // courseId: tobeEditedCourse._id,
      classNo: classes[index].classNo,
      topic: classes[index].topic,
      materials: classes[index].materials,
    };

    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    axios
      .put(`/api/course/class/${classes[index]._id}`, body, config)
      .then((res) => {
        // document
        //   .querySelector(".adminNewCourse__newClassForm")
        //   .classList.remove("show");
        console.log(res.data);
        alert("Class Updated!");
        // setclassNo(0);
        // setclassTopic("");
        // setquizLink("");
        // setassignmentLink("");
        // setvideoLink("");
        // setslidesLink("");
        // setrefLink("");
        // getUpdatedClasses();
      });
  };

  const updateProject = async (e, index) => {
    e.preventDefault();
    console.log(projects[index]);

    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    // UPDATE DATA
    const body = {
      courseId: tobeEditedCourse._id,
      no: projects[index].no,
      name: projects[index].name,
      question: projects[index].question,
      deadline: projects[index].deadline,
      format_submit: projects[index].format_submit,
    };

    if (
      projects[index].dashboardimage_student &&
      projects[index].dashboardimage_student !== null
    ) {
      // DELETE PROJECT IMAGES
      await axios
        .delete(`/api/file/${projects[index].image_Student}`, config)
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((err) => console.log(err));

      // ADD NEW
      const formData = new FormData();
      formData.append("files", projects[index].dashboardimage_student);
      const fileID = await axios
        .post("/api/file", formData, config)
        .then((res) => res.data.fileId)
        .catch((error) => console.log(error));

      body.image = fileID;
    }
    if (
      projects[index].dashboardimage &&
      projects[index].dashboardimage !== null
    ) {
      await axios
        .delete(`/api/file/${projects[index].image}`, config)
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((err) => console.log(err));

      // ADD NEW IMAGES

      const _formData = new FormData();
      _formData.append("files", projects[index].dashboardimage);
      const fileIDStudent = await axios
        .post("/api/file", _formData, config)
        .then((res) => res.data.fileId)
        .catch((error) => console.log(error));

      body.image_Student = fileIDStudent;
    }

    console.log(body);

    axios
      .put(`/api/course/project/${projects[index]._id}`, body, config)
      .then((res) => {
        // document
        //   .querySelector(".adminNewCourse__newClassForm")
        //   .classList.remove("show");
        console.log(res.data);
        alert("Project Updated!");
      });
  };

  const handleProjectStudentImageUpload = (e) => {
    if (e.target.files[0]) {
      setprojectStudentImage(e.target.files[0]);
    }
  };

  const handleProjectMainImageUpload = (e) => {
    if (e.target.files[0]) {
      setprojectMainImage(e.target.files[0]);
    }
  };

  const addProject = async (e) => {
    e.preventDefault();

    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    const formData = new FormData();
    formData.append("files", projectMainImage);
    const fileID = await axios
      .post("/api/file", formData, config)
      .then((res) => res.data.fileId)
      .catch((error) => console.log(error));

    const _formData = new FormData();
    _formData.append("files", projectStudentImage);
    const fileIDStudent = await axios
      .post("/api/file", _formData, config)
      .then((res) => res.data.fileId)
      .catch((error) => console.log(error));

    const body = [
      {
        courseId: tobeEditedCourse._id,
        no: projectNumber,
        name: projectTitle,
        question: projectQuestion,
        deadline: projectDeadline,
        format_submit: projectFormat,
        image: fileID,
        image_Student: fileIDStudent,
      },
    ];

    axios.post("/api/course/project", body, config).then((res) => {
      document
        .querySelector(".adminNewCourse__newProjectForm")
        .classList.remove("show");
      setprojectNumber(0);
      setprojectQuestion("");
      setProjectDeadline(0);
      setProjectFormat("");
      setProjectTitle("");
      getUpdatedProjects();
    });
  };

  const toggleEditFields = () => {
    setlabelColor(allowEdits ? "#9D9D9D" : "#4320BF");
    setAllowEdits(!allowEdits);
  };

  const showNewClassForm = () => {
    document
      .querySelector(".adminNewCourse__newClassForm")
      .classList.toggle("show");
    document
      .querySelector(".adminNewCourse__newClassSpan")
      .classList.toggle("close");
  };

  const showNewProjectForm = () => {
    document
      .querySelector(".adminNewCourse__newProjectForm")
      .classList.toggle("show");
    document
      .querySelector(".adminNewCourse__newProjectSpan")
      .classList.toggle("close");
  };

  const editSingleClassOBJ = (index) => {
    var newClasses = [...classes];
    newClasses[index].edit = !newClasses[index].edit;
    setClasses(newClasses);
  };

  const editSingleProjectOBJ = (index) => {
    var newProjects = [...projects];
    newProjects[index].edit = !newProjects[index].edit;
    setProjects(newProjects);
  };

  console.log(tobeEditedCourse);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClassChange = (e, index) => {
    let _classes = [...classes];
    let _state = e.target.id.toString().split("-")[0];
    _classes[index][_state] = e.target.value;
    setClasses(_classes);
  };

  const handleClassLinkChange = (e, section, index) => {
    let _classes = [...classes];
    switch (section) {
      case "reference": {
        _classes[index].materials.references[0].link = e.target.value;
        break;
      }
      case "video": {
        _classes[index].materials.videoLink = e.target.value;
        break;
      }
      case "slides": {
        _classes[index].materials.slideLink = e.target.value;
        break;
      }
      case "quiz": {
        _classes[index].materials.quizLink = e.target.value;
        break;
      }
    }
    setClasses(_classes);
  };

  const handleProjectChange = (e, index) => {
    let _projects = [...projects];
    let _state = e.target.id.toString().split("-")[0];
    _projects[index][_state] = e.target.value;
    setProjects(_projects);
  };

  const handleProjectStudentDashboardImageChange = (e, index) => {
    let _projects = [...projects];
    _projects[index].dashboardimage = e.target.files[0];
    setProjects(_projects);
  };

  const handleProjectDashboardImageChange = (e, index) => {
    let _projects = [...projects];
    _projects[index].dashboardimage_student = e.target.files[0];
    setProjects(_projects);
  };

  // const uploadPDF = (e) => {
  //   console.log("uploading file pdf");
  //   const userInfo = localStorage.getItem("userInfo");
  //   const token = userInfo ? JSON.parse(userInfo).token : "";
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       authorization: token,
  //     },
  //   };
  //   if (e.target.files[0]) {
  //     const formData = new FormData();
  //     formData.append("files", e.target.files[0]);
  //     axios
  //       .post("/api/file", formData, config)
  //       .then((res) => {
  //         console.log("got the response");
  //         console.log(res.data);
  //       })
  //       .catch((error) => {
  //         console.log("some error");
  //         console.log(error);
  //       });
  //   }
  // };

  return (
    <div className="adminNewCourse">
      <Backdrop open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="adminNewCourse__section">
        <div className="adminNewCourse__content">
          {tobeEditedCourse._id && (
            <img
              src={EditIcon}
              className="adminNewCourse__contentEdit"
              onClick={toggleEditFields}
            ></img>
          )}
          <div className="adminNewCourse__detailsleft">
            <div className="adminNewCourse__inputSection">
              <label
                style={{
                  color: labelColor,
                }}
              >
                Course Name
              </label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={
                  tobeEditedCourse._id ? (allowEdits ? false : true) : false
                }
              />
            </div>
            <div className="adminNewCourse__inputSection">
              <label
                style={{
                  color: labelColor,
                }}
              >
                Total Classses
              </label>
              <input
                type="text"
                onChange={(e) => setTotalClasses(e.target.value)}
                value={totalClasses}
                disabled={
                  tobeEditedCourse._id ? (allowEdits ? false : true) : false
                }
              />
            </div>
            <div className="adminNewCourse__inputSectionGrade">
              <div className="adminNewCourse__inputSection">
                <label
                  style={{
                    color: labelColor,
                  }}
                >
                  Minimum Grade
                </label>
                <input
                  type="text"
                  onChange={(e) => setminimumGrade(e.target.value)}
                  value={minimumGrade}
                  disabled={
                    tobeEditedCourse._id ? (allowEdits ? false : true) : false
                  }
                />
              </div>
              <div className="adminNewCourse__inputSection">
                <label
                  style={{
                    color: labelColor,
                  }}
                >
                  Maximum Grade
                </label>
                <input
                  type="text"
                  onChange={(e) => setmaximumGrade(e.target.value)}
                  value={maximumGrade}
                  disabled={
                    tobeEditedCourse._id ? (allowEdits ? false : true) : false
                  }
                />
              </div>
            </div>
            <div className="adminNewCourse__inputSection">
              <label
                style={{
                  color: labelColor,
                }}
              >
                Curriculum PDF{" "}
              </label>
              <input
                type="text"
                disabled={
                  tobeEditedCourse._id ? (allowEdits ? false : true) : false
                }
                value={curriculumPDF}
                onChange={(e) => setcurriculumPDF(e.target.value)}
              />
              {/* <input
                type="file"
                disabled={
                  tobeEditedCourse._id ? (allowEdits ? false : true) : false
                }
                onChange={uploadPDF}
              /> */}
            </div>
          </div>
          <div className="adminNewCourse__detailsmiddle">
            <div className="adminNewCourse__inputSection">
              <label
                style={{
                  color: labelColor,
                }}
              >
                Learn
              </label>
              <div className="adminNewCourse__inputSection__learn">
                <input
                  type="text"
                  onChange={(e) => handleLearnChange(e, 0)}
                  value={learn[0]}
                  disabled={
                    tobeEditedCourse._id ? (allowEdits ? false : true) : false
                  }
                />
                <input
                  type="text"
                  onChange={(e) => handleLearnChange(e, 1)}
                  value={learn[1]}
                  disabled={
                    tobeEditedCourse._id ? (allowEdits ? false : true) : false
                  }
                />
              </div>
              <input
                type="text"
                onChange={(e) => handleLearnChange(e, 2)}
                value={learn[2]}
                disabled={
                  tobeEditedCourse._id ? (allowEdits ? false : true) : false
                }
              />
            </div>
            <div className="adminNewCourse__inputSection">
              <label
                style={{
                  color: labelColor,
                }}
              >
                Build
              </label>
              <div className="adminNewCourse__inputSection__build">
                <input
                  type="text"
                  onChange={(e) => handleBuildChange(e, 0)}
                  value={build[0]}
                  disabled={
                    tobeEditedCourse._id ? (allowEdits ? false : true) : false
                  }
                />
                <input
                  type="text"
                  onChange={(e) => handleBuildChange(e, 1)}
                  value={build[1]}
                  disabled={
                    tobeEditedCourse._id ? (allowEdits ? false : true) : false
                  }
                />
              </div>
              <input
                type="text"
                onChange={(e) => handleBuildChange(e, 2)}
                value={build[2]}
                disabled={
                  tobeEditedCourse._id ? (allowEdits ? false : true) : false
                }
              />
            </div>
          </div>
          <div className="adminNewCourse__detailsright">
            <div className="adminNewCourse__inputSection">
              <label
                style={{
                  color: labelColor,
                }}
              >
                Innovate
              </label>
              <input
                type="text"
                onChange={(e) => setInnovate(e.target.value)}
                value={innovate}
                disabled={
                  tobeEditedCourse._id ? (allowEdits ? false : true) : false
                }
              />
            </div>
            <div className="adminNewCourse__inputSection adminNewCourse__inputSection__price">
              <div className="adminNewCourse__inputSection__priceSection">
                <label
                  style={{
                    color: labelColor,
                  }}
                >
                  Original Price
                </label>
                <input
                  type="text"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  disabled={
                    tobeEditedCourse._id ? (allowEdits ? false : true) : false
                  }
                />
              </div>
              <div className="adminNewCourse__inputSection__priceSection">
                <label
                  style={{
                    color: labelColor,
                  }}
                >
                  New Price
                </label>
                <input
                  type="text"
                  onChange={(e) => setAmountAfterDiscount(e.target.value)}
                  value={amountAfterDiscount}
                  disabled={
                    tobeEditedCourse._id ? (allowEdits ? false : true) : false
                  }
                />
              </div>
            </div>
            <div className="adminNewCourse__inputSection">
              <label
                style={{
                  color: labelColor,
                }}
              >
                Discount
              </label>
              <input
                type="text"
                readOnly
                value={
                  (((amount - amountAfterDiscount) / amount) * 100).toFixed(2) +
                  "%"
                }
              />
            </div>
          </div>
        </div>

        <div className="adminNewCourse__buttons">
          {tobeEditedCourse._id ? (
            allowEdits ? (
              <>
                <button
                  className="adminNewCourse__saveButton"
                  onClick={addNewCourse}
                >
                  Save Details
                </button>
                {/* <button
            className="adminNewCourse__saveButton"
            onClick={() => setAllowEdits(!allowEdits)}
          >
            Edit Details
          </button> */}
              </>
            ) : null
          ) : (
            <button
              className="adminNewCourse__saveButton"
              onClick={addNewCourse}
            >
              Save Details
            </button>
          )}
        </div>
      </div>

      {tobeEditedCourse._id && (
        <>
          <div className="adminNewCourse__classesProjects">
            <div className="adminNewCourse__section adminNewCourse__sectionClasses">
              <div className="adminNewCourse__classes">
                <div className="adminNewCourse__classesHeader">
                  <h3>Curriculum Classes</h3>
                  <input type="text" placeholder="Search Class" />
                </div>
                <div
                  className="adminNewCourse__newClassSpan"
                  onClick={showNewClassForm}
                >
                  <p>+</p>
                  <h3>Add a new class</h3>
                </div>
                <div className="adminNewCourse__newClassForm">
                  <div className="adminNewCourse__newClassFormHalfContainer">
                    <div className="adminNewCourse__newClassFormHalf">
                      <div className="adminNewCourse__newClassInputSection">
                        <label>Class Name/Number</label>
                        <input
                          type="text"
                          value={classNo}
                          onChange={(e) => setclassNo(e.target.value)}
                        />
                      </div>
                      <div className="adminNewCourse__newClassInputSection">
                        <label>Class Topic</label>
                        <input
                          type="text"
                          value={classTopic}
                          onChange={(e) => setclassTopic(e.target.value)}
                        />
                      </div>
                      <div className="adminNewCourse__newClassInputSection">
                        <label>Video Link</label>
                        <input
                          type="text"
                          value={videoLink}
                          onChange={(e) => setvideoLink(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="adminNewCourse__newClassFormHalf">
                      <div className="adminNewCourse__newClassInputSection">
                        <label>Slides Link</label>
                        <input
                          type="text"
                          value={slidesLink}
                          onChange={(e) => setslidesLink(e.target.value)}
                        />
                      </div>
                      <div className="adminNewCourse__newClassInputSection">
                        <label>Quiz Link</label>
                        <input
                          type="text"
                          value={quizLink}
                          onChange={(e) => setquizLink(e.target.value)}
                        />
                      </div>
                      <div className="adminNewCourse__newClassInputSection">
                        <label>Other Link (if any)</label>
                        <input
                          type="text"
                          value={refLink}
                          onChange={(e) => setrefLink(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="adminNewCourse__newClassFormButtons">
                    <button
                      className="adminNewCourse__newClassFormButtons__cancel"
                      onClick={showNewClassForm}
                    >
                      Cancel
                    </button>
                    <button onClick={addClass}>Save</button>
                  </div>
                </div>
                {/* EXISTING CLASSES */}
                {classes.map((singleClass, index) => {
                  return (
                    <Accordion key={singleClass._id}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id={"panel1a-header" + index}
                      >
                        {/* <div className="adminNewCourse__existingClassSpan"> */}
                        <h3 className="adminNewCourse__existingClassSpanHeader">
                          {"Class " + singleClass.classNo}
                        </h3>
                        {/* </div> */}
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="adminNewCourse__newClassForm adminNewCourse__existingClassForm">
                          <img
                            src={EditIcon}
                            className="adminNewCourse__existingClassFormEdit"
                            onClick={() => editSingleClassOBJ(index)}
                          ></img>
                          <div className="adminNewCourse__newClassFormHalfContainer">
                            <div className="adminNewCourse__newClassFormHalf">
                              <div className="adminNewCourse__newClassInputSection">
                                <label
                                  style={{
                                    color: singleClass.edit
                                      ? "#4320BF"
                                      : "#9D9D9D",
                                  }}
                                >
                                  Class Name/Number
                                </label>
                                <input
                                  type="text"
                                  value={singleClass.classNo}
                                  disabled={singleClass.edit ? false : true}
                                  id={"classNo-" + index}
                                  onChange={(e) => handleClassChange(e, index)}
                                />
                              </div>
                              <div className="adminNewCourse__newClassInputSection">
                                <label
                                  style={{
                                    color: singleClass.edit
                                      ? "#4320BF"
                                      : "#9D9D9D",
                                  }}
                                >
                                  Class Topic
                                </label>
                                <input
                                  type="text"
                                  value={singleClass.topic}
                                  id={"topic-" + index}
                                  disabled={singleClass.edit ? false : true}
                                  onChange={(e) => handleClassChange(e, index)}
                                />
                              </div>
                              <div className="adminNewCourse__newClassInputSection">
                                <label
                                  style={{
                                    color: singleClass.edit
                                      ? "#4320BF"
                                      : "#9D9D9D",
                                  }}
                                >
                                  Other Link (if any)
                                </label>
                                <input
                                  type="text"
                                  value={
                                    singleClass.materials.references[0].link
                                  }
                                  disabled={singleClass.edit ? false : true}
                                  onChange={(e) =>
                                    handleClassLinkChange(e, "reference", index)
                                  }
                                />
                              </div>
                              <div className="adminNewCourse__newClassInputSection">
                                <label
                                  style={{
                                    color: singleClass.edit
                                      ? "#4320BF"
                                      : "#9D9D9D",
                                  }}
                                >
                                  Video Link
                                </label>
                                <input
                                  type="text"
                                  value={singleClass.materials.videoLink}
                                  disabled={singleClass.edit ? false : true}
                                  onChange={(e) =>
                                    handleClassLinkChange(e, "video", index)
                                  }
                                />
                              </div>
                            </div>
                            <div className="adminNewCourse__newClassFormHalf">
                              <div className="adminNewCourse__newClassInputSection">
                                <label
                                  style={{
                                    color: singleClass.edit
                                      ? "#4320BF"
                                      : "#9D9D9D",
                                  }}
                                >
                                  Slides Link
                                </label>
                                <input
                                  type="text"
                                  value={singleClass.materials.slideLink}
                                  disabled={singleClass.edit ? false : true}
                                  onChange={(e) =>
                                    handleClassLinkChange(e, "slides", index)
                                  }
                                />
                              </div>
                              <div className="adminNewCourse__newClassInputSection">
                                <label
                                  style={{
                                    color: singleClass.edit
                                      ? "#4320BF"
                                      : "#9D9D9D",
                                  }}
                                >
                                  Quiz Link
                                </label>
                                <input
                                  type="text"
                                  value={singleClass.materials.quizLink}
                                  // onChange={(e) => setquizLink(e.target.value)}
                                  disabled={singleClass.edit ? false : true}
                                  onChange={(e) =>
                                    handleClassLinkChange(e, "quiz", index)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          {singleClass.edit && (
                            <div className="adminNewCourse__newClassFormButtons">
                              <button className="adminNewCourse__newClassFormButtons__cancel">
                                Cancel
                              </button>
                              <button onClick={(e) => updateClasses(e, index)}>
                                Save
                              </button>
                            </div>
                          )}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </div>
            </div>
            <div className="adminNewCourse__section adminNewCourse__sectionProjects">
              <div className="adminNewCourse__projects">
                <div className="adminNewCourse__projectsHeader">
                  <h3>Project Section</h3>
                  <input type="text" placeholder="Search Project" />
                </div>
                <div
                  className="adminNewCourse__newProjectSpan"
                  onClick={showNewProjectForm}
                >
                  <p>+</p>
                  <h3>Add a new project</h3>
                </div>
                <div className="adminNewCourse__newProjectForm">
                  <div className="adminNewCourse__newProjectForm__Content">
                    <div className="adminNewCourse__newProjectInputSection">
                      <label>Project Title</label>
                      <input
                        type="text"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                      />
                    </div>
                    <div className="adminNewCourse__newProjectInputSection">
                      <label>Project Numbering</label>
                      <input
                        type="text"
                        value={projectNumber}
                        onChange={(e) => setprojectNumber(e.target.value)}
                      />
                    </div>
                    <div className="adminNewCourse__newProjectInputSection">
                      <label>Question</label>
                      <textarea
                        type="text"
                        value={projectQuestion}
                        onChange={(e) => setprojectQuestion(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <div className="adminNewCourse__newProjectInputSection">
                      <label>Image</label>
                      <div
                        className="adminNewCourse__newProjectInputSectionImage"
                        onClick={() =>
                          document
                            .getElementById("project_main_image_input")
                            .click()
                        }
                      >
                        <input
                          type="file"
                          id="project_main_image_input"
                          style={{ display: "none" }}
                          onChange={handleProjectMainImageUpload}
                        />
                        <h3>+</h3>
                        <p>Attach file</p>
                      </div>
                    </div>
                    <div className="adminNewCourse__newProjectInputSection">
                      <label>Image for student dashboard</label>
                      <div
                        className="adminNewCourse__newProjectInputSectionImage"
                        onClick={() =>
                          document
                            .getElementById("project_student_image_input")
                            .click()
                        }
                      >
                        <input
                          type="file"
                          style={{ display: "none" }}
                          id="project_student_image_input"
                          onChange={handleProjectStudentImageUpload}
                        />
                        <h3>+</h3>
                        <p>Attach file</p>
                      </div>
                    </div>
                    <div className="adminNewCourse__newProjectInputSection">
                      <label>Deadline (no. of days)</label>
                      <input
                        type="text"
                        value={projectDeadline}
                        onChange={(e) => setProjectDeadline(e.target.value)}
                      />
                    </div>
                    <div className="adminNewCourse__newProjectInputSection">
                      <label>Format</label>
                      <div className="adminNewCourse__newProjectInputSectionFormat">
                        <button
                          onClick={() => setProjectFormat("link")}
                          className={
                            projectFormat === "link"
                              ? "adminNewCourse__newProjectSelectedFormat"
                              : ""
                          }
                        >
                          Link
                        </button>
                        <button
                          onClick={() => setProjectFormat("pdf")}
                          className={
                            projectFormat === "pdf"
                              ? "adminNewCourse__newProjectSelectedFormat"
                              : ""
                          }
                        >
                          PDF
                        </button>
                        <button
                          onClick={() => setProjectFormat("video")}
                          className={
                            projectFormat === "video"
                              ? "adminNewCourse__newProjectSelectedFormat"
                              : ""
                          }
                        >
                          Video
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="adminNewCourse__newClassFormButtons">
                    <button
                      className="adminNewCourse__newClassFormButtons__cancel"
                      onClick={showNewProjectForm}
                    >
                      Cancel
                    </button>
                    <button onClick={addProject}>Save</button>
                  </div>
                </div>
                {/* EXISTING PROJECTS */}
                {projects?.map((singleProject, index) => {
                  return (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-project-content"
                        id={"project-header" + index}
                      >
                        <div className="adminNewCourse__existingClassSpanHeaderContainer">
                          <h3 className="adminNewCourse__existingClassSpanHeader">
                            {singleProject.name}
                          </h3>
                          <div className="adminNewCourse__existingClassSpanHeaderContent">
                            <p>{"Project " + singleProject.no}</p>
                            <p>{"Deadline -  " + singleProject.deadline}</p>
                          </div>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="adminNewCourse__newProjectForm adminNewCourse__existingProjectForm">
                          <img
                            src={EditIcon}
                            className="adminNewCourse__existingClassFormEdit"
                            onClick={() => editSingleProjectOBJ(index)}
                          ></img>
                          <div className="adminNewCourse__newProjectForm__Content">
                            <div className="adminNewCourse__newProjectInputSection">
                              <label
                                style={{
                                  color: singleProject.edit
                                    ? "#4320BF"
                                    : "#9D9D9D",
                                }}
                              >
                                Project Title
                              </label>
                              <input
                                type="text"
                                value={singleProject.name}
                                disabled={singleProject.edit ? false : true}
                                id={"name-" + index}
                                onChange={(e) => handleProjectChange(e, index)}
                              />
                            </div>
                            <div className="adminNewCourse__newProjectInputSection">
                              <label
                                style={{
                                  color: singleProject.edit
                                    ? "#4320BF"
                                    : "#9D9D9D",
                                }}
                              >
                                Project Numbering
                              </label>
                              <input
                                type="text"
                                value={singleProject.no}
                                disabled={singleProject.edit ? false : true}
                                id={"no-" + index}
                                onChange={(e) => handleProjectChange(e, index)}
                              />
                            </div>
                            <div className="adminNewCourse__newProjectInputSection">
                              <label
                                style={{
                                  color: singleProject.edit
                                    ? "#4320BF"
                                    : "#9D9D9D",
                                }}
                              >
                                Question
                              </label>
                              <textarea
                                type="text"
                                value={singleProject.question}
                                disabled={singleProject.edit ? false : true}
                                id={"question-" + index}
                                onChange={(e) => handleProjectChange(e, index)}
                                rows={4}
                              />
                            </div>
                            <div className="adminNewCourse__newProjectInputSection">
                              <label
                                style={{
                                  color: singleProject.edit
                                    ? "#4320BF"
                                    : "#9D9D9D",
                                }}
                              >
                                Image
                              </label>
                              <div
                                className="adminNewCourse__newProjectInputSectionImage"
                                onClick={() =>
                                  document
                                    .getElementById(
                                      "project_dashboard_image_input" + index
                                    )
                                    .click()
                                }
                              >
                                <input
                                  type="file"
                                  style={{ display: "none" }}
                                  onChange={(e) =>
                                    handleProjectDashboardImageChange(e, index)
                                  }
                                  id={"project_dashboard_image_input" + index}
                                />
                                <h3>+</h3>
                                <p>Attach file</p>
                              </div>
                            </div>
                            <div className="adminNewCourse__newProjectInputSection">
                              <label
                                style={{
                                  color: singleProject.edit
                                    ? "#4320BF"
                                    : "#9D9D9D",
                                }}
                              >
                                Image for student dashboard
                              </label>
                              <div
                                className="adminNewCourse__newProjectInputSectionImage"
                                onClick={() =>
                                  document
                                    .getElementById(
                                      "project_student_dashboard_image_input" +
                                        index
                                    )
                                    .click()
                                }
                              >
                                <input
                                  type="file"
                                  style={{ display: "none" }}
                                  onChange={(e) =>
                                    handleProjectStudentDashboardImageChange(
                                      e,
                                      index
                                    )
                                  }
                                  id={
                                    "project_student_dashboard_image_input" +
                                    index
                                  }
                                />
                                <h3>+</h3>
                                <p>Attach file</p>
                              </div>
                            </div>
                            <div className="adminNewCourse__newProjectInputSection">
                              <label
                                style={{
                                  color: singleProject.edit
                                    ? "#4320BF"
                                    : "#9D9D9D",
                                }}
                              >
                                Deadline (no. of days)
                              </label>
                              <input
                                type="text"
                                disabled={singleProject.edit ? false : true}
                                value={singleProject.deadline}
                                id={"deadline-" + index}
                                onChange={(e) => handleProjectChange(e, index)}
                                // onChange={(e) => setProjectDeadline(e.target.value)}
                              />
                            </div>
                            <div className="adminNewCourse__newProjectInputSection">
                              <label
                                style={{
                                  color: singleProject.edit
                                    ? "#4320BF"
                                    : "#9D9D9D",
                                }}
                              >
                                Submission Format
                              </label>
                              <div className="adminNewCourse__newProjectInputSectionFormat">
                                <button
                                  // onClick={() => setProjectFormat("link")}
                                  className={
                                    singleProject.format_submit === "link"
                                      ? "adminNewCourse__newProjectSelectedFormat"
                                      : ""
                                  }
                                >
                                  Link
                                </button>
                                <button
                                  // onClick={() => setProjectFormat("pdf")}
                                  className={
                                    singleProject.format_submit === "pdf"
                                      ? "adminNewCourse__newProjectSelectedFormat"
                                      : ""
                                  }
                                >
                                  PDF
                                </button>
                                <button
                                  // onClick={() => setProjectFormat("video")}
                                  className={
                                    singleProject.format_submit === "video"
                                      ? "adminNewCourse__newProjectSelectedFormat"
                                      : ""
                                  }
                                >
                                  Video
                                </button>
                              </div>
                            </div>
                          </div>
                          {singleProject.edit && (
                            <div className="adminNewCourse__newClassFormButtons">
                              <button className="adminNewCourse__newClassFormButtons__cancel">
                                Cancel
                              </button>
                              <button onClick={(e) => updateProject(e, index)}>
                                Save
                              </button>
                            </div>
                          )}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminNewCourse;
