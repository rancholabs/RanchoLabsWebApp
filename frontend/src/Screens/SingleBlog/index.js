import React, { useState, useEffect, use } from "react";
import { useParams } from "react-router-dom";
import ReactHTMLparser from "react-html-parser";
import { blogList } from "../../Actions/Blog";
import { useDispatch, useSelector } from "react-redux";

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
    if (blogs) {
      const blogOBJ = blogs.filter((singleb) => singleb._id === blogID);
      if (blogOBJ.length > 0) setSingleB(blogOBJ[0]);
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
      <h1 className="singleBlog__title">{singleB.blogTitle}</h1>
      <div className="singleBlog__info">
        <span>{singleB.blogDate}</span>
        <button>{singleB.blogCategory}</button>
      </div>
      <img className="singleBlog__banner" src={singleB.image?.filePath}></img>
      <div className="singleBlog__body">
        {ReactHTMLparser(singleB.blogBody)}
      </div>

      <div className="sharethis-inline-share-buttons singleBlog__share"></div>

      <div className="singleBlog__author">
        <div class="singleBlog__authorImage">
          <img src={singleB.image?.filePath} />
        </div>
        <div class="singleBlog__author__data">
          <p class="singleBlog__author__name">Vignesh Hariharan</p>
          <p class="singleBlog__author__about">
            The author is a student of SSN College of Engineering pursuing his
            Bachelors in Computer Science and Engineering. He is a Product
            Management and Cloud Computing enthusiast. Passionate about Football
            and watching Manchester City play. Loves to read Agatha Christie and
            other thriller novels. He writes on Robotics, Artificial
            Intelligence and Space Science for Rancho Labs.
          </p>
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
