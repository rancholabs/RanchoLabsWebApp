import React, { useState, useEffect } from "react";
import "./AdminBatch.css";
import AdminNewBatch from "./AdminNewBatch";
import axios from "axios";
import EditIcon from "../../Asssets/Icon feather-edit.png";
import DeleteIcon from "@material-ui/icons/Delete";

function AdminBatch({
  courseGroups,
  allStudentData,
  setBatchUserId,
  paymentObj,
  backtoDashboard,
  allInstructors,
  allSchoolsData,
}) {
  const [selectedCourseGroup, setSelectedCourseGroup] = useState(
    courseGroups[0]
  );
  const [selectedCourse, setSelectedCourse] = useState({});
  const [batches, setbatches] = useState([]);
  const [selectedBatchType, setSelectedBatchType] = useState("all");
  const [addNewBatch, setAddNewBatch] = useState(false);
  const [editBatch, seteditBatch] = useState(false);
  const [toBeEditedBatch, settoBeEditedBatch] = useState({});

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

      axios
        .get(`/api/course/batch/${selectedCourse._id}`, config)
        .then((res) => {
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
    seteditBatch(false);
    settoBeEditedBatch({});
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

    // check for payment
    if (paymentObj.orderId) {
      // update against payment order id
      const _body = {
        batchId: singleBatch._id,
        paymentObj: paymentObj,
      };

      axios.post(`/api/course/enroll/admin`, _body, config).then((res) => {
        backtoDashboard();
        console.log(res.data);
      });
    } else {
      // assign for free class
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
    }
  };

  const editBatchFunction = (editBatch) => {
    seteditBatch(true);
    settoBeEditedBatch(editBatch);
  };

  const deleteBatchFunction = (deleteBatch) => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    console.log(deleteBatch);

    axios.delete(`/api/batch/${deleteBatch._id}`, config).then((res) => {
      console.log(res.data);
    });

    axios
      .delete(`/api/course/enroll/deletebatch/${deleteBatch._id}`, config)
      .then((res) => {
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
          allSchoolsData={allSchoolsData}
        />
      ) : editBatch ? (
        <AdminNewBatch
          backToAllBatches={backToAllBatches}
          courseGroups={courseGroups}
          allStudentData={allStudentData}
          toBeEditedBatch={toBeEditedBatch}
          allSchoolsData={allSchoolsData}
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

            let singleSchool;
            if (singleBatch.batchType === "workshop") {
              singleSchool = allSchoolsData.filter(
                (sch) => sch._id === singleBatch.school
              );
              if (singleSchool.length > 0) singleSchool = singleSchool[0];
            }

            if (selectedBatchType !== "all") {
              if (selectedBatchType === singleBatch.batchType) {
                return (
                  <>
                    <div className="adminBatch__card">
                      <img
                        src={EditIcon}
                        className="adminBatch__editIcon"
                        onClick={() => editBatchFunction(singleBatch)}
                      ></img>
                      <DeleteIcon
                        className="adminBatch__DeleteIcon"
                        onClick={() => deleteBatchFunction(singleBatch)}
                      />
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
                              <h3>{dateTime.day + " - " + dateTime.time}</h3>
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
                      {singleSchool?._id ? (
                        <div className="adminBatch__cardSection">
                          <h2>School</h2>
                          <h3>
                            {" "}
                            {singleSchool?._id ? singleSchool?.name : ""}
                          </h3>
                        </div>
                      ) : null}
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
                    <img
                      src={EditIcon}
                      className="adminBatch__editIcon"
                      onClick={() => editBatchFunction(singleBatch)}
                    ></img>
                    <DeleteIcon
                      className="adminBatch__DeleteIcon"
                      onClick={() => deleteBatchFunction(singleBatch)}
                    />

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
                            <h3>{dateTime.day + " - " + dateTime.time}</h3>
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
                    {singleSchool?._id ? (
                      <div className="adminBatch__cardSection">
                        <h2>School</h2>
                        <h3> {singleSchool?._id ? singleSchool?.name : ""}</h3>
                      </div>
                    ) : null}
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
