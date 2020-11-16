import React, { useState, useEffect } from "react";
import "./AdminNewInstructor.css";
import axios from "axios";

function AdminNewInstructor({ closeNewInstructorForm, getUpdatedInstructors }) {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [mname, setmname] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [aadharNumber, setaadharNumber] = useState("");
  const [panNumber, setpanNumber] = useState("");
  const [joiningDate, setjoiningDate] = useState("");
  const [accountNumber, setaccountNumber] = useState("");
  const [accountName, setaccountName] = useState("");
  const [bankName, setbankName] = useState("");
  const [ifscCode, setifscCode] = useState("");
  const [instructorEmail, setinstructorEmail] = useState("");
  const [instructorPassword, setinstructorPassword] = useState("");

  const addNewInstructor = () => {
    // API TO CREATE USER
    const body = {
      name: fname + " " + mname + " " + lname,
      email: instructorEmail,
      password: instructorPassword,
    };
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    axios.post("/api/register/admin", body, config).then((res) => {
      console.log(res.data);
      const userID = res.data.userID;

      // API TO UPDATE ROLE
      const roleBody = {
        role: "instructor",
      };

      axios
        .put(`/api/user/updateRole/${userID}`, roleBody, config)
        .then((res) => {
          console.log(res.data);
        });

      // API TO CREATE INSTRUCTOR WITH USER'S ID
      const instructorBody = {
        userId: userID,
        fname,
        lname,
        mname,
        email,
        phoneNumber,
        aadharNumber,
        panNumber,
        joiningDate,
        accountNumber,
        accountName,
        bankName,
        ifscCode,
      };

      axios.post(`/api/instructor`, instructorBody, config).then((res) => {
        console.log(res.data);
        getUpdatedInstructors();
      });
    });
  };

  return (
    <div className="adminNewInstructor">
      <div className="adminNewInstructor__header">
        <p
          className="adminNewInstructor__closeBtn"
          onClick={closeNewInstructorForm}
        >
          X
        </p>
        <h3>Add</h3>
      </div>
      <div className="adminNewInstructor__body">
        <div className="adminNewInstructor__section">
          <div>
            <div className="adminNewInstructor__section">
              <div className="adminNewInstructor__inputSection">
                <label>First Name</label>
                <input
                  type="text"
                  onChange={(e) => setfname(e.target.value)}
                  value={fname}
                ></input>
              </div>
              <div className="adminNewInstructor__inputSection">
                <label>Middle Name</label>
                <input
                  type="text"
                  onChange={(e) => setmname(e.target.value)}
                  value={mname}
                ></input>
              </div>
            </div>
            <div className="adminNewInstructor__inputSection">
              <label>Last Name</label>
              <input
                type="text"
                className="adminNewInstructor__input__fullwidth"
                onChange={(e) => setlname(e.target.value)}
                value={lname}
              ></input>
            </div>
          </div>
          <div className="adminNewInstructor__inputSection ">
            <label>Image</label>
            <div className="adminNewInstructor__inputSectionImage">
              <input type="file" style={{ display: "none" }}></input>
              <p>+</p>
              <h3>Attach file</h3>
            </div>
          </div>
        </div>
        <div className="adminNewInstructor__section">
          <div className="adminNewInstructor__inputSection adminNewInstructor__inputSection__fullwidth">
            <label>Email Id</label>
            <input
              type="text"
              onChange={(e) => setemail(e.target.value)}
              value={email}
            ></input>
          </div>
        </div>
        <div className="adminNewInstructor__section">
          <div className="adminNewInstructor__inputSection adminNewInstructor__inputSection__fullwidth">
            <label>Phone Number</label>
            <input
              type="text"
              onChange={(e) => setphoneNumber(e.target.value)}
              value={phoneNumber}
            ></input>
          </div>
        </div>

        <div className="adminNewInstructor__section">
          <div className="adminNewInstructor__inputSection adminNewInstructor__inputSection__halfwidth">
            <label>Aadhar Number</label>
            <input
              type="text"
              onChange={(e) => setaadharNumber(e.target.value)}
              value={aadharNumber}
            ></input>
          </div>
          <div className="adminNewInstructor__inputSection adminNewInstructor__inputSection__halfwidth">
            <label>PAN Number</label>
            <input
              type="text"
              onChange={(e) => setpanNumber(e.target.value)}
              value={panNumber}
            ></input>
          </div>
        </div>

        <div className="adminNewInstructor__section">
          <div className="adminNewInstructor__inputSection adminNewInstructor__inputSection__halfwidth">
            <div className="adminNewInstructor__inputSectionImage adminNewInstructor__inputSectionImage__fullwidth">
              <input type="file" style={{ display: "none" }}></input>
              <p>+</p>
              <h3>Attach file</h3>
            </div>
          </div>
          <div className="adminNewInstructor__inputSection adminNewInstructor__inputSection__halfwidth">
            <div className="adminNewInstructor__inputSectionImage adminNewInstructor__inputSectionImage__fullwidth">
              <input type="file" style={{ display: "none" }}></input>
              <p>+</p>
              <h3>Attach file</h3>
            </div>
          </div>
        </div>

        <div className="adminNewInstructor__section">
          <div className="adminNewInstructor__inputSection adminNewInstructor__inputSection__fullwidth">
            <label>Joining Date</label>
            <input
              type="date"
              onChange={(e) => setjoiningDate(e.target.value)}
              value={joiningDate}
            ></input>
          </div>
        </div>
        <div className="adminNewInstructor__section">
          <div className="adminNewInstructor__inputSection">
            <label>Bank Details</label>
            <div className="adminNewInstructor__inputSectionBank">
              <div>
                <input
                  type="text"
                  placeholder="Account Number"
                  onChange={(e) => setaccountNumber(e.target.value)}
                  value={accountNumber}
                ></input>
                <input
                  type="text"
                  placeholder="Account Holder Name"
                  onChange={(e) => setaccountName(e.target.value)}
                  value={accountName}
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Bank Name"
                  onChange={(e) => setbankName(e.target.value)}
                  value={bankName}
                ></input>
                <input
                  type="text"
                  placeholder="IFSC Code"
                  onChange={(e) => setifscCode(e.target.value)}
                  value={ifscCode}
                ></input>
              </div>
            </div>
          </div>
        </div>
        <div className="adminNewInstructor__section">
          <div className="adminNewInstructor__inputSection adminNewInstructor__inputSection__halfwidth">
            <label>Instructor Email</label>
            <input
              type="text"
              onChange={(e) => setinstructorEmail(e.target.value)}
              value={instructorEmail}
            ></input>
          </div>
          <div className="adminNewInstructor__inputSection adminNewInstructor__inputSection__halfwidth">
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setinstructorPassword(e.target.value)}
              value={instructorPassword}
            ></input>
          </div>
        </div>
      </div>
      <div className="adminNewInstructor__buttons">
        <button
          className="adminNewInstructor__saveButton"
          onClick={addNewInstructor}
        >
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

export default AdminNewInstructor;
