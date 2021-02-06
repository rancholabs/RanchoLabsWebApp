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
                    <div className="register-below">
                        <img src={register} />
                        <h4>Register</h4>
                    </div>
                </div>
                <div className="interview">
                    <div className="interview-above"></div>
                    <div className="interview-below">
                        <img src={interview} />
                        <h4>Interview</h4>
                    </div>
                </div>
                <div className="result">
                    <div className="result-above"></div>
                    <div className="result-below">
                        <img src={innovator} />
                        <h4>Result and scholarship</h4>
                    </div>
                </div>
                <div className="innovator">
                    <div className="innovator-above"></div>
                    <div className="innovator-below">
                        <img src={scholar} />
                        <h4>Become a Young Innovator</h4>
                    </div>
                </div>
            </div>
            <button
                className="youngInnovatorCards__enrollBtn"
                onClick={() => (window.location.href = "https://forms.gle/qWxhqvRL4w9yGaNg8 ")}
            >
                Apply Now
            </button>

        </div>
    )
}

export default YoungInnovatorEnroll;