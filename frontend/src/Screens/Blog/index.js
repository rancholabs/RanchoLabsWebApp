import React from "react";
import BlogCard from "./BlogCard";

import "./index.css";

function index() {
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
      {[1, 1, 1].map((_) => {
        return (
          <div className="blog__cardsContainer">
            <BlogCard />
            <div className="blog__cardsContainer__vertical">
              <BlogCard isVertical={true} />
              <BlogCard isVertical={true} />
              <BlogCard isVertical={true} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default index;
