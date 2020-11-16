import React, { useState, useEffect } from "react";
import "./AdminBatch.css";
import AdminNewBatch from "./AdminNewBatch";
import axios from "axios";

function AdminBatch({ courseGroups }) {
  const [selectedCourseGroup, setSelectedCourseGroup] = useState({});
  const [selectedCourse, setSelectedCourse] = useState({});
  const [batches, setbatches] = useState([]);
  const [addNewBatch, setAddNewBatch] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    axios
      .get("/api/course/batch/5fafb394e684a3387cfd9181", config)
      .then((res) => {
        console.log(res.data);
        setbatches(res.data);
      });
  }, []);

  const handleCourseGroupChange = (e) => {
    if (e.target.value !== "") {
      const _selectedCourseGroup = courseGroups.filter(
        (cg) => cg._id === e.target.value
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
        (course) => course._id === e.target.value
      );
      setSelectedCourse(_selectedCourse[0]);
    } else {
      setSelectedCourse({});
    }
  };

  const backToAllBatches = (e) => {
    setAddNewBatch(false);
  };

  return (
    <div className="adminBatch">
      <div className="adminBatch__header">
        <div className="adminBatch__filter">
          <select
            value={selectedCourseGroup._id ? selectedCourseGroup._id : ""}
            onChange={handleCourseGroupChange}
          >
            <option value="">--Select--</option>
            {courseGroups.map((cg) => {
              return <option value={cg._id}>{cg.name}</option>;
            })}
          </select>
          <select
            value={selectedCourse._id ? selectedCourse._id : ""}
            onChange={handleCourseChange}
          >
            <option value="">--Select--</option>
            {selectedCourseGroup.courses?.map((course) => {
              return <option value={course._id}>{course.name}</option>;
            })}
          </select>
        </div>
        <div className="adminBatch__filterRight">
          <button>All</button>
          <button>Completed</button>
          <button className="selected">Ongoing</button>
          <button>Upcoming</button>
        </div>
      </div>
      {addNewBatch ? (
        <AdminNewBatch backToAllBatches={backToAllBatches} />
      ) : (
        <div className="adminBatch__cardsContainer">
          <div
            className="adminBatch__card adminBatch__cardNewBatch"
            onClick={() => setAddNewBatch(true)}
          >
            <p>+</p>
            <h3>Add New Batch</h3>
          </div>
          {batches.map((singleBatch) => {
            return (
              <>
                <div className="adminBatch__card">
                  <div className="adminBatch__cardSection">
                    <h2>{singleBatch.name}</h2>
                    <h3>{"Starting Date - " + singleBatch.startDate}</h3>
                    <h3>{"Ending Date - " + singleBatch.endDate}</h3>
                  </div>
                  <div className="adminBatch__cardSection">
                    <h2>Weekly Schedule</h2>
                    {singleBatch.date_time.map((dateTime) => {
                      return <h3>{dateTime.date + " - " + dateTime.time}</h3>;
                    })}
                  </div>
                  <div className="adminBatch__cardSection">
                    <h2>Instructor</h2>

                    <h3>No instructor</h3>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AdminBatch;
