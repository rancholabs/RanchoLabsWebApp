import React, { useEffect, useState } from "react";
import queryString from "query-string";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setDefaultHeader, updateHeader } from "../../Actions/Header";
import { setDefaultFooter, updateFooter } from "../../Actions/Footer";
import LogoImg from "./img/logo 4@2x.png";
import "./index.css";

function ProjectBuild({ location }) {
  const dispatch = useDispatch();

  const params = queryString.parse(location.search);
  const [singleProject, setSingleProject] = useState({});
  const [singleCourse, setSingleCourse] = useState([]);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    axios
      .get(`/api/course/project/single/${params.project}`, config)
      .then((res) => {
        console.log(res.data);
        setSingleProject(res.data[0]);
      });
  }, []);

  useEffect(() => {
    if (singleProject.courseId) {
      const userInfo = localStorage.getItem("userInfo");
      const token = userInfo ? JSON.parse(userInfo).token : "";
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };
      axios.get(`/api/course/${singleProject.courseId}`, config).then((res) => {
        console.log(res.data);
        setSingleCourse(res.data);
      });
    }
  }, [singleProject]);

  useEffect(() => {
    dispatch(updateHeader({ headerDisplay: "none" }));
    dispatch(updateFooter({ footerDisplay: "none" }));

    return () => {
      dispatch(setDefaultHeader());
      dispatch(setDefaultFooter());
    };
  }, []);

  const addSubmission = () => {};

  return (
    <div className="buildProject">
      <div className="buildProject__header">
        <img src={LogoImg}></img>
      </div>
      <div className="buildProject__body">
        <div className="buildProject__bodyHeader">
          <h3 id="project_name">
            {"Project " + singleProject.no + ": " + singleProject.name}
          </h3>
          <h3 id="project_course_name">
            {singleCourse.courseGroup?.name + ": " + singleCourse.name}
          </h3>
        </div>
        <div className="buildProject__body__contentParent">
          <div className="buildProject__body__content">
            <div className="buildProject__body__contentSection">
              <h3>Project Description</h3>
              <h3>{singleProject.question}</h3>
            </div>
            <div className="buildProject__body__contentSection__image">
              <h3>{"Deadline : " + singleProject.deadline}</h3>
              <img src={singleProject?.studentimage?.filePath}></img>
            </div>
          </div>
          <button className="buildProject__submitBtn" onClick={addSubmission}>
            Add Submission
          </button>
        </div>
        <div className="buildProject__body__contentParent buildProject__instructor">
          <h3>Grade: Not graded yet</h3>
          <h3>Teacher's Notes:</h3>
          <div>
            <h3>Teacher's feedback will appear here.</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectBuild;
