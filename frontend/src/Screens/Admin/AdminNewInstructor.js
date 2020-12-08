import React, { useState, useEffect } from "react";
import "./AdminNewInstructor.css";
import axios from "axios";

function AdminNewInstructor({
  closeNewInstructorForm,
  getUpdatedInstructors,
  selectedInstructor,
}) {
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
  const [instructorProfileImage, setinstructorProfileImage] = useState(null);
  const [instructorAadharImage, setinstructorAadharImage] = useState(null);
  const [instructorPanImage, setinstructorPanImage] = useState(null);

  const handleInstructorProfileImageUpload = (e) => {
    if (e.target.files[0]) {
      setinstructorProfileImage(e.target.files[0]);
    }
  };

  const handleInstructorAadharImageUpload = (e) => {
    if (e.target.files[0]) {
      setinstructorAadharImage(e.target.files[0]);
    }
  };

  const handleInstructorPanImageUpload = (e) => {
    if (e.target.files[0]) {
      setinstructorPanImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    console.log(selectedInstructor);
    if (selectedInstructor.id) {
      setfname(selectedInstructor.fname);
      setlname(selectedInstructor.lname);
      setmname(selectedInstructor.mname);
      setemail(selectedInstructor.email);
      setphoneNumber(selectedInstructor.phoneNumber);
      setaadharNumber(selectedInstructor.aadharNumber);
      setpanNumber(selectedInstructor.panNumber);
      setjoiningDate(selectedInstructor.joiningDate);
      setaccountNumber(selectedInstructor.accountNumber);
      setaccountName(selectedInstructor.accountName);
      setbankName(selectedInstructor.bankName);
      setifscCode(selectedInstructor.ifscCode);
    } else {
      setfname("");
      setlname("");
      setmname("");
      setemail("");
      setphoneNumber("");
      setaadharNumber("");
      setpanNumber("");
      setjoiningDate("");
      setaccountNumber("");
      setaccountName("");
      setbankName("");
      setifscCode("");
    }
  }, [selectedInstructor]);

  const addNewInstructor = async () => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    if (selectedInstructor.id) {
      console.log("Updating instructor");
      const instructorBody = {
        userId: selectedInstructor.userId,
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

      if (instructorProfileImage !== null) {
        console.log("Updating instructor image...");
        if (selectedInstructor.profileimage) {
          // DELETE
          await axios
            .delete(`/api/file/${selectedInstructor.profileimage}`, config)
            .then((res) => {
              console.log(res.data);
              return res.data;
            })
            .catch((err) => console.log(err));
        }

        // ADD NEW
        const formData = new FormData();
        formData.append("files", instructorProfileImage);
        const instructorProfileImageId = await axios
          .post("/api/file", formData, config)
          .then((res) => res.data.fileId)
          .catch((error) => console.log(error));

        instructorBody.profileimage = instructorProfileImageId;
        console.log("instructor image updated...");
      }

      if (instructorAadharImage !== null) {
        console.log("Updating instructor aadhar image...");
        if (selectedInstructor.aadharimage) {
          // DELETE
          await axios
            .delete(`/api/file/${selectedInstructor.aadharimage}`, config)
            .then((res) => {
              console.log(res.data);
              return res.data;
            })
            .catch((err) => console.log(err));
        }

        const formData = new FormData();
        formData.append("files", instructorAadharImage);
        const instructorAadharImageId = await axios
          .post("/api/file", formData, config)
          .then((res) => res.data.fileId)
          .catch((error) => console.log(error));

        instructorBody.aadharimage = instructorAadharImageId;
        console.log("instructor aadhar image updated...");
      }

      if (instructorPanImage !== null) {
        console.log("Updating instructor pan image...");
        if (selectedInstructor.panimage) {
          // DELETE
          await axios
            .delete(`/api/file/${selectedInstructor.panimage}`, config)
            .then((res) => {
              console.log(res.data);
              return res.data;
            })
            .catch((err) => console.log(err));
        }

        const formData = new FormData();
        formData.append("files", instructorPanImage);
        const instructorPanImageId = await axios
          .post("/api/file", formData, config)
          .then((res) => res.data.fileId)
          .catch((error) => console.log(error));

        instructorBody.panimage = instructorPanImageId;
        console.log("instructor pan image updated...");
      }

      axios
        .put(`/api/instructor/updateadmin`, instructorBody, config)
        .then((res) => {
          console.log(res.data);
          alert("Updated!");
          getUpdatedInstructors();
        });
    } else {
      // API TO CREATE USER
      const body = {
        name: {
          first: fname,
          last: lname,
        },
        mobileNo: {
          code: "+91",
          number: phoneNumber,
        },
        email: instructorEmail,
        password: instructorPassword,
      };

      axios.post("/api/register/admin", body, config).then(async (res) => {
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

        if (instructorProfileImage !== null) {
          const formData = new FormData();
          formData.append("files", instructorProfileImage);
          const instructorProfileImageId = await axios
            .post("/api/file", formData, config)
            .then((res) => res.data.fileId)
            .catch((error) => console.log(error));

          instructorBody.profileimage = instructorProfileImageId;
        }

        if (instructorAadharImage !== null) {
          const formData = new FormData();
          formData.append("files", instructorAadharImage);
          const instructorAadharImageId = await axios
            .post("/api/file", formData, config)
            .then((res) => res.data.fileId)
            .catch((error) => console.log(error));

          instructorBody.aadharimage = instructorAadharImageId;
        }

        if (instructorPanImage !== null) {
          const formData = new FormData();
          formData.append("files", instructorPanImage);
          const instructorPanImageId = await axios
            .post("/api/file", formData, config)
            .then((res) => res.data.fileId)
            .catch((error) => console.log(error));

          instructorBody.panimage = instructorPanImageId;
        }

        axios.post(`/api/instructor`, instructorBody, config).then((res) => {
          console.log(res.data);
          alert("Updated!");
          getUpdatedInstructors();
        });
      });
    }
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
        <h3>{selectedInstructor.id ? "Edit" : "Add"}</h3>
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
            <div
              className="adminNewInstructor__inputSectionImage"
              onClick={() =>
                document.getElementById("instructor__profileImage").click()
              }
            >
              <input
                type="file"
                style={{ display: "none" }}
                id="instructor__profileImage"
                onChange={handleInstructorProfileImageUpload}
              ></input>
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
            <div
              className="adminNewInstructor__inputSectionImage adminNewInstructor__inputSectionImage__fullwidth"
              onClick={() =>
                document.getElementById("instructor__aadharImage").click()
              }
            >
              <input
                type="file"
                style={{ display: "none" }}
                id="instructor__aadharImage"
                onChange={handleInstructorAadharImageUpload}
              ></input>
              <p>+</p>
              <h3>Attach file</h3>
            </div>
          </div>
          <div className="adminNewInstructor__inputSection adminNewInstructor__inputSection__halfwidth">
            <div
              className="adminNewInstructor__inputSectionImage adminNewInstructor__inputSectionImage__fullwidth"
              onClick={() =>
                document.getElementById("instructor__panImage").click()
              }
            >
              <input
                type="file"
                style={{ display: "none" }}
                id="instructor__panImage"
                onChange={handleInstructorPanImageUpload}
              ></input>
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
