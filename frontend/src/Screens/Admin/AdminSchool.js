import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
// import "./Blog.css";

function School({ allSchoolsData }) {
  const [allSchools, setallSchools] = useState(allSchoolsData);
  const [updateSchool, setupdateSchool] = useState(false);
  const [tobeEditedSchool, settobeEditedSchool] = useState({});
  const [showEditForm, setshowEditForm] = useState(false);

  const [name, setname] = useState("");
  const [principal_name, setprincipal_name] = useState("");
  const [principal_email, setprincipal_email] = useState("");
  const [representative_name, setrepresentative_name] = useState("");
  const [representative_email, setrepresentative_email] = useState("");
  const [representative_number, setrepresentative_number] = useState("");
  const [school_link, setschool_link] = useState("");
  const [image, setimage] = useState(null);

  useEffect(() => {
    setallSchools(allSchoolsData);
  }, [allSchoolsData]);

  const editSchool = (school) => {
    settobeEditedSchool(school);
    setupdateSchool(true);
    setshowEditForm(true);
    setname(school.name);
    setprincipal_name(school.principal_name);
    setprincipal_email(school.principal_email);
    setrepresentative_name(school.representative_name);
    setrepresentative_email(school.representative_email);
    setrepresentative_number(school.representative_number);
  };

  const addNewSchool = () => {
    settobeEditedSchool({});
    setupdateSchool(false);
    setshowEditForm(true);
    setname("");
    setprincipal_name("");
    setprincipal_email("");
    setrepresentative_name("");
    setrepresentative_email("");
    setrepresentative_number("");
  };

  const goBack = () => {
    setupdateSchool(false);
    settobeEditedSchool({});
    setshowEditForm(false);
    setname("");
    setprincipal_name("");
    setprincipal_email("");
    setrepresentative_name("");
    setrepresentative_email("");
    setrepresentative_number("");
  };

  const handleSchoolLogoUpload = (e) => {
    if (e.target.files[0]) {
      setimage(e.target.files[0]);
    }
  };

  const deleteSchool = async (school) => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    // delete file
    await axios
      .delete(`/api/file/${school.image?._id}`, config)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => console.log(err));

    // delete school
    await axios
      .delete(`/api/school/${school._id}`, config)
      .then((res) => {
        console.log(res.data);
        alert("school deleted!");
        return res.data;
      })
      .catch((err) => console.log(err));
  };

  const submitData = async () => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    if (updateSchool) {
      //   update
      if (image === null) {
        // dont update image
        const body = {
          principal_name,
          principal_email,
          representative_name,
          representative_email,
          name,
          representative_number,
          school_link: `https://rancholabs.com/freeWorkshop?school=${name}`,
        };

        axios
          .put(`/api/school/${tobeEditedSchool._id}`, body, config)
          .then((res) => {
            console.log(res);
            var newallSchools = [...allSchools];
            for (var i in newallSchools) {
              if (newallSchools[i]._id == tobeEditedSchool._id) {
                newallSchools[i] = tobeEditedSchool;
                break;
              }
            }
            setallSchools(newallSchools);
            goBack();
          });
      } else {
        // update image

        const body = {
          principal_name,
          principal_email,
          representative_name,
          representative_email,
          name,
          representative_number,
          school_link: `https://rancholabs.com/freeWorkshop?school=${name}`,
        };

        console.log(tobeEditedSchool);

        if (image !== null) {
          console.log("update school logo");
          await axios
            .delete(`/api/file/${tobeEditedSchool.image?._id}`, config)
            .then((res) => {
              console.log(res.data);
              return res.data;
            })
            .catch((err) => console.log(err));

          const formData = new FormData();
          formData.append("files", image);
          const fileID = await axios
            .post("/api/file", formData, config)
            .then((res) => res.data.fileId)
            .catch((error) => console.log(error));

          body.image = fileID;
        }

        console.log(body);

        axios
          .put(`/api/blog/${tobeEditedSchool._id}`, body, config)
          .then((res) => {
            console.log(res);
            var newallSchools = [...allSchools];
            for (var i in newallSchools) {
              if (newallSchools[i]._id == tobeEditedSchool._id) {
                newallSchools[i] = tobeEditedSchool;
                break;
              }
            }
            setallSchools(newallSchools);
            goBack();
          });
      }
    } else {
      //   new
      const formData = new FormData();
      formData.append("files", image);
      const fileID = await axios
        .post("/api/file", formData, config)
        .then((res) => res.data.fileId)
        .catch((error) => console.log(error));

      const body = {
        name,
        image: fileID,
        principal_name,
        principal_email,
        representative_name,
        representative_email,
        representative_number,
        school_link: `https://rancholabs.com/freeWorkshop?school=${name}`,
      };

      console.log(body);

      axios.post("/api/school", body, config).then((res) => {
        console.log(res);
        alert("school added");
      });
    }
  };

  return (
    <div className="blog" style={{ backgroundColor: "transparent" }}>
      {showEditForm ? (
        <div className="blog__form">
          <p className="blog__form__back" onClick={goBack}>
            ←
          </p>
          <div className="blog__form__input__section">
            <div className="blog__form__inputs">
              <div className="blogAdmin__inputSection">
                <label>School Name</label>
                <input
                  type="text"
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                ></input>
              </div>
              <div className="blogAdmin__inputSection">
                <label>Principal Name</label>
                <input
                  type="text"
                  onChange={(e) => setprincipal_name(e.target.value)}
                  value={principal_name}
                ></input>
              </div>
              <div className="blogAdmin__inputSection">
                <label>Principal Email</label>
                <input
                  type="text"
                  onChange={(e) => setprincipal_email(e.target.value)}
                  value={principal_email}
                ></input>
              </div>
              <div className="blogAdmin__inputSection">
                <label>Representative Name</label>
                <input
                  type="text"
                  onChange={(e) => setrepresentative_name(e.target.value)}
                  value={representative_name}
                ></input>
              </div>
              <div className="blogAdmin__inputSection">
                <label>Representative Email</label>
                <input
                  type="text"
                  onChange={(e) => setrepresentative_email(e.target.value)}
                  value={representative_email}
                ></input>
              </div>
              <div className="blogAdmin__inputSection">
                <label>Representative Number</label>
                <input
                  type="text"
                  onChange={(e) => setrepresentative_number(e.target.value)}
                  value={representative_number}
                ></input>
              </div>
              <div className="blogAdmin__inputSection">
                <label>Link</label>
                <input
                  type="text"
                  readOnly={true}
                  value={`https://rancholabs.com/freeWorkshop?school=${name}`}
                ></input>
              </div>
              <div className="blogAdmin__inputSection">
                <label>School Logo</label>
                <input type="file" onChange={handleSchoolLogoUpload}></input>
              </div>
            </div>
          </div>
          <button className="blogAdmin__submitBtn" onClick={submitData}>
            Add
          </button>
        </div>
      ) : (
        <div className="blog__table">
          <button className="blog__table__addBtn" onClick={addNewSchool}>
            Add New
          </button>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Principal Name</TableCell>
                  <TableCell>Principal Email</TableCell>
                  <TableCell>Representative Name</TableCell>
                  <TableCell>Representative Email</TableCell>
                  <TableCell>Representative Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allSchools?.map((singleSchool) => (
                  <TableRow key={singleSchool._id}>
                    <TableCell component="th" scope="row">
                      {singleSchool.name}
                    </TableCell>
                    <TableCell>{singleSchool.principal_name}</TableCell>
                    <TableCell>{singleSchool.principal_email}</TableCell>
                    <TableCell>{singleSchool.representative_name}</TableCell>
                    <TableCell>{singleSchool.representative_email}</TableCell>
                    <TableCell>{singleSchool.representative_number}</TableCell>
                    <TableCell>
                      <button
                        className="blog__table__editBtn"
                        onClick={() => editSchool(singleSchool)}
                      >
                        Edit
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        className="blog__table__editBtn"
                        onClick={() => deleteSchool(singleSchool)}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default School;
