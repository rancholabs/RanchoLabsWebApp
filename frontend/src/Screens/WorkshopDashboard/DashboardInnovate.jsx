import React from "react";
import "./css/DashboardInnovate.css";
import { useHistory, useParams } from "react-router-dom";

function DashboardInnovateCard() {
  const history = useHistory();
  return (
    <div
      className="card text-center"
      style={{ padding: "1.8vw", float: "right" }}
    >
      <div className="title-tag">Think out of the box</div>
      <div className="center-text">
        WOULD YOU{" "}
        <span id="br">
          <br />
        </span>
        LIKE TO <br /> <span style={{ color: "#F74B42" }}>INNOVATE</span> <br />
        SOMETHING?
      </div>
      <div
        className="comewithus"
        onClick={() =>
          history.push("/profile/student?scroll=student-profile-innovations")
        }
      >
        <button>
          COME WITH US&nbsp;<span style={{ color: "#020122" }}>&#9658;</span>
        </button>
      </div>
      <div className="idea">Bring your idea, we will help you to shape it</div>
    </div>
  ); 
}

export default DashboardInnovateCard;
