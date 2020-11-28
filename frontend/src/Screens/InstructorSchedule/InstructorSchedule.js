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
} from "../../Actions/Instructor";

const batches = ["A", "B", "C", "All"];

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
  const disable = props.status === "upcoming" ? true : false;
  const saveLink = props.status === "completed" ? true : false;

  return (
    <>
      <div className="attendance">
        <div className="attendance-title border-bottom">Attendance</div>
        <div className="attendance-list">
          {props.students.map((s) => {
            return <Student details={s.details[0]} disabled={disable} />;
          })}
        </div>
        <div className="save-attendance">
          <button disabled>Save</button>
        </div>
      </div>
    </>
  );
};

const Materials = (props) => {
  const dispatch = useDispatch();

  console.log(props.classDetails);

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
    props.classDetails.classLink != null ? props.classDetails.classLink : ""
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
    dispatch(updateClassLink(classLink, props.classId));
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
              disabled={disable}
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
                  onChange={() => {
                    shareLink(!link);
                  }}
                  checked={link}
                  disabled={saveLink}
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
                onChange={() => {
                  shareSlides(!slide);
                }}
                checked={slide}
                disabled={disable}
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
                onChange={() => {
                  shareAssignment(!assignment);
                }}
                checked={assignment}
                disabled={disable}
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
                onChange={() => {
                  shareQuiz(!quiz);
                }}
                checked={quiz}
                disabled={disable}
              />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

const Results = (props) => {
  const disable = props.status === "active" ? false : true;
  const saveLink = props.status === "completed" ? true : false;

  return (
    <>
      <div className="view">
        <button disabled={disable}>View Quiz Results</button>
      </div>
      <div className="view">
        <button disabled={disable}>View Submitted Assignments</button>
      </div>
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
  const [ischedule, setSchedule] = useState(false);
  const status = getStatus(props.startTime, props.endTime);
  var timing =
    props.startTime && props.endTime
      ? formatAMPM(new Date(props.startTime)) +
        " - " +
        formatAMPM(new Date(props.endTime))
      : "";
  var className = "class-card " + status;

  console.log(props.materials);

  return (
    <>
      <div className={className}>
        <div className="row mx-0">
          <div className="strip"></div>
          <div>
            <div>
              <div
                className="row mx-0"
                style={{
                  alignItems: "center",
                  padding: "calc(30*var(--vp)) 0 calc(24*var(--vp))",
                }}
              >
                <div>
                  <div className="class-course-name">Programming for AI</div>
                  <div className="class-status">{status}</div>
                </div>
                <div>
                  <div className="class-timing">
                    <Fontawesome name="clock-o" />
                    &nbsp; {timing}
                  </div>
                  <div className="class-batch">Batch {props.batch}</div>
                </div>
                <div className="details-button">
                  <button
                    className="detail"
                    onClick={() => {
                      setSchedule(!ischedule);
                    }}
                  >
                    <Fontawesome name="caret-down" />
                  </button>
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
                        <Results status={status} />
                      </div>
                    </div>
                    <div>
                      <Note
                        status={status}
                        batchId={props.batchId}
                        classId={props.classId}
                      />
                      <Attendance students={props.students} status={status} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const Schedule = () => {
  const dispatch = useDispatch();

  const [batch, setBatch] = useState(["FCB1", "FCB2", "FCB3"]);
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
  var today = `${
    week[new Date().getDay()]
  }, ${new Date().getDate()} ${new Date().toLocaleString("default", {
    month: "short",
  })} ${new Date().getFullYear()}`;

  useEffect(() => {
    if (userInfo && batch) {
      dispatch(instructorSchedule(date, batch));
    }
  }, [userInfo, batch]);

  const classList =
    schedule && date
      ? schedule.classes.filter((clas) => {
          if (
            new Date(clas.startTime).getDate() === date.getDate() &&
            new Date(clas.startTime).getMonth() === date.getMonth() &&
            new Date(clas.startTime).getFullYear() === date.getFullYear()
          )
            return clas;
        })
      : null;

  console.log(classList);

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
                />
              </div>
              <select
                className="batches"
                onChange={(e) => {
                  if (e.target.value === "All") setBatch(["A", "B", "C"]);
                  else setBatch([e.target.value]);
                }}
              >
                {batches.map((b) => {
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
              </select>
            </div>
          </div>
          <div className="row mx-0" style={{ justifyContent: "space-between" }}>
            <div className="class-list">
              {classList &&
                classList.map((C) => (
                  <ClassListCard
                    key={C._id}
                    batch={C.batch}
                    startTime={C.startTime}
                    endTime={C.endTime}
                    classId={C.classDetails._id}
                    batchId={C._id}
                    materials={C.materials}
                    students={C.students}
                    classDetails={C.classDetails}
                  />
                ))}
            </div>
          </div>
        </>
      }
    </>
  );
};

const InstructorShedule = () => {
  return (
    <>
      {
        <>
          <InstructorMenu />
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
