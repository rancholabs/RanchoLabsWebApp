import React, { useState, useEffect } from "react";

import "./index.css";
import axios from "axios";
import Blog from "./Blog";
import Author from "./Author";
import Category from "./Category";
import { blogList } from "../../Actions/Blog";
import { useDispatch, useSelector } from "react-redux";

function BlogAdmin() {
  const [currentSection, setcurrentSection] = useState("blog");
  const [allBlogAuthors, setallBlogAuthors] = useState([]);
  const [allBlogCategory, setallBlogCategory] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(blogList());
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    axios
      .get("/api/blogauthor", config)
      .then((res) => setallBlogAuthors(res.data));
    axios
      .get("/api/blogcategory", config)
      .then((res) => setallBlogCategory(res.data));
  }, []);

  const getUpdatedAuthors = () => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    axios
      .get("/api/blogauthor", config)
      .then((res) => setallBlogAuthors(res.data));
  };

  const getUpdatedCategory = () => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    axios
      .get("/api/blogcategory", config)
      .then((res) => setallBlogCategory(res.data));
  };

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

  const changeSection = (section) => {
    setcurrentSection(section);
    switch (section) {
      case "blog": {
        document.getElementById("blog").classList.add("selected");
        document.getElementById("author").classList.remove("selected");
        document.getElementById("category").classList.remove("selected");
        break;
      }
      case "author": {
        document.getElementById("author").classList.add("selected");
        document.getElementById("blog").classList.remove("selected");
        document.getElementById("category").classList.remove("selected");
        break;
      }
      case "category": {
        document.getElementById("category").classList.add("selected");
        document.getElementById("blog").classList.remove("selected");
        document.getElementById("author").classList.remove("selected");
        break;
      }
    }
  };

  return (
    <div className="blogAdmin">
      <div className="blogAdmin__sidebar">
        <ul>
          <li id="blog" onClick={() => changeSection("blog")}>
            Blog
          </li>
          <li id="author" onClick={() => changeSection("author")}>
            Author
          </li>
          <li id="category" onClick={() => changeSection("category")}>
            Category
          </li>
        </ul>
      </div>
      <div className="blogAdmin__body">
        {currentSection === "blog" && (
          <Blog
            allBlogAuthors={allBlogAuthors}
            allBlogCategory={allBlogCategory}
          />
        )}
        {currentSection === "author" && (
          <Author
            allBlogAuthors={allBlogAuthors}
            getUpdatedAuthors={getUpdatedAuthors}
          />
        )}
        {currentSection === "category" && (
          <Category
            allBlogCategory={allBlogCategory}
            getUpdatedCategory={getUpdatedCategory}
          />
        )}
      </div>
    </div>
  );
}

export default BlogAdmin;
