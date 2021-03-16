import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./css/DashboardBanner.css";
import bannerpic from "./img/bannerimg.png";
import { useEffect } from "react";
import { getStudent, updateStudent } from "../../Actions/Student";
import { useHistory } from "react-router-dom";

const Banner = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { student } = useSelector((state) => state.studentInfo);
  //console.log(props.props)
  //console.log(props.props.courses[0]?.batchId)

  useEffect(() => {
    dispatch(getStudent());
  }, []);

  const freeClassHandler = () => {
    if (student && !student.freeEnrollment.freeClass.enrolled) {
      var updates = {
        freeEnrollment: student.freeEnrollment,
      };
      updates.freeEnrollment.freeClass.enrolled = true;
      dispatch(updateStudent(updates));
    }
    history.push("/dashboard");
  };

  return (
    <>
      {student?.loginfor === "workshop"  ? (
        <>
          <br />
          <br />
          <br />{" "}
        </>
      ) : (
        <>
        {
          !props.props.courses[0]?.batchId ? (<div className="dashboardbanner">
          <div className="bannerimage">
            <div className="row mx-0">
              <div>
                <div className="banner-quote">
                  {student &&
                    student.freeEnrollment &&
                    student.freeEnrollment.freeWorkshop.completed && (
                      <>
                        {" "}
                        “ The moment you quit is when you should push harder”
                      </>
                    )}
                </div>
                <div className="banner-content">
                  {student &&
                    student.freeEnrollment &&
                    student.freeEnrollment.freeWorkshop.completed && (
                      <>
                        Don’t stop at the workshop. Carve your career in
                        Programming, Robotics and AI today. Kickstart your
                        career with a Rs. 500 gift card.
                      </>
                    )}
                  <div style={{ fontSize: "2vw" }}>
                    {student &&
                    student.freeEnrollment &&
                    student.freeEnrollment.freeClass.enrolled ? (
                      <>
                        We received your request successfully for the FREE
                        Class. Our team will soon get in touch with you to
                        schedule the timings.
                      </>
                    ) : (
                      <>Book a free class</>
                    )}
                  </div>
                </div>

                {student &&
                  student.freeEnrollment &&
                  student.freeEnrollment.freeWorkshop.completed && (
                    <div className="redeem-button text-center">
                      <a>
                        <button>Redeem now</button>
                      </a>
                    </div>
                  )}
                {student &&
                  student.freeEnrollment &&
                  !student.freeEnrollment.freeClass.enrolled && (
                    <div className="redeem-button text-center">
                      <a>
                        <button onClick={freeClassHandler}>FREE CLASS</button>
                      </a>
                    </div>
                  )}
              </div>
              <div className="coding-img">
                <img src={bannerpic} className="img-fluid"></img>
              </div>
            </div>
          </div>
        </div>) : (
          <>
            <br />
            <br />
            <br />
          </>
        )
           
          
        }
       </> 
      )}
    </>
  );
  
};

export default Banner;
