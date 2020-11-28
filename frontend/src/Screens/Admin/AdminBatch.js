import React, { useState, useEffect } from "react";
import "./AdminBatch.css";
import AdminNewBatch from "./AdminNewBatch";
import axios from "axios";

function AdminBatch({
  courseGroups,
  allStudentData,
  setBatchUserId,
  backtoDashboard,
  allInstructors,
}) {
  const [selectedCourseGroup, setSelectedCourseGroup] = useState(
    courseGroups[0]
  );
  const [selectedCourse, setSelectedCourse] = useState({});
  const [batches, setbatches] = useState([]);
  const [selectedBatchType, setSelectedBatchType] = useState("all");
  const [addNewBatch, setAddNewBatch] = useState(false);

  useEffect(() => {
    if (selectedCourse._id) {
      const userInfo = localStorage.getItem("userInfo");
      const token = userInfo ? JSON.parse(userInfo).token : "";
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };
      console.log(selectedCourse);

      axios
        .get(`/api/course/batch/${selectedCourse._id}`, config)
        .then((res) => {
          console.log(res.data);
          setbatches(res.data);
        });
    }
  }, [selectedCourse]);

  const handleCourseGroupChange = (e) => {
    if (e.target.value !== "") {
      const _selectedCourseGroup = courseGroups.filter(
        (cg) => cg._id === e.target.value
      );
      setSelectedCourseGroup(_selectedCourseGroup[0]);
      setSelectedCourse({});
      setbatches([]);
    } else {
      setSelectedCourseGroup({});
      setSelectedCourse({});
      setbatches([]);
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

  const assignBatchToStudent = (singleBatch) => {
    // assign batch to student with userId = userId prop
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    const _body = {
      userId: setBatchUserId,
      courseId: singleBatch.courseId,
      batchId: singleBatch._id,
      payment: {
        paymentId: "freeclass",
        orderId: "freeclass",
        signature: "freeclass",
      },
    };

    axios.post(`/api/course/enroll/admin`, _body, config).then((res) => {
      backtoDashboard();
      console.log(res.data);
    });
  };

  return (
    <div className="adminBatch">
      {setBatchUserId && (
        <p onClick={backtoDashboard} className="adminBatch__backto__dashboard">
          back to dashboard
        </p>
      )}
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
          <select
            value={selectedBatchType}
            onChange={(e) => setSelectedBatchType(e.target.value)}
          >
            <option value="">--Select--</option>
            <option value="all">All</option>
            <option value="normal">Normal</option>
            <option value="freeclass">Free Class</option>
            <option value="workshop">Workshop</option>
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
        <AdminNewBatch
          backToAllBatches={backToAllBatches}
          courseGroups={courseGroups}
          allStudentData={allStudentData}
        />
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
            let singleInstructor = allInstructors.filter(
              (sintruct) => sintruct._id === singleBatch.instructor
            );
            if (singleInstructor.length > 0)
              singleInstructor = singleInstructor[0];
            if (selectedBatchType !== "all") {
              if (selectedBatchType === singleBatch.batchType) {
                return (
                  <>
                    <div className="adminBatch__card">
                      <div className="adminBatch__cardSection">
                        <h2>{singleBatch.name}</h2>
                        {singleBatch.batchType === "normal" ? (
                          <>
                            <h3>
                              {"Starting Date - " + singleBatch.startDate}
                            </h3>
                            <h3>{"Ending Date - " + singleBatch.endDate}</h3>
                          </>
                        ) : (
                          <h3>
                            {"Date - " +
                              (new Date(singleBatch.singleDate).getDate() < 10
                                ? "0" +
                                  new Date(singleBatch.singleDate).getDate()
                                : new Date(singleBatch.singleDate).getDate()) +
                              "/" +
                              (new Date(singleBatch.singleDate).getMonth() + 1 <
                              10
                                ? "0" +
                                  (new Date(singleBatch.singleDate).getMonth() +
                                    1)
                                : new Date(singleBatch.singleDate).getMonth() +
                                  1) +
                              "/" +
                              new Date(singleBatch.singleDate).getFullYear()}
                          </h3>
                        )}
                      </div>
                      <div className="adminBatch__cardSection">
                        <h2>Weekly Schedule</h2>
                        {singleBatch.batchType === "normal" ? (
                          singleBatch.date_time.map((dateTime) => {
                            return (
                              <h3>{dateTime.date + " - " + dateTime.time}</h3>
                            );
                          })
                        ) : (
                          <h3>{"Time - " + singleBatch.singleTime}</h3>
                        )}
                      </div>
                      <div className="adminBatch__cardSection">
                        <h2>Instructor</h2>
                        <h3>
                          {" "}
                          {singleInstructor?._id
                            ? (singleInstructor?.fname
                                ? singleInstructor?.fname
                                : "") +
                              " " +
                              (singleInstructor?.mname
                                ? singleInstructor?.mname
                                : "") +
                              " " +
                              (singleInstructor?.lname
                                ? singleInstructor?.lname
                                : "")
                            : "n/a"}
                        </h3>
                      </div>
                      {setBatchUserId && (
                        <button
                          onClick={() => assignBatchToStudent(singleBatch)}
                        >
                          Assign Batch
                        </button>
                      )}
                    </div>
                  </>
                );
              }
            } else {
              return (
                <>
                  <div className="adminBatch__card">
                    <div className="adminBatch__cardSection">
                      <h2>{singleBatch.name}</h2>
                      {singleBatch.batchType === "normal" ? (
                        <>
                          <h3>{"Starting Date - " + singleBatch.startDate}</h3>
                          <h3>{"Ending Date - " + singleBatch.endDate}</h3>
                        </>
                      ) : (
                        <h3>
                          {"Date - " +
                            (new Date(singleBatch.singleDate).getDate() < 10
                              ? "0" + new Date(singleBatch.singleDate).getDate()
                              : new Date(singleBatch.singleDate).getDate()) +
                            "/" +
                            (new Date(singleBatch.singleDate).getMonth() + 1 <
                            10
                              ? "0" +
                                (new Date(singleBatch.singleDate).getMonth() +
                                  1)
                              : new Date(singleBatch.singleDate).getMonth() +
                                1) +
                            "/" +
                            new Date(singleBatch.singleDate).getFullYear()}
                        </h3>
                      )}
                    </div>
                    <div className="adminBatch__cardSection">
                      <h2>Weekly Schedule</h2>
                      {singleBatch.batchType === "normal" ? (
                        singleBatch.date_time.map((dateTime) => {
                          return (
                            <h3>{dateTime.date + " - " + dateTime.time}</h3>
                          );
                        })
                      ) : (
                        <h3>{"Time - " + singleBatch.singleTime}</h3>
                      )}
                    </div>
                    <div className="adminBatch__cardSection">
                      <h2>Instructor</h2>

                      <h3>
                        {" "}
                        {singleInstructor?._id
                          ? (singleInstructor?.fname
                              ? singleInstructor?.fname
                              : "") +
                            " " +
                            (singleInstructor?.mname
                              ? singleInstructor?.mname
                              : "") +
                            " " +
                            (singleInstructor?.lname
                              ? singleInstructor?.lname
                              : "")
                          : "n/a"}
                      </h3>
                    </div>
                    {setBatchUserId && (
                      <button onClick={() => assignBatchToStudent(singleBatch)}>
                        Assign Batch
                      </button>
                    )}
                  </div>
                </>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

export default AdminBatch;
