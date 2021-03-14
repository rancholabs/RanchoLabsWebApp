import React, { useState, useEffect } from "react";
import "./AdminNewBatch.css";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearIcon from "@material-ui/icons/Clear";

function AdminNewBatch({
  backToAllBatches,
  courseGroups,
  allStudentData,
  toBeEditedBatch,
  allSchoolsData,
}) {
  const [batchName, setBatchName] = useState("");
  const [batchType, setbatchType] = useState("");
  const [batchStartingDate, setbatchStartingDate] = useState("");
  const [batchEndingDate, setbatchEndingDate] = useState("");
  const [batchSingleDate, setbatchSingleDate] = useState("");
  const [batchSingleTime, setbatchSingleTime] = useState("");
  const [batchDoubleDate, setbatchDoubleDate] = useState("");
  const [batchDoubleTime, setbatchDoubleTime] = useState("");
  const [minGrade, setminGrade] = useState("");
  const [maxGrade, setmaxGrade] = useState("");
  const [batch_link, setbatch_link] = useState("");
  const [school, setschool] = useState("");

  const [numberOfDays, setnumberOfDays] = useState(1);
  const [day_time, setday_time] = useState([
    {
      day: "",
      time: "",
    },
  ]);
  const [instructors, setInstructors] = useState([]);
  const [assignedInstructors, setAssignedInstructors] = useState([]);
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [selectedCourseGroup, setSelectedCourseGroup] = useState({});
  const [selectedCourse, setSelectedCourse] = useState({});

  const [_allStudentData, set_allStudentData] = useState([]);

  useEffect(() => {
    if (toBeEditedBatch?._id) {
      const userInfo = localStorage.getItem("userInfo");
      const token = userInfo ? JSON.parse(userInfo).token : "";
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };
      setBatchName(toBeEditedBatch.name);
      setbatchType(toBeEditedBatch.batchType);
      setbatchStartingDate(toBeEditedBatch.startDate);
      setbatchEndingDate(toBeEditedBatch.endDate);
      setbatchSingleDate(toBeEditedBatch.singleDate);
      setbatchSingleTime(toBeEditedBatch.singleTime);
      setbatchDoubleDate(toBeEditedBatch.doubleDate);
      setbatchDoubleTime(toBeEditedBatch.doubleTime);
      setminGrade(toBeEditedBatch.gradeRange?.minG);
      setmaxGrade(toBeEditedBatch.gradeRange?.maxG);
      setday_time(toBeEditedBatch.date_time);
      setbatch_link(toBeEditedBatch.batch_link);
      setschool(toBeEditedBatch.school);
      setnumberOfDays(toBeEditedBatch.date_time.length);

      let assignedInstruct = [];
      let _instruct = instructors.filter(
        (ins) => ins._id === toBeEditedBatch.instructor
      )[0];
      let _instructName =
        _instruct?.fname + " " + _instruct?.lname + " - " + _instruct?._id;
      assignedInstruct.push(_instructName);
      setAssignedInstructors(assignedInstruct);

      axios.get(`/api/course/enroll/all`, config).then((res) => {
        let assignedStud = [];
        let _eCourse = [];
        let _eCourseGroup = [];

        // console.log(res.data);
        res.data.forEach((estud) => {
          if (estud.batchId === toBeEditedBatch._id) {
            let _stud = _allStudentData.filter(
              (std) => std.userId === estud.userId
            )[0];
            let _studName =
              _stud?.studentDetails?.name?.first +
              " " +
              _stud?.studentDetails?.name?.last +
              " - " +
              _stud?.userId;
            assignedStud.push(_studName);

            // courseGroups.forEach((cg) => {
            //   const _cgcourse = cg.courses.filter(
            //     (cgcourse) => cgcourse._id === estud.courseId
            //   );
            //   if (_cgcourse.length > 0) {
            //     _eCourse.push(_cgcourse[0]);
            //     _eCourseGroup.push(cg);
            //   }
            // });
          }
        });

        courseGroups.forEach((cg) => {
          const _cgcourse = cg.courses.filter(
            (cgcourse) => cgcourse._id === toBeEditedBatch.courseId
          );
          if (_cgcourse.length > 0) {
            _eCourse.push(_cgcourse[0]);
            _eCourseGroup.push(cg);
          }
        });
        setSelectedCourse(_eCourse[0]);
        setSelectedCourseGroup(_eCourseGroup[0]);
        setAssignedStudents(assignedStud);
        setAssignedInstructors(assignedInstruct);
      });
    }
  }, [toBeEditedBatch, instructors, courseGroups]);

  useEffect(() => {
    console.log("running...");
    const fetchStudents = async () => {
      const __allStudentData = [];
      allStudentData.forEach((stud) => {
        if (stud.studentDetails?.role === "student")
          __allStudentData.push(stud);
      });
      // console.log(__allStudentData);
      set_allStudentData(__allStudentData);
    };
    fetchStudents();
  }, [allStudentData]);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    axios.get("/api/instructor/admin", config).then((res) => {
      setInstructors(res.data);
    });
  }, []);

  const addNewBatch = async () => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    let weekDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    let allDates = [{ date: batchStartingDate }];

    function weeksBetween(d1, d2) {
      return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
    }

    let totalBatchWeeks = weeksBetween(
      new Date(batchStartingDate),
      new Date(batchEndingDate)
    );

    // console.log(totalBatchWeeks);

    if (day_time.length > 0) {
      for (let i = 0; i < totalBatchWeeks; i++) {
        day_time.forEach((dt) => {
          let currentday = weekDays.indexOf(dt.day.toString());
          if (currentday >= 0) {
            currentday = parseInt(currentday) + 1;
          }
          let today = new Date(allDates[allDates.length - 1].date);
          let nextBatchDate = new Date(
            today.setDate(
              today.getDate() + ((currentday + 7 - today.getDay()) % 7)
            )
          );
          nextBatchDate.setHours(
            dt.time.toString().split(":")[0],
            dt.time.toString().split(":")[1],
            0,
            0
          );
          allDates.push({
            date: nextBatchDate.toString(),
          });
        });
      }
    }

    // allDates.slice(0, 1);

    // console.log(allDates);

    if (toBeEditedBatch?._id) {
      // UPDATE BATCH DATA
      const body = {
        name: batchName,
        batchType: batchType,
        startDate: batchStartingDate,
        endDate: batchEndingDate,
        singleDate: batchSingleDate,
        singleTime: batchSingleTime,
        doubleDate: batchDoubleDate,
        doubleTime: batchDoubleTime,
        gradeRange: {
          minG: minGrade,
          maxG: maxGrade,
        },
        date_time: day_time,
        allDates: allDates,
        batch_link: batch_link,
        instructor: assignedInstructors[0]?.toString().split(" - ")[1],
        school,
        // courseId: selectedCourse._id,
      };

      // console.log(body);

      axios
        .put(`/api/course/batch/${toBeEditedBatch._id}`, body, config)
        .then((res) => {
          // console.log(res.data);
        });

      // CHECK FOR CHANGED/NEW STUDENTS
      if (assignedStudents.length > 0) {
        // ASSIGN BATCH TO STUDENT IN STUDENTCOURSE SCHEMA

        if (batchType === "normal" || batchType === "workshop") {
          assignedStudents.forEach((stud) => {
            const _body = {
              userId: stud.toString().split(" - ")[1],
              courseId: selectedCourse._id,
              batchId: toBeEditedBatch._id,
              payment: {
                paymentId: batchType === "workshop" ? "workshop" : "normal",
                orderId: batchType === "workshop" ? "workshop" : "normal",
                signature: batchType === "workshop" ? "workshop" : "normal",
              },
            };
            // console.log(_body);
            axios
              .post(`/api/course/enroll/admin`, _body, config)
              .then((res) => console.log(res.data));
          });
        } else {
          const _body = {
            userId: assignedStudents[0].toString().split(" - ")[1],
            courseId: selectedCourse._id,
            batchId: toBeEditedBatch._id,
            payment: {
              paymentId: "freeclass",
              orderId: "freeclass",
              signature: "freeclass",
            },
          };
          // console.log(_body);
          axios
            .post(`/api/course/enroll/admin`, _body, config)
            .then((res) => console.log(res.data));
        }
      }
    } else {
      // CREATE NEW BATCH IN BATCH SCHEMA
      const body = [
        {
          name: batchName,
          batchType: batchType,
          startDate: batchStartingDate,
          endDate: batchEndingDate,
          singleDate: batchSingleDate,
          doubleDate: batchDoubleDate,
          doubleTime: batchDoubleTime,
          singleTime: batchSingleTime,
          gradeRange: {
            minG: minGrade,
            maxG: maxGrade,
          },
          date_time: day_time,
          allDates: allDates,
          batch_link: batch_link,
          instructor: assignedInstructors[0]?.toString().split(" - ")[1],
        },
      ];

      if (batchType === "workshop") {
        body[0].school = school;
      }

      const batchID = await axios
        .post(`/api/course/batch/${selectedCourse?._id}`, body, config)
        .then((res) => {
          console.log(res.data);

          return res.data.id;
        });

      if (assignedStudents.length > 0) {
        // ASSIGN BATCH TO STUDENT IN STUDENTCOURSE SCHEMA
        if (batchType === "normal" || batchType === "workshop") {
          assignedStudents.forEach((stud) => {
            const _body = {
              userId: stud.toString().split(" - ")[1],
              courseId: selectedCourse?._id,
              batchId: batchID,
              payment: {
                paymentId: batchType === "workshop" ? "workshop" : "normal",
                orderId: batchType === "workshop" ? "workshop" : "normal",
                signature: batchType === "workshop" ? "workshop" : "normal",
              },
            };
            // console.log(_body);
            axios
              .post(`/api/course/enroll/admin`, _body, config)
              .then((res) => {
                console.log(res.data);
              });
          });
          alert("Batch Created!");
        } else {
          const _body = {
            userId: assignedStudents[0].toString().split(" - ")[1],
            courseId: selectedCourse?._id,
            batchId: batchID,
            payment: {
              paymentId: "freeclass",
              orderId: "freeclass",
              signature: "freeclass",
            },
          };
          console.log(_body);
          axios.post(`/api/course/enroll/admin`, _body, config).then((res) => {
            // console.log(res.data);
            alert("Batch Created!");
          });
        }
      }
    }
  };

  const handleNumberOfDaysChange = (e) => {
    var allDays = [];
    const newNumberOfDays = parseInt(e.target.value);
    [...Array(newNumberOfDays)].forEach((newNum) => {
      allDays.push({
        day: "",
        time: "",
      });
    });
    setnumberOfDays(e.target.value);
    setday_time(allDays);
  };

  const handleDayChange = (e, index) => {
    var allDays = [...day_time];
    allDays[index].day = e.target.value;
    setday_time(allDays);
  };

  const handleTimeChange = (e, index) => {
    var allDays = [...day_time];
    allDays[index].time = e.target.value;
    setday_time(allDays);
  };

  const handleInstructorSearchChange = (e, value) => {
    if (value !== null) {
      var allAssignedInstructors = [...assignedInstructors];
      const index = allAssignedInstructors.indexOf(value);
      // console.log(index);
      if (index < 0) {
        allAssignedInstructors.push(value);
        setAssignedInstructors(allAssignedInstructors);
      }
    }
  };

  const handleInstructorSearchChangeRemove = (ai) => {
    var allAssignedInstructors = [...assignedInstructors];
    const index = allAssignedInstructors.indexOf(ai);
    allAssignedInstructors.splice(index, 1);
    setAssignedInstructors(allAssignedInstructors);
  };

  const handleStudentSearchChange = (e, value) => {
    if (value !== null) {
      var allAssignedStudents = [...assignedStudents];
      const index = allAssignedStudents.indexOf(value);
      if (index < 0) {
        allAssignedStudents.push(value);
        setAssignedStudents(allAssignedStudents);
      }
    }
  };

  const handleStudentSearchChangeRemove = (ai) => {
    var allAssignedStudents = [...assignedStudents];
    const index = allAssignedStudents.indexOf(ai);
    allAssignedStudents.splice(index, 1);
    setAssignedStudents(allAssignedStudents);

    if (toBeEditedBatch?._id) {
      // REMOVE STUDENT FROM COURSE ENROLLED
      const userInfo = localStorage.getItem("userInfo");
      const token = userInfo ? JSON.parse(userInfo).token : "";
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };
      const bid = toBeEditedBatch?._id;
      const uid = ai.toString().split("-")[1].toString().trim();
      // console.log(bid);
      // console.log(uid);
      axios
        .delete(`/api/course/enroll/deleteuser/${bid}/${uid}`, config)
        .then((res) => {
          console.log(res.data);
        });
    }
  };

  const handleCourseGroupChange = (e) => {
    if (e.target.value !== "") {
      const _selectedCourseGroup = courseGroups.filter(
        (cg) => cg?._id === e.target.value
      );
      setSelectedCourseGroup(_selectedCourseGroup[0]);
      setSelectedCourse({});
    } else {
      setSelectedCourseGroup({});
      setSelectedCourse({});
    }
  };

  const handleCourseChange = (e) => {
    if (e.target.value !== "") {
      const _selectedCourse = selectedCourseGroup.courses.filter(
        (course) => course?._id === e.target.value
      );
      setSelectedCourse(_selectedCourse[0]);
    } else {
      setSelectedCourse({});
    }
  };

  // console.log(instructors);

  return (
    <div className="adminNewBatch">
      <p className="adminNewBatch__backBtn" onClick={backToAllBatches}>
        {"< Back"}
      </p>
      <div className="adminNewBatch__content">
        <div className="adminNewBatch__detailsleft">
          <div className="adminNewBatch__inputSection">
            <label>Batch Name</label>
            <input
              type="text"
              onChange={(e) => setBatchName(e.target.value)}
              value={batchName}
              //   disabled={tobeEditedCourse._id && allowEdits ? false : true}
            />
          </div>

          <div className="adminNewBatch__inputSection">
            <label>Batch Type</label>
            <select
              value={batchType}
              onChange={(e) => setbatchType(e.target.value)}
            >
              <option>-Select-</option>
              <option value="normal">Normal</option>
              <option value="freeclass">Free Class</option>
              <option value="workshop">Workshop</option>
            </select>
          </div>
          <div className="adminNewBatch__inputSection">
            <label>Category</label>
            <select
              value={selectedCourseGroup?._id ? selectedCourseGroup?._id : ""}
              onChange={handleCourseGroupChange}
            >
              <option value="">--Select--</option>
              {courseGroups.map((cg) => {
                return <option value={cg?._id}>{cg.name}</option>;
              })}
            </select>
          </div>
          <div className="adminNewBatch__inputSection">
            <label>Course</label>
            <select
              value={selectedCourse?._id ? selectedCourse?._id : ""}
              onChange={handleCourseChange}
            >
              <option value="">--Select--</option>
              {selectedCourseGroup.courses?.map((course) => {
                return <option value={course?._id}>{course.name}</option>;
              })}
            </select>
          </div>
          {batchType === "normal" ? (
            <>
              <div className="adminNewBatch__inputSection">
                <label>Starting Date</label>
                <input
                  type="date"
                  // disabled={tobeEditedCourse._id && allowEdits ? false : true}
                  value={batchStartingDate}
                  onChange={(e) => setbatchStartingDate(e.target.value)}
                />
              </div>
              <div className="adminNewBatch__inputSection">
                <label>Ending Date</label>
                <input
                  type="date"
                  value={batchEndingDate}
                  onChange={(e) => setbatchEndingDate(e.target.value)}
                  //   disabled={tobeEditedCourse._id && allowEdits ? false : true}
                />
              </div>
            </>
          ) : batchType === "freeclass" ? (
            <div className="adminNewBatch__inputSection">
              <label>Date</label>
              <input
                type="date"
                value={batchSingleDate}
                onChange={(e) => {
                  // console.log(e.target.value);
                  setbatchSingleDate(e.target.value);
                }}
                //   disabled={tobeEditedCourse._id && allowEdits ? false : true}
              />
            </div>
          ) : (
            <>
              <div className="adminNewBatch__inputSection">
                <label>Day 1 Date</label>
                <input
                  type="date"
                  value={batchSingleDate}
                  onChange={(e) => setbatchSingleDate(e.target.value)}
                  //   disabled={tobeEditedCourse._id && allowEdits ? false : true}
                />
              </div>
              <div className="adminNewBatch__inputSection">
                <label>Day 2 Date</label>
                <input
                  type="date"
                  value={batchDoubleDate}
                  onChange={(e) => setbatchDoubleDate(e.target.value)}
                  //   disabled={tobeEditedCourse._id && allowEdits ? false : true}
                />
              </div>
            </>
          )}
          {batchType === "workshop" && (
            <>
              <div className="adminNewBatch__inputSection">
                <label>School</label>
                <select
                  value={school}
                  onChange={(e) => setschool(e.target.value)}
                >
                  <option value="">--Select School--</option>
                  {allSchoolsData.map((singleSchool) => {
                    return (
                      <option value={singleSchool._id}>
                        {singleSchool.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </>
          )}
          <div className="adminNewBatch__inputSection">
            <label>Batch Link</label>
            <input
              type="text"
              onChange={(e) => setbatch_link(e.target.value)}
              value={batch_link}
              //   disabled={tobeEditedCourse._id && allowEdits ? false : true}
            />
          </div>
          <div className="adminNewBatch__inputSection">
            <label>Minimum Grade</label>
            <input
              type="text"
              value={minGrade}
              onChange={(e) => setminGrade(e.target.value)}
              //   disabled={tobeEditedCourse._id && allowEdits ? false : true}
            />
          </div>
          <div className="adminNewBatch__inputSection">
            <label>Maximum Grade</label>
            <input
              type="text"
              value={maxGrade}
              onChange={(e) => setmaxGrade(e.target.value)}
              //   disabled={tobeEditedCourse._id && allowEdits ? false : true}
            />
          </div>
        </div>
        {batchType === "normal" ? (
          <div className="adminNewBatch__detailsmiddle">
            <div className="adminNewBatch__inputSection">
              <label>Set Day and time</label>
              <select value={numberOfDays} onChange={handleNumberOfDaysChange}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
              </select>
            </div>
            <div className="adminNewBatch__inputSection adminNewBatch__inputSectionDayTimeContainerParent">
              {[...Array(parseInt(numberOfDays))].map((day, index) => {
                return (
                  <div className="adminNewBatch__inputSectionDayTimeContainer">
                    <div className="adminNewBatch__inputSectionDayTime">
                      <label>Select Day</label>
                      <select
                        value={day_time[index].day}
                        onChange={(e) => handleDayChange(e, index)}
                      >
                        <option>Select Day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </select>
                    </div>
                    <div className="adminNewBatch__inputSectionDayTime">
                      <label>Enter Time</label>
                      <input
                        type="time"
                        value={day_time[index].time}
                        onChange={(e) => handleTimeChange(e, index)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : batchType === "freeclass" ? (
          <div className="adminNewBatch__detailsmiddle">
            <div className="adminNewBatch__inputSection">
              <label>Time</label>
              <input
                type="time"
                value={batchSingleTime}
                onChange={(e) => setbatchSingleTime(e.target.value)}
                //   disabled={tobeEditedCourse._id && allowEdits ? false : true}
              />
            </div>
          </div>
        ) : (
          <div className="adminNewBatch__detailsmiddle">
            <div className="adminNewBatch__inputSection">
              <label>Day 1 Time</label>
              <input
                type="time"
                value={batchSingleTime}
                onChange={(e) => setbatchSingleTime(e.target.value)}
                //   disabled={tobeEditedCourse._id && allowEdits ? false : true}
              />
            </div>
            <div className="adminNewBatch__inputSection">
              <label>Day 2 Time</label>
              <input
                type="time"
                value={batchDoubleTime}
                onChange={(e) => setbatchDoubleTime(e.target.value)}
                //   disabled={tobeEditedCourse._id && allowEdits ? false : true}
              />
            </div>
          </div>
        )}
        <div className="adminNewBatch__detailsright">
          <div className="adminNewBatch__inputSection">
            <label>Assign Instructor</label>
            <div className="adminNewBatch__searchBox">
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                onChange={handleInstructorSearchChange}
                options={instructors.map(
                  (option) =>
                    option.fname + " " + option.lname + " - " + option._id
                )}
                renderInput={(params) => (
                  <TextField {...params} margin="normal" />
                )}
              />
              {/* <SearchIcon className="adminNewBatch__searchIcon" /> */}
            </div>
            <div className="adminNewBatch__assignedInstructors__Tags">
              {assignedInstructors.map((ai, index) => {
                return (
                  <>
                    <div className="adminNewBatch__assignedInstructor">
                      <h3>{ai.toString().split(" - ")[0]}</h3>
                      <ClearIcon
                        className="adminNewBatch__assignedInstructor__removeBtn"
                        onClick={() => handleInstructorSearchChangeRemove(ai)}
                      />
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="adminNewBatch__inputSection">
            <label>Assign Student</label>
            <div className="adminNewBatch__searchBox">
              <Autocomplete
                id="free-solo-demo_"
                freeSolo
                onChange={handleStudentSearchChange}
                options={_allStudentData.map(
                  (stud) =>
                    stud?.studentDetails?.name?.first +
                    " " +
                    stud?.studentDetails?.name?.last +
                    " - " +
                    stud?.userId
                )}
                renderInput={(params) => (
                  <TextField {...params} margin="normal" />
                )}
              />
              {/* <SearchIcon className="adminNewBatch__searchIcon" /> */}
            </div>
            <div className="adminNewBatch__assignedInstructors__Tags">
              {assignedStudents.map((ai, index) => {
                return (
                  <>
                    <div className="adminNewBatch__assignedInstructor">
                      <h3>{ai.toString().split(" - ")[0]}</h3>
                      <ClearIcon
                        className="adminNewBatch__assignedInstructor__removeBtn"
                        onClick={() => handleStudentSearchChangeRemove(ai)}
                      />
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="adminNewBatch__buttons">
        <button className="adminNewBatch__saveButton" onClick={addNewBatch}>
          Save Details
        </button>
        {/* {tobeEditedCourse._id && (
          <button
            className="adminNewBatch__saveButton"
            onClick={() => setAllowEdits(!allowEdits)}
          >
            Edit Details
          </button>
        )} */}
      </div>
    </div>
  );
}

export default AdminNewBatch;
