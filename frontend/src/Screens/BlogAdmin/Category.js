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

function Category({ allBlogCategory, getUpdatedCategory }) {
  const [updateBlogCategory, setupdateBlogCategory] = useState(false);
  const [tobeEditedBlogCategory, settobeEditedBlogCategory] = useState(false);
  const [showEditForm, setshowEditForm] = useState(false);
  const [showAddForm, setshowAddForm] = useState(false);

  const [name, setname] = useState("");

  const editBlogCategory = (blogCategory) => {
    settobeEditedBlogCategory(blogCategory);
    setupdateBlogCategory(true);
    setshowEditForm(true);
    setname(blogCategory.name);
  };

  const addNewBlogCategory = () => {
    settobeEditedBlogCategory({});
    setupdateBlogCategory(false);
    setshowEditForm(true);
    setshowAddForm(true);
    setname("");
  };

  const goBack = () => {
    setupdateBlogCategory(false);
    settobeEditedBlogCategory({});
    setshowEditForm(false);
    setshowAddForm(false);
    setname("");
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

    if (updateBlogCategory) {
      //   update
      const body = {
        name,
      };

      axios
        .put(`/api/blogcategory/${tobeEditedBlogCategory._id}`, body, config)
        .then((res) => {
          console.log(res);
          getUpdatedCategory();
          alert("Updated Successfully !!");
          goBack();
        });
    } else {
      //   new
      const formData = new FormData();

      const body = {
        name,
      };

      axios.post("/api/blogcategory", body, config).then((res) => {
        console.log(res);
        getUpdatedCategory();
        alert("Added Successfully!!");
        goBack();
      });
    }
  };

  const deleteBlogCategory = async (blogCategory) => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    await axios
      .delete(`/api/blogcategory/${blogCategory._id}`, config)
      .then((res) => {
        console.log(res.data);
        alert("Deleted Successfully !!");
        return res.data;
      })
      .catch((err) => console.log(err));
  };

  console.log(allBlogCategory);

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
                <label>Category Name</label>
                <input
                  type="text"
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                ></input>
              </div>
            </div>
          </div>
          <div className="blogAdmin_Btn">
            <button className="blogAdmin__submitBtn" onClick={submitData}>
              {showAddForm ? "Add" : "Save"}
            </button>
            {showAddForm ? "" : <button className="blogAdmin_cancelBtn" onClick={goBack}>
              Cancel
          </button>}
          </div>
        </div>
      ) : (
        <div className="blog__table">
          <button className="blog__table__addBtn" onClick={addNewBlogCategory}>
            Add New
          </button>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allBlogCategory?.map((singleBlogCategory) => (
                  <TableRow key={singleBlogCategory._id}>
                    <TableCell width="100%" scope="row">
                      {singleBlogCategory.name}
                    </TableCell>
                    <TableCell>
                      <button
                        className="blog__table__editBtn"
                        onClick={() => editBlogCategory(singleBlogCategory)}
                      >
                        Edit
                      </button>
                    </TableCell>
                    <TableCell>
                        <button
                          className="blog__table__editBtn"
                          onClick={() => deleteBlogCategory(singleBlogCategory)}
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

export default Category;
