import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSkills } from "../../Actions/StudentProfile";
import "./css/StudentProfileSkills.css";
import skillsImage from "./img/skills.png";

const AddSkill = ({ skills, setSkills, setIsAddSkill }) => {
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("");

  const dispatch = useDispatch();

  const addSkillClickHandler = () => {
    if (skill && level) {
      const maxId = Math.max.apply(
        Math,
        skills.map(function (s) {
          return s.id;
        })
      );
      const skillsNew = [
        ...skills,
        {
          id: maxId === -Infinity ? 0 : maxId + 1,
          skill: skill,
          level,
          isEnabled: true,
        },
      ];
      dispatch(updateSkills(skillsNew));
      setSkills(skillsNew);
      setIsAddSkill(false);
    }
  };

  return (
    <div className="add-skill">
      <input
        type="text"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        placeholder="Name of the skill"
      />
      <div className="label">Select the level of understanding</div>
      <button
        className={`value${level === "beginner" ? " selected" : ""}`}
        onClick={() => setLevel("beginner")}
      >
        <div>BEGINNER</div>
      </button>
      <button
        className={`value${level === "intermediate" ? " selected" : ""}`}
        onClick={() => setLevel("intermediate")}
      >
        <div>INTERMEDIATE</div>
      </button>
      <button
        className={`value${level === "expert" ? " selected" : ""}`}
        onClick={() => setLevel("expert")}
      >
        <div>EXPERT</div>
      </button>
      <div className="actions">
        <button className="cancel" onClick={() => setIsAddSkill(false)}>
          CANCEL
        </button>
        <button
          className={`add${!skill || !level ? " disabled" : ""}`}
          disabled={!skill || !level}
          onClick={addSkillClickHandler}
        >
          ADD
        </button>
      </div>
    </div>
  );
};

