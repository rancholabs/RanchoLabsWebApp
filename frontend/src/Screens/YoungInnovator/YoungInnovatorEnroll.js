import React from "react";
import "./css/YoungInnovatorEnroll.css";
import "./css/YoungInnovatorCards.css";
import register from "./img/Group@2x.png";
import interview from "./img/interview.png";
import innovator from "./img/innovator.png";
import scholar from "./img/scholar.png";

const YoungInnovatorEnroll = () => {
    return (
        <div>
            <div className="youngInnovator_header">
                <h2>Enrollment Process For YIP</h2>
                <p>We are selecting 100 students from all over India based on their logical, algorithmic thinking capability and zeal towards innovation. </p>
            </div>
            <div className="youngInnovator_process">
                <div className="register">
                    <img src={register} />
                    <h4>Register</h4>
                    {/* <p>Fill the form by clicking on apply now.</p> */}
                </div>
                <div className="interview">
                    <img src={interview}/>
                    <h4>Interview</h4>
                    {/* <p>based on logical thinking and to check passion of student in technology</p> */}
                </div>
                <div className="result">
                    <img src={innovator} />
                    <h4>Result and scholarship</h4>
                    {/* <p>Selection and scholarship is announced</p> */}
                </div> 
                <div className="innovator">
                    <img src={scholar} />
                    <h4>Become a Young Innovator</h4>
                    {/* <p>Real-life problem solving to innovation</p> */}
                </div>
            </div> 
            <button
                className="youngInnovatorCards__enrollBtn"
                onClick={() => (window.location.href = "https://forms.gle/qWxhqvRL4w9yGaNg8 ")}
            >
                Apply Now
            </button>
            <h3 className="youngInnovator_para">Final selection and Scholarship will be decided based on the interview.</h3>
            
        </div>
    )
}
 
export default YoungInnovatorEnroll;