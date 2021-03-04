import React from "react";
import { useHistory } from "react-router-dom";
import "./BlogCard.css";
import { Helmet } from "react-helmet";

function BlogCard({ isVertical, blog }) {
  const _history = useHistory();
  console.log(blog);
  return (
    <>
      <Helmet>
        <meta name="description" content={blog?.metaDescription} />
      </Helmet>
      {isVertical ? (
        <div
          className="blogCard blogCard__vertical"
          onClick={() => _history.push(`/blog/${blog._id}`)}
        >
          <img
            className="blogCard__image"
            src={blog?.cardImage?.filePath}
          ></img>
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
          <img
            className="blogCard__image"
            src={blog?.cardImage?.filePath}
          ></img>
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
              onClick={() => _history.push(`/blog/${blog._id}`)}
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
