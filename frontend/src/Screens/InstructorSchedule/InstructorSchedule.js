import InstructorMenu from "../../Components/InstructorMenu";
import React, { useEffect, useState } from "react";
import Fontawesome from "react-fontawesome";
import { Dropdown } from "react-bootstrap";
import deepak from "./img/deepak.png";
import eventimage from "./img/eventimage.png";
import "./css/InstructorSchedule.css";
import { useSelector, useDispatch } from "react-redux";
import {
  instructorSchedule,
  instructorInfo,
  instructorUpdate,
  instructorUpdateBatchClass,
  updateClassLink,
  instructorUpdateBatchProject,
} from "../../Actions/Instructor";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

const getStatus = (s, e) => {
  var today = new Date();
  if (new Date(s) > today) {
    return "upcoming";
  } else if (new Date(e) < today) {
    return "completed";
  } else if (new Date(s) < today && new Date(e) > today) {
    return "active";
  } else {
    return "completed";
  }
};

const TodoList = () => {
  const dispatch = useDispatch();
  const { instructorInfo: instructor } = useSelector(
    (state) => state.instructorInfo
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo) {
      dispatch(instructorInfo());
    }
  }, [instructorInfo, userInfo]);

  return (
    <>
      {instructor && (
        <div className="to-do-list">
          <div className="to-do-title">
            <Fontawesome name="calendar" />
            &nbsp; &nbsp;My To Do List
          </div>
          <div class="list">
            <textarea
              placeholder="Type here.."
              onBlur={(e) => {
                dispatch(instructorUpdate({ todolist: e.target.value }));
              }}
            >
              {instructor.todolist}
            </textarea>
          </div>
        </div>
      )}
    </>
  );
};

const Event = () => {
  return (
    <>
      <div className="event">
        <div className="image">
          <img className="img-fluid" src={eventimage} />
        </div>
        <div className="event-message">30 classes completed</div>
      </div>
    </>
  );
};

