import React from "react";
import "./BlogCard.css";

function BlogCard({ isVertical }) {
  return (
    <>
      {isVertical ? (
        <div className="blogCard blogCard__vertical">
          <img
            className="blogCard__image"
            src="https://picsum.photos/700/500"
          ></img>
          <div className="blogCard__body">
            <h3 className="blogCard__title">Introduction To Space Science</h3>
            <hr className="blogCard__divider" />
            <span className="blogCard__info">
              <p>By Vignesh</p>
              <p>May 12, 2020</p>
            </span>
            <p className="blogCard__desc">
              Artificial Intelligence Refers To The Intelligence Portrayed By
              The Machines. It Is A Branch Of ‘Computer Science’ That Deals With
              The Study Of Intelligent Agents. Artificial Intelligence Refers To
              The Intelligence Portrayed By The Machines.{" "}
            </p>
          </div>
        </div>
      ) : (
        <div className="blogCard blogCard__horizontal">
          <img
            className="blogCard__image"
            src="https://picsum.photos/700"
          ></img>
          <div className="blogCard__body">
            <h3 className="blogCard__title">Introduction To Space Science</h3>
            <hr className="blogCard__divider" />
            <span className="blogCard__info">
              <p>By Vignesh</p>
              <p>May 12, 2020</p>
            </span>
            <p className="blogCard__desc">
              Artificial Intelligence Refers To The Intelligence Portrayed By
              The Machines. It Is A Branch Of ‘Computer Science’ That Deals With
              The Study Of Intelligent Agents. Artificial Intelligence Refers To
              The Intelligence Portrayed By The Machines.{" "}
            </p>
            <button className="blogCard__button">Read more</button>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogCard;
