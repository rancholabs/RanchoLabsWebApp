import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "./Blog.css";
import "./index.css";

function Blog({ allBlogAuthors, allBlogCategory }) {
  let { blogs } = useSelector((state) => state.blogs);
  const [allBlogs, setAllBlogs] = useState(blogs);
  const [updateBlog, setupdateBlog] = useState(false);
  const [tobeEditedBlog, settobeEditedBlog] = useState({});
  const [showEditForm, setshowEditForm] = useState(false);
  const [showAddForm, setshowAddForm] = useState(false);

  const [blogBody, setBlogBody] = useState("");
  const [blogTitle, setblogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState([{ categoryName: "" }]);
  const [blogShortDescription, setblogShortDescription] = useState("");
  const [blogDate, setblogDate] = useState("");
  const [blogAuthor, setblogAuthor] = useState("");
  const [blogBanner, setblogBanner] = useState(null);
  const [blogCardBanner, setblogCardBanner] = useState(null);

  const [allBlogImages, setallBlogImages] = useState([]);

  useEffect(() => {
    setAllBlogs(blogs);
  }, [blogs]);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    axios.get("/api/blogfile", config).then((res) => {
      setallBlogImages(res.data);
    });
  }, []);

  const editBlog = (blog) => {
    settobeEditedBlog(blog);
    setupdateBlog(true);
    setshowEditForm(true);
    setshowAddForm(false);
    setBlogBody(blog.blogBody);
    setblogTitle(blog.blogTitle);
    setBlogCategory(blog.blogCategory);
    setblogShortDescription(blog.blogShortDescription);
    setblogDate(blog.blogDate);
    setblogAuthor(blog.blogAuthor);
  };

  const addNewBlog = () => {
    settobeEditedBlog({});
    setupdateBlog(false);
    setshowEditForm(true);
    setshowAddForm(true);
    setBlogBody("");
    setblogTitle("");
    setBlogCategory([]);
    setblogShortDescription("");
    setblogDate("");
    setblogAuthor("");
  };

  const goBack = () => {
    setupdateBlog(false);
    settobeEditedBlog({});
    setshowEditForm(false);
    setshowAddForm(false);
    setBlogBody("");
    setblogTitle("");
    setBlogCategory([]);
    setblogShortDescription("");
    setblogDate("");
    setblogAuthor("");
  };

  const handleChange = (value) => {
    setBlogBody(value);
  };

  const handleBannerUpload = (e) => {
    if (e.target.files[0]) {
      setblogBanner(e.target.files[0]);
    }
  };

  const handleCardBannerUpload = (e) => {
    if (e.target.files[0]) {
      setblogCardBanner(e.target.files[0]);
    }
  };

  const deleteBlog = async (blog) => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    // delete file
    await axios
      .delete(`/api/file/${blog.image?._id}`, config)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => console.log(err));
    await axios
      .delete(`/api/file/${blog.cardImage?._id}`, config)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => console.log(err));

    // delete blog
    await axios
      .delete(`/api/blog/${blog._id}`, config)
      .then((res) => {
        console.log(res.data);
        alert("Blog deleted!");
        return res.data;
      })
      .catch((err) => console.log(err));
  };

  const handleQuilFileUpload = async (e) => {
    if (e.target.files[0]) {
      setblogBanner(e.target.files[0]);
      if (window.confirm("Upload file?")) {
        const userInfo = localStorage.getItem("userInfo");
        const token = userInfo ? JSON.parse(userInfo).token : "";
        const config = {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        };

        const formData = new FormData();
        formData.append("files", e.target.files[0]);
        const fileID = await axios
          .post("/api/file", formData, config)
          .then((res) => res.data.fileId)
          .catch((error) => ({ message: "Error" }));

        const body = {
          blogFile: fileID,
        };

        axios.post("/api/blogfile", body, config).then((res) => {
          axios.get("/api/blogfile", config).then((res) => {
            setallBlogImages(res.data);
          });
        });
      }
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

    if (updateBlog) {
      //   update
      if (blogBanner === null && blogCardBanner === null) {
        // dont update image
        const body = {
          blogTitle,
          blogCategory,
          blogShortDescription,
          blogDate,
          blogBody,
          blogAuthor,
        };

        axios
          .put(`/api/blog/${tobeEditedBlog._id}`, body, config)
          .then((res) => {
            console.log(res);
            var newAllBlogs = [...allBlogs];
            for (var i in newAllBlogs) {
              if (newAllBlogs[i]._id == tobeEditedBlog._id) {
                newAllBlogs[i] = tobeEditedBlog;
                break;
              }
            }
            setAllBlogs(newAllBlogs);
            goBack();
          });
      } else {
        // update image

        const body = {
          blogTitle,
          blogCategory,
          blogShortDescription,
          blogDate,
          blogBody,
          blogAuthor,
        };

        console.log(tobeEditedBlog);

        if (blogBanner !== null) {
          console.log("update blog banner");
          await axios
            .delete(`/api/file/${tobeEditedBlog.image?._id}`, config)
            .then((res) => {
              console.log(res.data);
              return res.data;
            })
            .catch((err) => console.log(err));

          const formData = new FormData();
          formData.append("files", blogBanner);
          const fileID = await axios
            .post("/api/file", formData, config)
            .then((res) => res.data.fileId)
            .catch((error) => console.log(error));

          body.blogBanner = fileID;
        }

        if (blogCardBanner !== null) {
          console.log("update blog  card banner");
          await axios
            .delete(`/api/file/${tobeEditedBlog.cardImage?._id}`, config)
            .then((res) => {
              console.log(res.data);
              return res.data;
            })
            .catch((err) => console.log(err));

          const _formData = new FormData();
          _formData.append("files", blogCardBanner);
          const fileIDCard = await axios
            .post("/api/file", _formData, config)
            .then((res) => res.data.fileId)
            .catch((error) => console.log(error));

          body.blogCardBanner = fileIDCard;
        }

        axios
          .put(`/api/blog/${tobeEditedBlog._id}`, body, config)
          .then((res) => {
            console.log(res);
            var newAllBlogs = [...allBlogs];
            for (var i in newAllBlogs) {
              if (newAllBlogs[i]._id == tobeEditedBlog._id) {
                newAllBlogs[i] = tobeEditedBlog;
                break;
              }
            }
            setAllBlogs(newAllBlogs);
            goBack();
            alert("Updated !!")
          });
      }
    } else {
      //   new
      const formData = new FormData();
      formData.append("files", blogBanner);
      const fileID = await axios
        .post("/api/file", formData, config)
        .then((res) => res.data.fileId)
        .catch((error) => console.log(error));

      const _formData = new FormData();
      _formData.append("files", blogCardBanner);
      const fileIDCard = await axios
        .post("/api/file", _formData, config)
        .then((res) => res.data.fileId)
        .catch((error) => console.log(error));

      const body = {
        blogTitle,
        blogCategory,
        blogShortDescription,
        blogDate,
        blogBody,
        blogAuthor,
        blogBanner: fileID,
        blogCardBanner: fileIDCard,
      };

      axios.post("/api/blog", body, config).then((res) => {
        console.log(res);
        goBack();
        alert("Blog added");
      });
    }
  };

  const handleblogCategoryChange = (e) => {
    let _blogCategoryArray = [...blogCategory];
    let singleBlogCatOBJ = {
      categoryName: e.target.value,
    };
    if (
      _blogCategoryArray.filter((bcat) => bcat.categoryName === e.target.value)
        .length === 0
    ) {
      _blogCategoryArray.push(singleBlogCatOBJ);
    }
    setBlogCategory(_blogCategoryArray);
  };

  const removeCategory = (cat) => {
    var _blogCategoryArray = [...blogCategory];

    const index = _blogCategoryArray.indexOf(cat);
    _blogCategoryArray.splice(index, 1);
    setBlogCategory(_blogCategoryArray);
  };

  return (
    <div className="blog">
      {showEditForm ? (
        <div className="blog__form">
          <p className="blog__form__back" onClick={goBack}>
            ←
          </p>
          <div className="blog__form__input__section">
            <div className="blog__form__inputs">
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
                <select
                  // value={blogCategory}
                  onChange={(e) => handleblogCategoryChange(e)}
                >
                  <option>--select category--</option>
                  {allBlogCategory.map((singleCategory) => {
                    return (
                      <option value={singleCategory._id}>
                        {singleCategory.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="blogAdmin__categoryTabs">
                {blogCategory?.map((blogCat) => {
                  return (
                    <div className="blogAdmin__category__tab">
                      <p>
                        {
                          allBlogCategory.filter(
                            (bcat) => bcat._id === blogCat.categoryName
                          )[0].name
                        }
                      </p>
                      <div
                        className="blogAdmin__category__tabRemove"
                        onClick={() => removeCategory(blogCat)}
                      >
                        x
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="blogAdmin__inputSection">
                <label>Blog Author</label>
                <select
                  value={blogAuthor}
                  onChange={(e) => setblogAuthor(e.target.value)}
                >
                  <option>--select author--</option>
                  {allBlogAuthors.map((singleAuthor) => {
                    return (
                      <option value={singleAuthor._id}>
                        {singleAuthor.name}
                      </option>
                    );
                  })}
                </select>
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
                <label>Blog Card Banner</label>
                <input type="file" onChange={handleCardBannerUpload}></input>
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
            </div>
            <ReactQuill
              value={blogBody}
              onChange={handleChange}
              className="blogAdmin__quil"
              placeholder="Enter blog content..."
            />
          </div>
          <div className="blog__quil__file">
            {showAddForm ? "" : allBlogImages.map((blogimg) => {
              return <img src={blogimg.image.filePath} alt=""></img>;
            })}
            <input
              type="file"
              style={{ display: "none" }}
              id="blog__file"
              onChange={handleQuilFileUpload}
            />
            <button
              onClick={() => document.getElementById("blog__file").click()}
            >
              Upload
            </button>
          </div>
          <div className="blogAdmin_Btn">
            <button className="blogAdmin__submitBtn" onClick={submitData}>
              {showAddForm ? "Add" : "Save"}
            </button>
            {showAddForm ? "" : <button className="blogAdmin_cancelBtn" onClick={goBack}>
              Cancel
          </button>}
          </div>
        </div>
      ) : (
          <div className="blog__table">
            <button className="blog__table__addBtn" onClick={addNewBlog}>
              Add New
          </button>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Short Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allBlogs?.map((singleBlog) => (
                    <TableRow key={singleBlog._id}>
                      <TableCell component="th" scope="row">
                        {singleBlog.blogDate}
                      </TableCell>
                      <TableCell>{singleBlog.blogTitle}</TableCell>
                      <TableCell>
                        {singleBlog.blogCategory?.map((bcat) => {
                          return (
                            allBlogCategory?.filter(
                              (allbCat) => allbCat._id === bcat.categoryName
                            )[0]?.name + ","
                          );
                        })}
                      </TableCell>
                      <TableCell width="50%">
                        {singleBlog.blogShortDescription}
                      </TableCell>
                      <TableCell>
                        <button
                          className="blog__table__editBtn"
                          onClick={() => editBlog(singleBlog)}
                        >
                          Edit
                      </button>
                      </TableCell>
                      <TableCell>
                        <button
                          className="blog__table__editBtn"
                          onClick={() => deleteBlog(singleBlog)}
                        >
                          Delete
                      </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
    </div>
  );
}

export default Blog;