const Student = (props) => {
  const [presentStatus, setpresentStatus] = React.useState(props.attendance);
  const handleStudentAttendance = (e) => {
    const studobj = {
      userId: props.details._id,
      present: e.target.checked,
    };
    props.addStudAttendance(studobj);
    setpresentStatus(e.target.checked);
  };

  useEffect(() => {
    setpresentStatus(props.attendance);
  }, [props.attendance]);

  return (
    <>
      <div className="attendance-list-item">
        <div className="row mx-0">
          <div className="student-pic">
            <img className="img-fluid" src={deepak} alt="" />
          </div>
          {props.details && (
            <>
              <div className="student-info">
                <div className="student-name">
                  {props.details.name && props.details.name.first}{" "}
                  {props.details.name.last}
                </div>
                <div className="student-age">18 yrs</div>
              </div>

              <div className="mark-attendance align-self-center ml-auto">
                <input
                  type="checkbox"
                  className="check"
                  disabled={props.disabled}
                  checked={presentStatus}
                  onChange={handleStudentAttendance}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const Attendance = (props) => {
  const dispatch = useDispatch();

  const disable = props.status === "upcoming" ? true : false;
  const saveLink = props.status === "completed" ? true : false;

  const [studAttendanceArr, setstudAttendanceArr] = useState([]);
  const [allStudentData, setallStudentData] = useState([]);
  const [selectAllStudents, setselectAllStudents] = useState(false);

  useEffect(() => {
    setstudAttendanceArr(props.attendance);
  }, [props.attendance]);

  useEffect(() => {
    setallStudentData(props.students);
  }, [props.students]);

  const addStudAttendance = (studobj) => {
    let _studAttendanceArr = [...studAttendanceArr];

    let count = 0;
    _studAttendanceArr.forEach((allAtt) => {
      if (allAtt.userId === studobj.userId) {
        allAtt.present = studobj.present;
        count++;
      }
    });
    if (count === 0) {
      _studAttendanceArr.push(studobj);
    }
    setstudAttendanceArr(_studAttendanceArr);
  };

  const saveattendance = () => {
    dispatch(
      instructorUpdateBatchClass(
        { attendance: studAttendanceArr },
        props.batchId,
        props.classId
      )
    );
    alert("Attendance Updated!");
  };

  const handleSelectAllChange = (e) => {
    const status = e.target.checked;
    let _studAttendanceArr = [...studAttendanceArr];
    setselectAllStudents(status);
    if (status) {
      allStudentData.forEach((stud) => {
        let studAttIndex = _studAttendanceArr.findIndex(
          (att) => att.userId === stud.userId
        );
        if (studAttIndex !== -1) {
          _studAttendanceArr[studAttIndex].present = true;
        } else {
          _studAttendanceArr.push({
            userId: stud.userId,
            present: true,
          });
        }
      });
      setstudAttendanceArr(_studAttendanceArr);
    } else {
      allStudentData.forEach((stud) => {
        let studAttIndex = _studAttendanceArr.findIndex(
          (att) => att.userId === stud.userId
        );
        if (studAttIndex !== -1) {
          _studAttendanceArr[studAttIndex].present = false;
        } else {
          _studAttendanceArr.push({
            userId: stud.userId,
            present: false,
          });
        }
      });
      setstudAttendanceArr(_studAttendanceArr);
    }
  };

  return (
    <>
      <div className="attendance">
        <div className="attendance-title border-bottom">Attendance</div>
        <input
          type="checkbox"
          value={selectAllStudents}
          onChange={handleSelectAllChange}
        ></input>
        <div className="attendance-list">
          {props.students.map((s) => {
            return (
              <Student
                details={s.details[0]}
                disabled={disable}
                batchId={props.batchId}
                classId={props.classId}
                attendance={
                  studAttendanceArr?.filter((att) => att.userId === s.userId)[0]
                    ?.present
                    ? true
                    : false
                }
                currentStudent={
                  studAttendanceArr?.filter((att) => att.userId === s.userId)[0]
                    ?.userId
                }
                allattendance={studAttendanceArr}
                addStudAttendance={addStudAttendance}
              />
            );
          })}
        </div>
        <div className="save-attendance">
          <button disabled={disable} onClick={saveattendance}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

const Materials = (props) => {
  const dispatch = useDispatch();

  const [slide, shareSlides] = useState(
    props.materials != null ? props.materials.slides : false
  );
  const [assignment, shareAssignment] = useState(
    props.materials != null ? props.materials.assignments : false
  );
  const [quiz, shareQuiz] = useState(
    props.materials != null ? props.materials.quiz : false
  );
  const [link, shareLink] = useState(
    props.materials != null ? props.materials.link : false
  );

  const allState =
    props.materials != null &&
    props.materials.slides &&
    props.materials.assignments &&
    props.materials.quiz &&
    props.materials.link
      ? true
      : false;

  const [all, shareAll] = useState(allState);
  const [classLink, setClassLink] = useState(
    props.classDetails?.classLink != null ? props.classDetails?.classLink : ""
  );

  const disable = !(props.status === "upcoming") ? false : true;
  const saveLink = props.status === "completed" ? true : false;

  useEffect(() => {
    if (all) {
      shareSlides(true);
      shareAssignment(true);
      shareLink(true);
      shareQuiz(true);
    }
  }, [all, link, slide, quiz, assignment]);

  const saveClassLink = (e) => {
    e.preventDefault();
    if (classLink !== "") {
      dispatch(updateClassLink(classLink, props.classId));
      alert("Class link added...");
    } else {
      alert("Add the link");
    }
  };

  useEffect(() => {
    const materials = {
      link: link,
      slides: slide,
      assignments: assignment,
      quiz: quiz,
    };
    dispatch(
      instructorUpdateBatchClass({ materials }, props.batchId, props.classId)
    );
  }, [link, slide, quiz, assignment]);

  const handleLinkShare = (e, mat) => {
    switch (mat) {
      case "link": {
        shareLink(e.target.checked);
        break;
      }
      case "slides": {
        shareSlides(e.target.checked);
        break;
      }
      case "assignments": {
        shareAssignment(e.target.checked);
        break;
      }
      case "quiz": {
        shareQuiz(e.target.checked);
        break;
      }
    }
    const materials = {
      link: mat === "link" ? e.target.checked : link,
      slides: mat === "slides" ? e.target.checked : slide,
      assignments: mat === "assignments" ? e.target.checked : link,
      quiz: mat === "quiz" ? e.target.checked : link,
    };
    dispatch(
      instructorUpdateBatchClass({ materials }, props.batchId, props.classId)
    );
  };

  return (
    <>
      <div className="class-material-details border">
        <div className="row mx-0 share-all border-bottom align-items-center">
          Share all
          <label class="switch">
            <input
              type="checkbox"
              id="share-all"
              onChange={() => {
                shareAll(!all);
              }}
              checked={all}
              // disabled={disable}
            />
            <span class="slider"></span>
          </label>
        </div>
        <div className="all-links">
          <div>
            <div className="row mx-0 align-items-center">
              Class link
              <label class="switch">
                <input
                  type="checkbox"
                  id="share-link"
                  onChange={(e) => handleLinkShare(e, "link")}
                  checked={link}
                  // disabled={saveLink}
                />
                <span class="slider"></span>
              </label>
            </div>
            <input
              type="text"
              placeholder="class link"
              disabled={saveLink}
              value={classLink}
              onChange={(e) => setClassLink(e.target.value)}
            />
            <button
              className="save-link"
              disabled={saveLink}
              onClick={saveClassLink}
            >
              Save
            </button>
          </div>
          <div className="row mx-0 align-items-center">
            Share slides
            <label class="switch">
              <input
                type="checkbox"
                id="share-slides"
                onChange={(e) => handleLinkShare(e, "slides")}
                checked={slide}
                // disabled={disable}
              />
              <span class="slider"></span>
            </label>
          </div>
          <div className="row mx-0 align-items-center">
            Share assignment
            <label class="switch">
              <input
                type="checkbox"
                id="share-assignment"
                onChange={(e) => handleLinkShare(e, "assignments")}
                checked={assignment}
                // disabled={disable}
              />
              <span class="slider"></span>
            </label>
          </div>
          <div className="row mx-0 align-items-center">
            Share quiz
            <label class="switch">
              <input
                type="checkbox"
                id="share-quiz"
                onChange={(e) => handleLinkShare(e, "quiz")}
                checked={quiz}
                // disabled={disable}
              />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

const AssignProject = (props) => {
  //console.log(props);
  const dispatch = useDispatch();
  const [selectedProj, setSelectedProj] = useState("");

  const handleProjectEnable = () => {
    dispatch(
      instructorUpdateBatchClass(
        { assignedProject: selectedProj },
        props.batchId,
        props.classId
      )
    );
    dispatch(
      instructorUpdateBatchProject(
        { isActive: true, lastDate: Date.now() },
        props.batchId,
        selectedProj
      )
    );
    // alert("Project Enabled!");
    // console.log(selectedProj);
  };

  const [activeClass, setActiveClass] = useState(true);
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    if (props.classId && props.classId !== null) {
      setActiveClass(false);
    }
  }, props.classId);

  return (
    <div className="isntructor__enableProjects">
      <label>Enabled Project for this class</label>
      {props.projectDetails?.name ? (
        <>
          <ul>
            <li>{props.projectDetails?.name}</li>
          </ul>
          {!edit && (
            <button onClick={() => setEdit(true)}>
              Edit Project
              {/* {!edit ? "Edit Project" : "Cancel"} */}
            </button>
          )}

          {edit && <button onClick={() => setEdit(false)}>Cancle</button>}

          {edit && (
            <>
              {" "}
              <select
                value={selectedProj}
                disable={activeClass}
                onChange={(e) => setSelectedProj(e.target.value)}
              >
                <option>Select Project to enable</option>
                {props.allProjectsDetails?.map((proj) => {
                  let projData = props.allProjectsBatch.filter(
                    (pb) => pb.projectId === proj._id
                  );
                  projData = projData[0];
                  return (
                    <option
                      value={proj._id}
                      style={{
                        backgroundColor: projData?.isActive ? "green" : "",
                      }}
                    >
                      {proj.name}
                    </option>
                  );
                })}
              </select>
              <button disabled={activeClass} onClick={handleProjectEnable}>
                Enable
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <select
            value={selectedProj}
            disabled={activeClass}
            onChange={(e) => setSelectedProj(e.target.value)}
          >
            <option>Select Project to enable</option>
            {props.allProjectsDetails?.map((proj) => {
              let projData = props.allProjectsBatch.filter(
                (pb) => pb.projectId === proj._id
              );
              projData = projData[0];
              return (
                <option
                  value={proj._id}
                  style={{ backgroundColor: projData?.isActive ? "green" : "" }}
                >
                  {proj.name}
                </option>
              );
            })}
          </select>
          <button disabled={activeClass} onClick={handleProjectEnable}>
            Enable
          </button>
        </>
      )}
    </div>
  );
};

const Results = (props) => {
  // const disable = props.status === "active" ? false : true;
  const disable = false;
  const saveLink = props.status === "completed" ? true : false;
  const [open, setOpen] = React.useState(false);
  const [allSubmissions, setAllSubmissions] = React.useState(
    props.singleProjectDetails?.submission
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setAllSubmissions(props.singleProjectDetails?.submission);
  }, [props.singleProjectDetails]);

  const openSubmissions = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInstructorCommentChange = (e, id) => {
    let _submissions = [...allSubmissions];
    let index = _submissions.findIndex((element) => element._id == id);
    _submissions[index].instructorComment = e.target.value;
    setAllSubmissions(_submissions);
  };

  const handleInstructorGradeChange = (e, id) => {
    let _submissions = [...allSubmissions];
    let index = _submissions.findIndex((element) => element._id == id);
    _submissions[index].instructorGrade = e.target.value;
    setAllSubmissions(_submissions);
  };

  const saveInstuctorSubmission = () => {
    dispatch(
      instructorUpdateBatchProject(
        { submission: allSubmissions },
        props.batchId,
        props.singleProjectDetails.projectId
      )
    );
    alert("Details Saved!");
  };

  return (
    <>
      <div className="view">
        <button disabled={disable}>View Quiz Results</button>
      </div>
      <div className="view">
        <button disabled={disable} onClick={openSubmissions}>
          View Submitted Assignments
        </button>
      </div>

      {/* INTRUCTOR SUBMISSION MODAL TABLE */}
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          Project Submissions
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Link</TableCell>
                  <TableCell align="right">Grade</TableCell>
                  <TableCell align="right">Comment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allSubmissions?.map((row) => {
                  let singleStudent = props.students.filter(
                    (stud) => stud.userId === row.userId
                  )[0];
                  return (
                    <TableRow key={row._id}>
                      <TableCell component="th" scope="row">
                        {singleStudent.details[0]?.name?.first +
                          " " +
                          singleStudent.details[0]?.name?.last}
                      </TableCell>
                      <TableCell>{row.link}</TableCell>
                      <TableCell align="right">
                        <input
                          value={row.instructorGrade}
                          onChange={(e) =>
                            handleInstructorGradeChange(e, row._id)
                          }
                        ></input>
                      </TableCell>
                      <TableCell align="right">
                        <input
                          value={row.instructorComment}
                          onChange={(e) =>
                            handleInstructorCommentChange(e, row._id)
                          }
                        ></input>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={saveInstuctorSubmission} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Note = (props) => {
  const dispatch = useDispatch();

  const [note, setNote] = useState("");
  const disable = props.status === "active" ? false : true;

  function sendNote() {
    dispatch(
      instructorUpdateBatchClass(
        { instructorNote: note },
        props.batchId,
        props.classId
      )
    );
    alert("Note sent!");
    setNote("");
  }

  return (
    <>
      <div className="instructor-note">
        <div className="note-text">
          <textarea
            placeholder="Type note here"
            disabled={disable}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="send-note-button">
          <button disabled={disable} onClick={sendNote}>
            Send Note
          </button>
        </div>
      </div>
    </>
  );
};

const ClassListCard = (props) => {
  //console.log(props);
  const [ischedule, setSchedule] = useState(false);
  const status = getStatus(props.startTime, props.endTime);
  const [batch, setBatch] = useState([]);

  // console.log(batches);
  var timing =
    props.startTime && props.endTime
      ? formatAMPM(new Date(props.startTime)) +
        " - " +
        formatAMPM(new Date(props.endTime))
      : "";
  var className = "class-card " + status;

  return (
    <>
      <div className={className}>
        <div
          style={{
            display: "flex",
          }}
        >
          <div className="strip"></div>
          <div
            className=""
            style={{
              display: "flex",
              alignItems: "center",
              padding: "calc(30*var(--vp)) 7px calc(24*var(--vp))",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div className="class-course-name">
                {props?.classDetails?.topic}
              </div>
              <div className="class-status">{status}</div>
            </div>
            <div>
              <div className="class-timing">
                <Fontawesome name="clock-o" />
                &nbsp; {timing}
              </div>
              <div className="class-batch">Batch {props.batch}</div>
            </div>
            <div
              style={{
                cursor: "pointer",
              }}
              className="details-button"
            >
              <Fontawesome
                onClick={() => setSchedule(!ischedule)}
                name="caret-down"
              />
            </div>
          </div>
        </div>
        {ischedule && (
          <>
            <hr id="hr" className="" />
            <div
              className="class-details"
              id="class-details"
              style={{ alignItems: "center" }}
            >
              <div
                className="row mx-0"
                style={{ justifyContent: "space-between" }}
              >
                <div>
                  <Materials
                    status={status}
                    batchId={props.batchId}
                    classId={props.classId}
                    materials={props.materials}
                    classDetails={props.classDetails}
                  />
                  <div>
                    <AssignProject
                      status={status}
                      classId={props.classId}
                      allProjectsDetails={props.allProjectsDetails}
                      allProjectsBatch={props.allProjectsBatch}
                      batchId={props.batchId}
                      projectDetails={props.projectDetails}
                      singleProjectDetails={props.singleProjectDetails}
                    />
                  </div>
                  <div>
                    <Results
                      status={status}
                      projectDetails={props.projectDetails}
                      singleProjectDetails={props.singleProjectDetails}
                      batchId={props.batchId}
                      students={props.students}
                    />
                  </div>
                </div>
                <div>
                  <Note
                    status={status}
                    batchId={props.batchId}
                    classId={props.classId}
                  />
                  <Attendance
                    students={props.students}
                    status={status}
                    batchId={props.batchId}
                    classId={props.classId}
                    attendance={props.attendance}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const Schedule = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(batches);
  // }, [batches]);

  const batches = ["All"];
  const [batch, setBatch] = useState([]);
  const [batchName, setBatchName] = useState("");
  const [date, setDate] = useState(new Date());
  const { userInfo } = useSelector((state) => state.userLogin);
  const { instructorSchedule: schedule } = useSelector(
    (state) => state.instructorSchedule
  );
  var week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [loading, setLoading] = useState(false);
  var today = `${
    week[new Date().getDay()]
  }, ${new Date().getDate()} ${new Date().toLocaleString("default", {
    month: "short",
  })} ${new Date().getFullYear()}`;

  useEffect(() => {
    if (userInfo && batch) {
      setLoading(true);
      dispatch(instructorSchedule(date, batch));
      setLoading(false);
    }
  }, [userInfo, batch]);

  // let bat = schedule?.classes?.filter((clas) => {
  //   batches.filter((c) => {
  //     if (c !== clas.batch) batches.push(clas.batch);
  //   });

  //   // batches = batch;
  // });

  let bat = schedule?.classes?.filter((clas) => {
    batches.push(clas.batch);
  });

  // console.log(batches);

  useEffect(() => {
    axios.get(``);
  }, []);

  //console.log(schedule);
  let _allDates;

  const classList =
    schedule && date
      ? schedule.classes.filter((clas) => {
          if (clas.batchType === "freeclass") {
            if (
              new Date(clas.singleDate).getDate() === date.getDate() &&
              new Date(clas.singleDate).getMonth() === date.getMonth() &&
              new Date(clas.singleDate).getFullYear() === date.getFullYear()
            )
              return clas;
          } else if (clas.batchType === "workshop") {
            if (
              (new Date(clas.singleDate).getDate() === date.getDate() &&
                new Date(clas.singleDate).getMonth() === date.getMonth() &&
                new Date(clas.singleDate).getFullYear() ===
                  date.getFullYear()) ||
              (new Date(clas.doubleDate).getDate() === date.getDate() &&
                new Date(clas.doubleDate).getMonth() === date.getMonth() &&
                new Date(clas.doubleDate).getFullYear() === date.getFullYear())
            )
              return clas;
          } else if (clas.batchType === "normal") {
            _allDates = clas.allDates.slice(1);
            //console.log(_allDates);
            let todayclass = _allDates.filter(
              (ad) =>
                new Date(ad.date).getDate() === date.getDate() &&
                new Date(ad.date).getMonth() === date.getMonth() &&
                new Date(ad.date).getFullYear() === date.getFullYear()
            );
            if (todayclass && todayclass.length > 0) return clas;
          }
        })
      : null;

  //console.log(classList);

  // useEffect(() => {
  //   classList?.map((clb) => {
  //     console.log(clb.batch);
  //   });
  // }, []);

  return (
    <>
      {
        <>
          <div className="row mx-0 schedule-upper">
            <div>
              <div className="schedule-title">Schedule</div>
              <div className="schedule-date">{today}</div>
            </div>
            <div
              className="row mx-0"
              style={{
                justifyContent: "space-between",
                width: "100%",
                paddingTop: "calc(29*var(--vp))",
              }}
            >
              <div className="calendar">
                <input
                  type="date"
                  onChange={(e) => setDate(new Date(e.target.value))}
                  // onChange = {(e) => handleDate(new Date(e.target.value))}
                />
              </div>
              <select
                className="batches"
                onChange={(e) => {
                  if (e.target.value === "All") {
                    setBatch(batches);
                  } else {
                    setBatch([e.target.value]);
                  }
                }}
              >
                {
                  <>
                    {batches.map((b) => {
                      // batch.push;
                      return (
                        <>
                          {b === "All" ? (
                            <option value={b} selected>
                              All batches
                            </option>
                          ) : (
                            <option value={b}>Batch {b}</option>
                          )}
                        </>
                      );
                    })}
                  </>
                }
              </select>
            </div>
          </div>
          <div className="row mx-0" style={{ justifyContent: "space-between" }}>
            <div className="class-list">
              {classList?.length !== 0
                ? classList?.map((C) => {
                    // REMOVE DUPLICATED FROM STUDENTS
                    let _studentsArr = [];
                    let _studentsObj = {};
                    for (let i in C.students) {
                      // Extract the title
                      let objTitle = C.students[i]["userId"];

                      // Use the title as the index
                      _studentsObj[objTitle] = C.students[i];
                    }
                    for (let j in _studentsObj) {
                      _studentsArr.push(_studentsObj[j]);
                    }

                    // REMOVE DUPLICATES FROM CLASSES
                    let _classArray = [];
                    let _classObj = {};
                    for (let i in C.classesDetails) {
                      // Extract the title
                      let objTitle = C.classesDetails[i]["_id"];

                      // Use the title as the index
                      _classObj[objTitle] = C.classesDetails[i];
                    }
                    for (let j in _classObj) {
                      _classArray.push(_classObj[j]);
                    }

                    //console.log(_classArray);
                    // REMOVE DUPLICATES FROM PROJECTS
                    let _projectArray = [];
                    let _projOBJ = {};
                    for (let i in C.projectsDetails) {
                      // Extract the title
                      let objTitle = C.projectsDetails[i]["_id"];

                      // Use the title as the index
                      _projOBJ[objTitle] = C.projectsDetails[i];
                    }
                    for (let j in _projOBJ) {
                      _projectArray.push(_projOBJ[j]);
                    }

                    if (
                      new Date(C.singleDate).getDate() === date.getDate() &&
                      new Date(C.singleDate).getMonth() === date.getMonth() &&
                      new Date(C.singleDate).getFullYear() ===
                        date.getFullYear()
                    ) {
                      C.currentDate = C.singleDate;
                      C.currentTime = C.singleTime;
                      C.activeClassDetails = _classArray.filter(
                        (cobj) => cobj.classNo === 1
                      )[0]
                        ? _classArray.filter((cobj) => cobj.classNo === 1)[0]
                        : {};
                      C.activeProjectDetails = _projectArray.filter(
                        (proj) => proj.no === 1
                      )[0]
                        ? _projectArray.filter((proj) => proj.no === 1)[0]
                        : {};
                    } else if (
                      new Date(C.doubleDate).getDate() === date.getDate() &&
                      new Date(C.doubleDate).getMonth() === date.getMonth() &&
                      new Date(C.doubleDate).getFullYear() ===
                        date.getFullYear()
                    ) {
                      C.currentDate = C.doubleDate;
                      C.currentTime = C.doubleTime;
                      C.activeClassDetails = _classArray.filter(
                        (cobj) => cobj.classNo === 2
                      )[0]
                        ? _classArray.filter((cobj) => cobj.classNo === 2)[0]
                        : {};
                      C.activeProjectDetails = _projectArray.filter(
                        (proj) => proj.no === 2
                      )[0]
                        ? _projectArray.filter((proj) => proj.no === 2)[0]
                        : {};
                    } else {
                      let classTimeIndex = _allDates.findIndex(
                        (obj) =>
                          new Date(obj.date).getDate() === date.getDate() &&
                          new Date(obj.date).getMonth() === date.getMonth() &&
                          new Date(obj.date).getFullYear() ===
                            date.getFullYear()
                      );
                      C.activeClassDetails = _classArray.filter(
                        (cobj) => cobj.classNo === parseInt(classTimeIndex + 1)
                      )[0]
                        ? _classArray.filter(
                            (cobj) =>
                              cobj.classNo === parseInt(classTimeIndex + 1)
                          )[0]
                        : {};

                      let assignedProjectId = C.classes.filter(
                        (clas) => clas.classId === C.activeClassDetails?._id
                      )[0]?.assignedProject;

                      C.activeProjectDetails = _projectArray.filter(
                        (proj) =>
                          proj._id.toString() === assignedProjectId?.toString()
                      )[0]
                        ? _projectArray.filter(
                            (proj) =>
                              proj._id.toString() ===
                              assignedProjectId?.toString()
                          )[0]
                        : {};

                      C.currentTime =
                        new Date(_allDates[classTimeIndex]?.date).getHours() +
                        ":" +
                        new Date(_allDates[classTimeIndex]?.date).getMinutes();
                    }

                    return loading ? (
                      "Loading Data Please wait..."
                    ) : (
                      <>
                        <ClassListCard
                          key={C._id}
                          batch={C.batch}
                          startTime={new Date(date).setHours(
                            C.currentTime.toString().split(":")[0],
                            C.currentTime.toString().split(":")[1],
                            0,
                            0
                          )}
                          endTime={new Date(date).setHours(
                            C.currentTime.toString().split(":")[0],
                            C.currentTime.toString().split(":")[1],
                            0,
                            0
                          )}
                          classId={C.activeClassDetails?._id}
                          batchId={C._id}
                          materials={
                            C.classes.filter(
                              (clas) =>
                                clas.classId === C.activeClassDetails?._id
                            )[0]?.materials
                          }
                          students={_studentsArr}
                          classDetails={C.activeClassDetails}
                          allProjectsBatch={C.projects}
                          allProjectsDetails={_projectArray}
                          attendance={
                            C.classes.filter(
                              (clas) =>
                                clas.classId === C.activeClassDetails?._id
                            )[0]?.attendance
                          }
                          projectDetails={C.activeProjectDetails}
                          singleProjectDetails={
                            C.projects.filter(
                              (proj) =>
                                proj.projectId === C.activeProjectDetails?._id
                            )[0]
                              ? C.projects.filter(
                                  (proj) =>
                                    proj.projectId ===
                                    C.activeProjectDetails?._id
                                )[0]
                              : {}
                          }
                        />
                      </>
                    );
                  })
                : `No Classes are assigned to you for${date.toLocaleDateString()}`}
            </div>
          </div>
        </>
      }
    </>
  );
};

const InstructorShedule = () => {
  const dispatch = useDispatch();
  const { instructorInfo: instructor } = useSelector(
    (state) => state.instructorInfo
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  const [instructorProfileImage, setInstructorProfileImage] = useState({});

  useEffect(() => {
    if (userInfo) {
      dispatch(instructorInfo());
    }
  }, [instructorInfo, userInfo]);

  useEffect(() => {
    if (instructor) {
      const userInfo = localStorage.getItem("userInfo");
      const token = userInfo ? JSON.parse(userInfo).token : "";
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };
      axios.get(`/api/file/${instructor.profileimage}`, config).then((res) => {
        setInstructorProfileImage(res.data);
      });
    }
  }, [instructor]);
  return (
    <>
      {
        <>
          <InstructorMenu
            profileIMG={instructorProfileImage?.filePath}
            fname={instructor?.name?.first}
            lname={instructor?.name?.last}
          />
          <div className="instructor-schedule-right">
            <TodoList />
            <Event />
          </div>
          <div className="instructor-schedule-main">
            <div className="instructor-main-center">
              <Schedule />
            </div>
          </div>
        </>
      }
    </>
  );
};

export default InstructorShedule;
