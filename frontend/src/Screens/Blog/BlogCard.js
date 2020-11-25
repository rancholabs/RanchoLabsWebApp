import React from "react";
import "./BlogCard.css";

function BlogCard({ isVertical, blog }) {
  console.log(blog);
  return (
    <>
      {isVertical ? (
        <div className="blogCard blogCard__vertical">
          <img className="blogCard__image" src={blog?.image?.filePath}></img>
          <div className="blogCard__body">
            <h3 className="blogCard__title">{blog?.blogTitle}</h3>
            <hr className="blogCard__divider" />
            <span className="blogCard__info">
              <p>By {blog?.author?.name}</p>
              <p>{blog?.blogDate}</p>
            </span>
            <p className="blogCard__desc">{blog?.blogShortDescription}</p>
          </div>
        </div>
      ) : (
        <div className="blogCard blogCard__horizontal">
          <img className="blogCard__image" src={blog?.image?.filePath}></img>
          <div className="blogCard__body">
            <h3 className="blogCard__title">{blog?.blogTitle}</h3>
            <hr className="blogCard__divider" />
            <span className="blogCard__info">
              <p>By {blog?.author?.name}</p>
              <p>{blog?.blogDate}</p>
            </span>
            <p className="blogCard__desc">{blog?.blogShortDescription}</p>
            <button
              className="blogCard__button"
              onClick={() => (window.location.href = `/blog/${blog._id}`)}
            >
              Read more
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogCard;
