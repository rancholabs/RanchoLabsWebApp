import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import "./Author.css";
import "./Blog.css";

function Author({ allBlogAuthors, getUpdatedAuthors }) {
  const [updateBlogAuthor, setupdateBlogAuthor] = useState(false);
  const [tobeEditedBlogAuthor, settobeEditedBlogAuthor] = useState(false);
  const [showEditForm, setshowEditForm] = useState(false);
  const [showAddForm, setshowAddForm] = useState(false);

  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [authorImage, setauthorImage] = useState(null);

  // useEffect(() => {
  //   setAllblogauthor(allBlogAuthors);
  // }, [allBlogAuthors]);

  const editBlogAuthor = (blogAuthor) => {
    settobeEditedBlogAuthor(blogAuthor);
    setupdateBlogAuthor(true);
    setshowEditForm(true);
    setname(blogAuthor.name);
    setdescription(blogAuthor.description);
  };

  const addNewBlogAuthor = () => {
    settobeEditedBlogAuthor({});
    setupdateBlogAuthor(false);
    setshowEditForm(true);
    setshowAddForm(true);
    setname("");
    setdescription("");
  };

  const goBack = () => {
    setupdateBlogAuthor(false);
    settobeEditedBlogAuthor({});
    setshowEditForm(false);
    setshowAddForm(false);
    setname("");
    setdescription("");
  };

  const handleBlogAuthorUpload = (e) => {
    if (e.target.files[0]) {
      setauthorImage(e.target.files[0]);
    }
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

    if (updateBlogAuthor) {
      //   update
      if (authorImage === null) {
        // dont update image
        const body = {
          name,
          description,
        };

        axios
          .put(`/api/blogauthor/${tobeEditedBlogAuthor._id}`, body, config)
          .then((res) => {
            console.log(res);
            getUpdatedAuthors();
            alert("Updated successfully !!");
            goBack();
          });
      } else {
        // update image
      }
    } else {
      //   new
      const formData = new FormData();
      formData.append("files", authorImage);
      const fileID = await axios
        .post("/api/file", formData, config)
        .then((res) => res.data.fileId)
        .catch((error) => ({ message: "Error" }));

      const body = {
        name,
        description,
        authorImage: fileID,
      };

      axios.post("/api/blogauthor", body, config).then((res) => {
        console.log(res);
        getUpdatedAuthors();
        alert("Added Successfully !!");
        goBack();
      });
    }
  };

  const deleteBlogAuthor = async (blogAuthor) => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    await axios
      .delete(`/api/blogauthor/${blogAuthor._id}`, config)
      .then((res) => {
        console.log(res.data);
        alert("Deleted Successfully !!");
        goBack();
        return res.data;
      })
      .catch((err) => console.log(err));
  };

  console.log(allBlogAuthors);

  return (
    <div className="blog">
      {showEditForm ? (
        <div className="blog__form">
          <p className="blog__form__back" onClick={goBack}>
            ←
          </p>
          <div className="blog__form__input__section">
            <div className="blog__form__inputs blog__author__form__inputs">
              <div className="blogAdmin__inputSection">
                <label>Author Name</label>
                <input
                  type="text"
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                ></input>
              </div>
              <div className="blogAdmin__inputSection">
                <label>Description</label>
                <textarea
                  type="text"
                  onChange={(e) => setdescription(e.target.value)}
                  rows={5}
                  value={description}
                ></textarea>
              </div>
              <div className="blogAdmin__inputSection">
                <label>Image</label>
                <input type="file" onChange={handleBlogAuthorUpload}></input>
              </div>
            </div>
          </div>
          <div className="blogAdmin_Btn">
            <button className="blogAdmin__submitBtn" onClick={submitData}>
              {showAddForm ? "Add" : "Save"}
            </button>
            {showAddForm ? (
              ""
            ) : (
              <button className="blogAdmin_cancelBtn" onClick={goBack}>
                Cancel
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="blog__table">
          <button className="blog__table__addBtn" onClick={addNewBlogAuthor}>
            Add New
          </button>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allBlogAuthors?.map((singleBlogAuthor) => (
                  <TableRow key={singleBlogAuthor._id}>
                    <TableCell component="th" scope="row">
                      {singleBlogAuthor.name}
                    </TableCell>
                    <TableCell>{singleBlogAuthor.description}</TableCell>
                    <TableCell>
                      <button
                        className="blog__table__editBtn"
                        onClick={() => editBlogAuthor(singleBlogAuthor)}
                      >
                        Edit
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        className="blog__table__editBtn"
                        onClick={() => deleteBlogAuthor(singleBlogAuthor)}
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

export default Author;
