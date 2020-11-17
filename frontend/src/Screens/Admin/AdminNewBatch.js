import React, { useState, useEffect } from "react";
import "./AdminNewBatch.css";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearIcon from "@material-ui/icons/Clear";

function AdminNewBatch({ backToAllBatches }) {
  const [batchName, setBatchName] = useState("");
  const [numberOfDays, setnumberOfDays] = useState(1);
  const [day_time, setday_time] = useState([
    {
      day: "",
      time: "",
    },
  ]);
  //   const [batchName, setBatchName] = useState("");
  //   const [batchName, setBatchName] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [assignedInstructors, setAssignedInstructors] = useState([]);

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

  const addNewBatch = () => {
    // batch
    const body = [
      {
        name: batchName,
        //   courseImage: "",
        startDate: new Date(),
        endDate: new Date(),
        gradeRange: {
          minG: 6,
          maxG: 12,
        },
        date_time: [
          {
            date: "dummy date 1",
            time: "dummy time 1",
          },
          {
            date: "dummy date 2",
            time: "dummy time 2",
          },
          {
            date: "dummy date 3",
            time: "dummy time 3",
          },
        ],
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

    const courseID = "5fafb394e684a3387cfd9181";

    axios
      .post(`/api/course/batch/${courseID}`, body, config)
      .then((res) => console.log(res.data));
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
      console.log(index);
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

  console.log(instructors);

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
            <label>Category</label>
            <input
              type="text"
              //   onChange={(e) => setTotalClasses(e.target.value)}
              //   value={totalClasses}
              //   disabled={tobeEditedCourse._id && allowEdits ? false : true}
            />
          </div>
          <div className="adminNewBatch__inputSection">
            <label>Course</label>
            <input
              type="text"
              //   onChange={(e) => setTotalClasses(e.target.value)}
              //   value={totalClasses}
              //   disabled={tobeEditedCourse._id && allowEdits ? false : true}
            />
          </div>
          <div className="adminNewBatch__inputSection">
            <label>Starting Date</label>
            <input
              type="date"
              //   disabled={tobeEditedCourse._id && allowEdits ? false : true}
            />
          </div>
          <div className="adminNewBatch__inputSection">
            <label>Ending Date</label>
            <input
              type="date"
              //   disabled={tobeEditedCourse._id && allowEdits ? false : true}
            />
          </div>
          <div className="adminNewBatch__inputSection">
            <label>Minimum Grade</label>
            <input
              type="text"
              //   disabled={tobeEditedCourse._id && allowEdits ? false : true}
            />
          </div>
          <div className="adminNewBatch__inputSection">
            <label>Maximum Grade</label>
            <input
              type="text"
              //   disabled={tobeEditedCourse._id && allowEdits ? false : true}
            />
          </div>
        </div>
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
              <input
                type="text"
                //   onChange={(e) => setInnovate(e.target.value)}
                //   value={innovate}
                //   disabled={tobeEditedCourse._id && allowEdits ? false : true}
              />
              <SearchIcon className="adminNewBatch__searchIcon" />
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