const StudentProfileSkills = () => {
  const { skills: skillsArr, isEditView } = useSelector(
    (state) => state.studentProfile
  );
  const [isAddSkill, setIsAddSkill] = useState(false);
  const [skills, setSkills] = useState(skillsArr ? skillsArr : []);
  const [skillsTemp, setSkillsTemp] = useState(skillsArr ? skillsArr : []);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const dispatch = useDispatch();

  const updateSkillIsEnabled = (id, attr, value) => {
    const objIndex = skills.findIndex((obj) => obj.id === id);
    if (objIndex >= 0) {
      const skillsNew = [
        ...skills.slice(0, objIndex),
        { ...skills[objIndex], isEnabled: !skills[objIndex].isEnabled },
        ...skills.slice(objIndex + 1),
      ];
      dispatch(updateSkills(skillsNew));
      setSkills(skillsNew);
    }
  };

  const delSkillHandler = (id) => {
    if (
      window.screen.width > 600 &&
      window.confirm("Are you sure want to delete this Skill ?")
    ) {
      const skillsNew = skills.filter((s) => {
        if (s.id != id) return s;
      });
      dispatch(updateSkills(skillsNew));
      setSkills(skillsNew);
    } else {
      setIsPopupOpen(true);
      setTimeout(() => {
        setIsPopupOpen(false);
      }, 5000);
    }
  };

  useEffect(() => {
    if (skillsArr) {
      if (!isEditView) {
        setSkillsTemp(skillsArr);
        setSkills(
          skillsArr.filter((s) => {
            if (s.isEnabled) {
              return s;
            }
          })
        );
      } else {
        setSkills(skillsArr);
      }
    }
  }, [skillsArr]);

  useEffect(() => {
    const totalPagesLastIndexTemp = parseInt(
      (skills.length > 0 ? skills.length - 1 : 0) / rowsPerPage
    );
    if (totalPagesLastIndexTemp != totalPagesLastIndex) {
      setTotalPagesLastIndex(totalPagesLastIndexTemp);
    }
    if (activePage > totalPagesLastIndexTemp) {
      setActivePage(totalPagesLastIndexTemp);
    }
  }, [skills, isEditView]);

  useEffect(() => {
    if (!isEditView) {
      setSkillsTemp(skills);
      setSkills(
        skills.filter((s) => {
          if (s.isEnabled) {
            return s;
          }
        })
      );
    } else {
      setSkills(skillsTemp);
    }
  }, [isEditView]);

  const [activePage, setActivePage] = useState(0);
  const [totalPagesLastIndex, setTotalPagesLastIndex] = useState(0);

  const maxPages = 3;

  const rowsPerPage = 6;

  return (
    <div id="student-profile-skills" className="student-profile-skills">
      <img src={skillsImage} className="icon" />
      {isPopupOpen && (
        <span className="popuptext">
          Please open the site in Desktop, Laptop or Tablet to add/delete your
          profile!
        </span>
      )}
      {isAddSkill ? (
        <AddSkill
          skills={skills}
          setSkills={setSkills}
          setIsAddSkill={setIsAddSkill}
        />
      ) : (
        <>
          {skills.length ? (
            <div className="skills-container">
              {isEditView && (
                <button
                  onClick={
                    skills.length <= rowsPerPage * maxPages
                      ? () => {
                          if (window.screen.width > 600) {
                            setIsAddSkill(true);
                          } else {
                            setIsPopupOpen(true);
                            setTimeout(() => {
                              setIsPopupOpen(false);
                            }, 5000);
                          }
                        }
                      : ""
                  }
                  className="add-skills-btn"
                  disabled={!(skills.length <= rowsPerPage * maxPages)}
                >
                  ADD SKILL
                </button>
              )}
              <div className="skills">
                {skills
                  .slice(
                    rowsPerPage * activePage,
                    rowsPerPage * (activePage + 1)
                  )
                  .map((s, idx) => {
                    return (
                      <div key={s.id}>
                        {isEditView && window.screen.width > 600 && (
                          <button
                            onClick={() => updateSkillIsEnabled(s.id)}
                            className={s.isEnabled ? "enabled" : "disabled"}
                          >
                            <div className="circle"></div>
                          </button>
                        )}
                        <div className="name">{s.skill}</div>
                        <div className="level">
                          <div
                            className={
                              s.level === "beginner"
                                ? "level-1"
                                : s.level === "intermediate"
                                ? "level-2"
                                : s.level === "expert"
                                ? "level-3"
                                : "level-0"
                            }
                          >
                            {s.level ? s.level.toUpperCase() : ""}
                          </div>
                        </div>
                        {isEditView && (
                          <svg
                            onClick={() => delSkillHandler(s.id)}
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fal"
                            data-icon="times"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                            className="svg-inline--fa fa-times fa-w-10 fa-3x skill-remove-icon"
                          >
                            <path
                              fill="currentColor"
                              d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
                              className=""
                            ></path>
                          </svg>
                        )}
                      </div>
                    );
                  })}
              </div>
              <div className="dots">
                {[...Array(1 + totalPagesLastIndex).keys()].map((i) => (
                  <div
                    key={i}
                    onClick={() => setActivePage(i)}
                    className={`dot-${i}${i === activePage ? " active" : ""}`}
                  ></div>
                ))}
              </div>
            </div>
          ) : isEditView ? (
            <div
              onClick={() => {
                if (window.screen.width > 600) {
                  setIsAddSkill(true);
                } else {
                  setIsPopupOpen(true);
                  setTimeout(() => {
                    setIsPopupOpen(false);
                  }, 5000);
                }
              }}
              className="add-skill-long-btn"
            >
              <div>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="plus"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  className="svg-inline--fa fa-plus fa-w-12 fa-3x plus-icon"
                >
                  <path
                    fill="currentColor"
                    d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"
                    className=""
                  ></path>
                </svg>
                <div>ADD SKILL</div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default StudentProfileSkills;
