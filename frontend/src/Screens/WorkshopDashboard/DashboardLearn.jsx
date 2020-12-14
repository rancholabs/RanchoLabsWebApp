import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "react-progressbar";
import "./css/DashboardLearn.css";

function over(e) {
  var now = new Date().toISOString();
  if (e < now) return 1;
  else return 0;
}

function ongoing(s, e) {
  var now = new Date().toISOString();
  if (s < now && e > now) return 1;
  else return 0;
}

const DLlistItem = (dlitem) => {
  return (
    <>
      <li>- &nbsp;{dlitem}</li>
    </>
  );
};

const getDate = (d) => {
  var date = new Date(d);
  var day = date.getDate();
  var options = { month: "long" };
  const month = new Intl.DateTimeFormat("en-US", options).format(date);
  console.log(month);
  var year = date.getFullYear();

  var rdate = {
    date: day,
    month: month,
    year: year,
  };

  console.log(rdate);
  return rdate;
};

const MaterialItem = (matitem) => {
  return (
    <div className="row">
      <div className="col-2">hi</div>
      <div className="col-2 pl-0">lesson</div>
      <div className="col-8">imagelessonlessonlesson</div>
    </div>
  );
};

const Daywise = ({ singleClass, batch }) => {
  console.log(singleClass, batch);
  const isOver = true;

  //   var sdate = getDate(singleClass.classTime.startTime);
  //   var edate = getDate(singleClass.classTime.endTime);

  var currentDate =
    singleClass.classNo === 1 ? batch.singleDate : batch.doubleDate;
  var currentTime =
    singleClass.classNo === 1 ? batch.singleTime : batch.doubleTime;

  var sdate = getDate(
    batch.batchType === "freeclass"
      ? new Date(currentDate)
      : new Date(currentDate)
  );
  var edate = getDate(
    batch.batchType === "freeclass"
      ? new Date(currentDate)
      : new Date(currentDate)
  );
  var suffix =
    parseInt(currentTime.toString().split(":")[0]) >= 12 ? "PM" : "AM";
  var hours = ((parseInt(currentTime.toString().split(":")[0]) + 11) % 12) + 1;
  var freeclasstime =
    hours + ":" + currentTime.toString().split(":")[1] + " " + suffix;

  const [showsessionMaterial, setshowsessionMaterial] = React.useState(false);

  return (
    <>
      {singleClass && (
        <div>
          <div
            className="row session-titles"
            style={{ marginBottom: "0.8vw", marginTop: "0.5vw" }}
          >
            <div className="section-day pl-4 pr-4">
              Session {singleClass.classNo}
            </div>
            <div className="section-title pl-0 align-self-center">
              {singleClass.topic}
              <span className="status">
                {ongoing(
                  singleClass.classTime?.startTime,
                  singleClass.classTime?.endTime
                )}
              </span>
            </div>
          </div>
          <div className="inner-card">
            {!isOver ? (
              <>
                {/* <MaterialItem material = {singleClass.materials}></MaterialItem> */}
              </>
            ) : (
              <>
                {showsessionMaterial ? (
                  <div className="access-session-material-content">
                    {batch.classes.filter(
                      (bclass) => bclass.classId === singleClass.classId
                    )[0] ? (
                      batch.classes.filter(
                        (bclass) => bclass.classId === singleClass.classId
                      )[0].materials.slides ? (
                        <a
                          href={singleClass.materials.slideLink}
                          target="_blank"
                        >
                          Slide
                        </a>
                      ) : (
                        <a onClick={() => alert("Material not available yet.")}>
                          Slide
                        </a>
                      )
                    ) : (
                      <a onClick={() => alert("Material not available yet.")}>
                        Slide
                      </a>
                    )}
                    {batch.classes.filter(
                      (bclass) => bclass.classId === singleClass.classId
                    )[0] ? (
                      batch.classes.filter(
                        (bclass) => bclass.classId === singleClass.classId
                      )[0].materials.assignments ? (
                        <a
                          href={singleClass.materials.assignmentLink}
                          target="_blank"
                        >
                          Assignment
                        </a>
                      ) : (
                        <a onClick={() => alert("Material not available yet.")}>
                          Assignment
                        </a>
                      )
                    ) : (
                      <a onClick={() => alert("Material not available yet.")}>
                        Assignment
                      </a>
                    )}
                    {batch.classes.filter(
                      (bclass) => bclass.classId === singleClass.classId
                    )[0] ? (
                      batch.classes.filter(
                        (bclass) => bclass.classId === singleClass.classId
                      )[0].materials.quiz ? (
                        <a
                          href={singleClass.materials.quizLink}
                          target="_blank"
                        >
                          Quiz
                        </a>
                      ) : (
                        <a onClick={() => alert("Material not available yet.")}>
                          Quiz
                        </a>
                      )
                    ) : (
                      <a onClick={() => alert("Material not available yet.")}>
                        Quiz
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="row joining-details">
                    <div className="pl-3 pr-3">
                      <button className="join">
                        {batch.classes.filter(
                          (bclass) => bclass.classId === singleClass.classId
                        )[0] ? (
                          batch.classes.filter(
                            (bclass) => bclass.classId === singleClass.classId
                          )[0].materials.link ? (
                            <a href={batch.batch_link} target="_blank">
                              Join Class
                            </a>
                          ) : (
                            <a
                              onClick={() =>
                                alert("Material not available yet.")
                              }
                            >
                              Join Class
                            </a>
                          )
                        ) : (
                          <a
                            onClick={() => alert("Material not available yet.")}
                          >
                            Join Class
                          </a>
                        )}
                      </button>
                    </div>
                    <div className="align-self-center join-date">
                      {sdate.date} {sdate.month} {sdate.year} -{" "}
                      {batch.batchType === "freeclass" ||
                      batch.batchType === "workshop" ? (
                        "From " + freeclasstime + " IST"
                      ) : (
                        <>
                          {edate.date}
                          {edate.month} {edate.year}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <div
            className="access-session-material"
            onClick={() => setshowsessionMaterial(!showsessionMaterial)}
          >
            <h3>Access Session Material</h3>
          </div>
        </div>
      )}
    </>
  );
};

const NotEnrolled = () => {
  return (
    <div
      className="text-center not-enrolled"
      style={{ margin: "auto", marginTop: "16%" }}
    >
      <div> Start learning today!</div>
      <div>
        <a href="/FreeWorkshop">
          <button>Enroll now</button>
        </a>
      </div>
    </div>
  );
};

const DashboardLearnCard = (props) => {
  var Dlearn = props.learn;
  console.log(Dlearn);

  function getProgress() {
    if (Dlearn) {
      var c = 0;

      for (var i = 0; i < Dlearn.classes.length; i++) {
        if (over(Dlearn.classes[i].classend)) {
          c++;
        }
      }
      return c / Dlearn.classes.length;
    } else return 0;
  }

  var progress = getProgress();

  return (
    <>
      <div className="card learncard">
        <div className="card-content">
          <div className="card-title">
            {Dlearn && Dlearn.courseDetails.name}
          </div>
          {Dlearn ? (
            <>
              <div className="section-intro">
                {Dlearn.classes.map((singleClass, index) => {
                  if (Dlearn.batch.batchType === "freeclass") {
                    if (singleClass.classNo === 1) {
                      return (
                        <Daywise
                          singleClass={singleClass}
                          batch={Dlearn.batch}
                        />
                      );
                    }
                  } else if (Dlearn.batch.batchType === "workshop") {
                    if (
                      singleClass.classNo === 1 ||
                      singleClass.classNo === 2
                    ) {
                      return (
                        <Daywise
                          singleClass={singleClass}
                          batch={Dlearn.batch}
                        />
                      );
                    }
                  } else {
                    return (
                      <Daywise singleClass={singleClass} batch={Dlearn.batch} />
                    );
                  }
                })}
              </div>
            </>
          ) : (
            <NotEnrolled />
          )}
        </div>
        <ProgressBar completed={progress} />
      </div>
    </>
  );
};

export default DashboardLearnCard;
