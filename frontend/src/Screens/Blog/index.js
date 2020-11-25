import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import "./index.css";
import { blogList } from "../../Actions/Blog";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ArrowBack from "./images/arrowRight.png";
import blogMobileBanner from "./images/blogMobileBanner.png";

function Blog() {
  const { blogs } = useSelector((state) => state.blogs);
  const [temparray, settemparray] = useState([]);
  const [selectedCategory, setselectedCategory] = useState("Miscellaneous");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(blogList());
  }, []);

  useEffect(() => {
    if (blogs) {
      var size = 4;
      var arrayOfArrays = [];

      var singleCategoryBlogs = [];

      blogs.forEach((singleBlog) => {
        if (singleBlog.category.name === selectedCategory) {
          singleCategoryBlogs.push(singleBlog);
        }
      });

      for (var i = 0; i < singleCategoryBlogs.length; i += size) {
        arrayOfArrays.push(singleCategoryBlogs.slice(i, i + size));
      }

      settemparray(arrayOfArrays);
    }
  }, [blogs, selectedCategory]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const CustomLeft = ({ onClick }) => (
    <button
      className="course-carousel-icon-button course-carousel-icon-left"
      onClick={onClick}
    >
      <img src={ArrowBack} className="course-carousel-icon" />
    </button>
  );

  const CustomRight = ({ onClick }) => (
    <button
      className="course-carousel-icon-button course-carousel-icon-right"
      onClick={onClick}
    >
      <img src={ArrowBack} className="course-carousel-icon" />
    </button>
  );

  console.log(temparray);
  // className="selected"
  return (
    <div className="blog">
      <div className="blog__category">
        <ul className="blog__categoryList">
          <li
            className={selectedCategory === "Miscellaneous" && "selected"}
            onClick={() => setselectedCategory("Miscellaneous")}
          >
            Miscellaneous
          </li>
          <li
            className={selectedCategory === "Robotics" && "selected"}
            onClick={() => setselectedCategory("Robotics")}
          >
            Robotics
          </li>
          <li
            className={selectedCategory === "Programming" && "selected"}
            onClick={() => setselectedCategory("Programming")}
          >
            Programming
          </li>
          <li
            className={
              selectedCategory === "Artificial Intelligence" && "selected"
            }
            onClick={() => setselectedCategory("Artificial Intelligence")}
          >
            Artificial Intelligence
          </li>
        </ul>
      </div>
      <div className="blog__categoryMobile">
        <label className="blog__categoryList__label">
          Select A Particular Category
        </label>
        <select
          className="blog__categoryList__select"
          value={selectedCategory}
          onChange={(e) => setselectedCategory(e.target.value)}
        >
          <option value="Miscellaneous">Miscellaneous</option>
          <option value="Robotics">Robotics</option>
          <option value="Programming">Programming</option>
          <option value="Artificial Intelligence">
            Artificial Intelligence
          </option>
        </select>
      </div>
      {temparray.map((blogSet, index) => {
        return (
          <div className="blog__cardsContainer">
            {blogSet[0] && <BlogCard isVertical={false} blog={blogSet[0]} />}
            {window.innerWidth < 600 ? (
              <Carousel
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive}
                infinite={true}
                // arrows={false}
                // autoPlay={true}
                // autoPlaySpeed={2500}
                // centerMode={showCenteredMode}
                customLeftArrow={<CustomLeft />}
                customRightArrow={<CustomRight />}
                // keyBoardControl={true}
                className="blog__cards__carousel"
              >
                {blogSet[1] && <BlogCard isVertical={true} blog={blogSet[1]} />}
                {blogSet[2] && <BlogCard isVertical={true} blog={blogSet[2]} />}
                {blogSet[3] && <BlogCard isVertical={true} blog={blogSet[3]} />}
              </Carousel>
            ) : (
              <div className="blog__cardsContainer__vertical">
                {blogSet[1] && <BlogCard isVertical={true} blog={blogSet[1]} />}
                {blogSet[2] && <BlogCard isVertical={true} blog={blogSet[2]} />}
                {blogSet[3] && <BlogCard isVertical={true} blog={blogSet[3]} />}
              </div>
            )}
          </div>
        );
      })}
      <div className="blog__featured">
        <p>
          Write to us at <strong>admin@rancholabs.com</strong> to get your
          article featured
        </p>
      </div>
      <div className="blog__banner">
        <h3>
          It's Time To Start <br /> Investing In Yourself
        </h3>
        <p>
          Explore The Tech Sector With Us And Take A Step Towards Your Passion
          And Future.
        </p>
        <button onClick={() => (window.location.href = "/courses")}>
          Enroll Now
        </button>
      </div>
    </div>
  );
}

export default Blog;
