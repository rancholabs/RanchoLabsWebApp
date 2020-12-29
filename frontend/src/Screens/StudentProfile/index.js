import React, { useEffect } from "react";
import StudentProfileSideNav from "./StudentProfileSideNav";
import "./css/index.css";
import StudentProfileAboutMe from "./StudentProfileAboutMe";
import StudentProfileExtracurricular from "./StudentProfileExtracurricular";
import StudentProfileSkills from "./StudentProfileSkills";
import StudentProfileProjects from "./StudentProfileProjects";
import StudentProfileInnovations from "./StudentProfileInnovations";
import StudentProfileCourses from "./StudentProfileCourses";
import StudentProfileCertificates from "./StudentProfileCertificates";
import { useHistory, useParams } from "react-router-dom";
import { enableEditing, getProfile } from "../../Actions/StudentProfile";
import { useDispatch, useSelector } from "react-redux";
import StudentProfileShareBtns from "./StudentProfileShareBtns";
import queryString from "query-string";

const ProfileLabel = ({ label, className }) => {
  return (
    <>
      <div className="closing-line"></div>
      <div className={className}>{label}</div>
    </>
  );
};

const StudentProfile = ({ location }) => {
  const { isEditView, isShareOpen } = useSelector(
    (state) => state.studentProfile
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const params = queryString.parse(location.search);

  useEffect(() => {
    if (!profileId) {
      if (userInfo) dispatch(enableEditing(true));
      else history.replace("/login?redirect=/profile/student");
    }
    dispatch(getProfile(profileId));
  }, [profileId, userInfo]);

  useEffect(() => {
    if (params.scroll) {
      const element = document.getElementById(params.scroll);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, []);

  const profileLabels = [
    {
      label: "certificates",
      className: "certificates",
    },
    {
      label: "courses",
      className: "pcourses",
    },
    {
      label: "innovations",
      className: "innovations",
    },
    {
      label: "projects",
      className: "projects",
    },
    {
      label: "skills",
      className: "skills",
    },
    {
      label: "extracurricular",
      className: "extracurricular",
    },
    {
      label: "about me",
      className: "about-me",
    },
  ];

  const onClickHandler = () => {
    if (!profileId && !isEditView) {
      dispatch(enableEditing(true));
    } else {
      history.goBack();
    }
  };

  return (
    <div className="student-profile">
      <StudentProfileSideNav />
      <div className="main">
        <svg
          onClick={onClickHandler}
          aria-hidden="true"
          focusable="false"
          data-prefix="fal"
          data-icon="times"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          className="svg-inline--fa fa-times fa-w-10 fa-3x close-icon"
        >
          <path
            fill="currentColor"
            d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
            className=""
          ></path>
        </svg>
        <div className="profile-labels">
          {profileLabels.map((pl, idx) => (
            <ProfileLabel
              key={idx}
              label={pl.label.toUpperCase()}
              className={pl.className}
            />
          ))}
        </div>
        <div className="contents">
          <StudentProfileAboutMe />
          <StudentProfileExtracurricular />
          <StudentProfileSkills />
          <StudentProfileProjects />
          <StudentProfileInnovations />
          <StudentProfileCourses />
          <StudentProfileCertificates />
        </div>
      </div>
      {isShareOpen && (
        <StudentProfileShareBtns type={isShareOpen.type} id={isShareOpen.id} />
      )}
    </div>
  );
};

export default StudentProfile;
