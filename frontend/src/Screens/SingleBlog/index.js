import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactHTMLparser from "react-html-parser";
import { blogList } from "../../Actions/Blog";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import "./index.css";

function SingleBlog() {
  let { blogID } = useParams();
  const { blogs } = useSelector((state) => state.blogs);
  const [singleB, setSingleB] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(blogList());
  }, []);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    if (blogs) {
      const blogOBJ = blogs.filter((singleb) => singleb._id === blogID);
      if (blogOBJ.length > 0) {
        axios
          .get(`/api/file/${blogOBJ[0].author.authorImage}`, config)
          .then((res) => {
            blogOBJ[0].author.authorImageURL = res.data.filePath;
            setSingleB(blogOBJ[0]);
          });
      }
    }
  }, [blogs]);

  useEffect(() => {
    const src =
      "https://platform-api.sharethis.com/js/sharethis.js#property=5ebd50e96b62a000122bae90&product=inline-share-buttons";
    let script = document.querySelector(`script[src="${src}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      // Add script to document body
      document.body.appendChild(script);
    }
  });

  console.log(singleB);

  return (
    <div className="singleBlog">
      <h1
        className="singleBlog__title"
        // style={{ fontFamily: " Lato, sans-serif" }}
      >
        {singleB.blogTitle}
      </h1>
      <div className="singleBlog__info">
        <span>{singleB.blogDate}</span>
        <button>{singleB.category?.name}</button>
      </div>
      <img className="singleBlog__banner" src={singleB.image?.filePath}></img>
      <div className="singleBlog__body">
        {ReactHTMLparser(singleB.blogBody)}
      </div>

      <div className="sharethis-inline-share-buttons singleBlog__share"></div>

      <div className="singleBlog__author">
        <div class="singleBlog__authorImage">
          <img src={singleB.author?.authorImageURL} />
        </div>
        <div class="singleBlog__author__data">
          <p class="singleBlog__author__name">{singleB.author?.name}</p>
          <p class="singleBlog__author__about">{singleB.author?.description}</p>
        </div>
      </div>

      <div className="singleBlog__featured">
        <h3>
          Want your article get featured? Write to us at{" "}
          <a href="mailto:labs.rancho@gmail.com">labs.rancho@gmail.com</a>
        </h3>
      </div>
    </div>
  );
}

export default SingleBlog;
