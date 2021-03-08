import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "../WorkshopDashboard/css/DashboardBody.css";

function DashboardVideo(props) {
  const courses = props.courses
  console.log(courses)

    // if (courses && courses.batch) {
    //   if (courses.batch.batchType === "workshop") {
    //     setShow(true);
    //     var dayOneEnd = new Date(courses.batch.singleDate).setHours(
    //       courses.batch.singleTime.toString().split(":")[0],
    //       courses.batch.singleTime.toString().split(":")[1],
    //       0,
    //       0
    //     );
    //     console.log(dayOneEnd);
    //   }
    // }

  const history = useHistory();
  return (
    <> 
    <div className = "youngInnovatorDashboardVideo">
      <div className="youngInnovatorVideoMain">
      <h3>Young Innovator Program</h3>
        <iframe
          className="iframe"
          src="https://www.youtube.com/embed/7wcJ5K-uPZo"
        ></iframe>
        <button onClick={() => history.push("/youngInnovator")}>
          Know More
        </button>
      </div>
      </div>
    </>
    
    
  );
}

export default DashboardVideo;
