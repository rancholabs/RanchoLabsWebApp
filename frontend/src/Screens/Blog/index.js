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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(blogList());
  }, []);

  useEffect(() => {
    if (blogs) {
      var size = 4;
      var arrayOfArrays = [];
      for (var i = 0; i < blogs.length; i += size) {
        arrayOfArrays.push(blogs.slice(i, i + size));
      }
      settemparray(arrayOfArrays);
    }
  }, [blogs]);

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

  return (
    <div className="blog">
      <div className="blog__category">
        <ul className="blog__categoryList">
          <li className="selected">Robotics</li>
          <li>Programming</li>
          <li>Artificial Intelligence</li>
          <li>Miscellaneous</li>
        </ul>
      </div>
      <div className="blog__categoryMobile">
        <label className="blog__categoryList__label">
          Select A Particular Category
        </label>
        <select className="blog__categoryList__select">
          <option>Robotics</option>
          <option>Programming</option>
          <option>Artificial Intelligence</option>
          <option>Miscellaneous</option>
        </select>
      </div>
      {[1, 1, 1].map((blogSet, index) => {
        return (
          <div className="blog__cardsContainer">
            <BlogCard isVertical={false} />
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
                <BlogCard isVertical={true} />
                <BlogCard isVertical={true} />
                <BlogCard isVertical={true} />
              </Carousel>
            ) : (
              <div className="blog__cardsContainer__vertical">
                <BlogCard isVertical={true} />
                <BlogCard isVertical={true} />
                <BlogCard isVertical={true} />
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
        <button>Enroll Now</button>
      </div>
    </div>
  );
}

export default Blog;
