import React, { useState, useEffect } from "react";
import "./AdminInstructor.css";
import { DataGrid } from "@material-ui/data-grid";
import AdminNewInstructor from "./AdminNewInstructor";
import SearchIcon from "@material-ui/icons/Search";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import axios from "axios";

function AdminInstructor() {
  const [instructors, setInstructors] = useState([]);

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
      const allInstructors = res.data.map((singleInstructor, idx) => ({
        ...singleInstructor,
        id: singleInstructor._id,
        joiningDate:
          (new Date(singleInstructor.joiningDate).getDate() < 10
            ? "0" + new Date(singleInstructor.joiningDate).getDate()
            : new Date(singleInstructor.joiningDate).getDate()) +
          "/" +
          (new Date(singleInstructor.joiningDate).getMonth() + 1 < 10
            ? "0" + (new Date(singleInstructor.joiningDate).getMonth() + 1)
            : new Date(singleInstructor.joiningDate).getMonth() + 1) +
          "/" +
          new Date(singleInstructor.joiningDate).getFullYear(),
      }));
      setInstructors(allInstructors);
    });
  }, []);

  const getUpdatedInstructors = () => {
    // var allInstructors = [...instructors];
    // allInstructors.push(newInstructor);
    // setInstructors(allInstructors);
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    axios.get("/api/instructor/admin", config).then((res) => {
      const allInstructors = res.data.map((singleInstructor, idx) => ({
        ...singleInstructor,
        id: singleInstructor._id,
        joiningDate:
          (new Date(singleInstructor.joiningDate).getDate() < 10
            ? "0" + new Date(singleInstructor.joiningDate).getDate()
            : new Date(singleInstructor.joiningDate).getDate()) +
          "/" +
          (new Date(singleInstructor.joiningDate).getMonth() + 1 < 10
            ? "0" + (new Date(singleInstructor.joiningDate).getMonth() + 1)
            : new Date(singleInstructor.joiningDate).getMonth() + 1) +
          "/" +
          new Date(singleInstructor.joiningDate).getFullYear(),
      }));
      setInstructors(allInstructors);
    });
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      valueGetter: (params) =>
        `${params.getValue("fname") || ""} ${params.getValue("mname") || ""} ${
          params.getValue("lname") || ""
        }`,
      width: 200,
    },
    {
      field: "joiningDate",
      headerName: "Date of joining",
      width: 200,
    },
    { field: "batches", headerName: "Batches", width: 200 },
    {
      field: "feedback",
      headerName: "Feedback",
      width: 200,
    },
    {
      field: "classesTaken",
      headerName: "Classes Taken",
      width: 200,
    },
  ];

  // const rows = [
  //   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  //   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  //   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  //   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  //   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  //   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  //   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  //   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  //   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  // ];

  const closeNewInstructorForm = () => {
    document
      .querySelector(".adminInstructor__newForm")
      .classList.remove("show");
    document
      .querySelector(".adminInstructor")
      .classList.remove("collapseScreen");
  };

  const openNewInstructorForm = () => {
    document.querySelector(".adminInstructor__newForm").classList.add("show");
    document.querySelector(".adminInstructor").classList.add("collapseScreen");
  };

  return (
    <>
      <div className="adminInstructor">
        <div className="adminInstructor__header">
          <h3>Instructors Details</h3>
          <div className="adminInstructor__headerFilterSection">
            <span className="adminInstructor__headerSearch">
              <input placeholder="Search instructor" />
              <SearchIcon className="adminInstructor__headerIcon" />
            </span>
            <span
              className="adminInstructor__headerAddNew"
              onClick={openNewInstructorForm}
            >
              <PersonAddIcon className="adminInstructor__headerIcon" />
              <h3>Add Instructor</h3>
            </span>
          </div>
        </div>
        <div className="adminInstructor__table">
          <DataGrid rows={instructors} columns={columns} pageSize={10} />
        </div>
      </div>
      <div className="adminInstructor__newForm">
        <AdminNewInstructor
          closeNewInstructorForm={closeNewInstructorForm}
          getUpdatedInstructors={getUpdatedInstructors}
        />
      </div>
    </>
  );
}

export default AdminInstructor;
