import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "./index.css";

function BlogAdmin() {
  const [blogBody, setBlogBody] = useState("");
  const [blogTitle, setblogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogShortDescription, setblogShortDescription] = useState("");
  const [blogDate, setblogDate] = useState("");
  const [blogBanner, setblogBanner] = useState(null);

  // useEffect(() => {
  //   const imageId = "5fba2366f57afe29dca729c0";
  //   const userInfo = localStorage.getItem("userInfo");
  //   const token = userInfo ? JSON.parse(userInfo).token : "";
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       authorization: token,
  //     },
  //   };
  //   axios.get("/api/blog", config).then((res) => {
  //     console.log(res.data);
  //   });
  // }, []);

  const handleChange = (value) => {
    setBlogBody(value);
  };

  const handleBannerUpload = (e) => {
    if (e.target.files[0]) {
      setblogBanner(e.target.files[0]);
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

    const formData = new FormData();
    formData.append("files", blogBanner);
    const fileID = await axios
      .post("/api/file", formData, config)
      .then((res) => res.data.fileId)
      .catch((error) => ({ message: "Error" }));

    const body = {
      blogTitle,
      blogCategory,
      blogShortDescription,
      blogDate,
      blogBody,
      blogBanner: fileID,
    };

    axios.post("/api/blog", body, config).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="blogAdmin">
      <div className="blogAdmin__inputSection">
        <label>Blog Title</label>
        <input
          type="text"
          onChange={(e) => setblogTitle(e.target.value)}
          value={blogTitle}
        ></input>
      </div>
      <div className="blogAdmin__inputSection">
        <label>Blog Category</label>
        <input
          type="text"
          onChange={(e) => setBlogCategory(e.target.value)}
          value={blogCategory}
        ></input>
      </div>
      <div className="blogAdmin__inputSection">
        <label>Blog Author</label>
        <input
          type="text"
          //   onChange={(e) => setblogDate(e.target.value)}
          //   value={blogTitle}
        ></input>
      </div>
      <div className="blogAdmin__inputSection">
        <label>Blog Date</label>
        <input
          type="date"
          onChange={(e) => setblogDate(e.target.value)}
          value={blogDate}
        ></input>
      </div>
      <div className="blogAdmin__inputSection">
        <label>Blog Banner</label>
        <input type="file" onChange={handleBannerUpload}></input>
      </div>
      <div className="blogAdmin__inputSection">
        <label>Short Description</label>
        <textarea
          type="text"
          onChange={(e) => setblogShortDescription(e.target.value)}
          rows={5}
          value={blogShortDescription}
        ></textarea>
      </div>
      <ReactQuill
        value={blogBody}
        onChange={handleChange}
        className="blogAdmin__quil"
        placeholder="Enter blog content..."
      />
      <button className="blogAdmin__submitBtn" onClick={submitData}>
        Add
      </button>
    </div>
  );
}

export default BlogAdmin;
