import React from "react";
import "../AboutUs/css/AboutUsThoughtprocess.css";
import t1 from "../AboutUs/img/tp1.png";
import t2 from "../AboutUs/img/tp2.png";
import t3 from "../AboutUs/img/tp3.png";
import bg1 from "../AboutUs/img/bg1.png";
import bg2 from "../AboutUs/img/bg2.png";
import listicon from "../AboutUs/img/listicon.png";
import "./css/YoungInnovatorMethodology.css";

const thoughts = [
  {
    img: t1,
    title: "Learn",
    quote: "“Every expert was once a beginner”.",
    desc:
      "Students learn via one on one live lectures taught by highly qualified teachers. Each class is designed based on the curiosity and interests of the student.",
    mdesc:
      "We believe in providing the students a platform of exposure and practical knowledge.",
  },
  {
    img: t2,
    title: "Build",
    quote: "“Teach me and I may remember. Involve me and I learn”.",
    desc:
      "Each class is followed by a live project to maximize the student’s learning. Master the skills that you’ve learnt by building projects, the fun way.",
    mdesc:
      "We believe in providing the students a platform of exposure and practical knowledge.",
  },
  {
    img: t3,
    title: "Innovate",
    quote: "“Innovation distinguishes between a leader and a follower”.",
    desc:
      "Do you have an idea? At RanchoLabs, students acquire the right skills and experiences by learning and building to solve a real-life problem.",
    mdesc:
      "We believe in providing the students a platform of exposure and practical knowledge.",
  },
];

const Tpitem = (props) => {
  return (
    <div className="tp-item row" style={{ justifyContent: "center" }}>
      <div className="col-md-5 tp-item-image">
        <img src={props.img} alt={props.title} className="img-fluid"></img>
      </div>
      <div className="c-line">
        <div className="c-circle">
          <img src={listicon} alt="" width="100%" height="100%" />
        </div>
      </div>
      <div className="col-md-5 tp-item-info">
        <div className="tp-item-title">{props.title}</div>
        <div className="tp-item-desc">
          <span style={{ fontStyle: "italic" }}>{props.quote}</span> <br />
          {props.desc}
        </div>
      </div>
    </div>
  );
};

const MTpitem = (props) => {
  return (
    <div className="mtp-item row mx-0">
      <div className="c-line"></div>
      <div className="c-circle">
        <img src={listicon} alt="" width="100%" height="100%" />
      </div>
      <div className="col mtp-item-info pr-0">
        <div className="mtp-item-image">
          <img src={props.img} alt={props.title} className="img-fluid"></img>
        </div>
        <div className="mtp-item-title">{props.title}</div>
        <div className="mtp-item-desc">
          <span style={{ fontStyle: "italic" }}>{props.quote}</span> <br />
          {props.desc}
        </div>
      </div>
    </div>
  );
};

const YoungInnovatorMethodology = () => {
  return (
    <div className="aboutus-thoughtprocess">
      <div className="tp-title youngInnovatorMethodology__title">
        Our Unique Methodology
      </div>
      <div className="tp-desc youngInnovatorMethodology__titleContent">
        We believe in providing the students a platform of exposure and
        practical knowledge. We want the students to understand and enjoy our
        courses. Let's have a glimpse of the thought process.
      </div>
      <div className="tp-items">
        {thoughts.map((t) => {
          return (
            <Tpitem
              key={t.title}
              img={t.img}
              title={t.title}
              quote={t.quote}
              desc={t.desc}
            />
          );
        })}
      </div>
      <div className="mtp-items">
        {thoughts.map((m) => {
          return (
            <MTpitem
              key={m.title}
              img={m.img}
              title={m.title}
              quote={m.quote}
              desc={m.desc}
            />
          );
        })}
      </div>
      {/* <div className="tp-backgrounds">
                <img src={bg1} alt="" style={{left:"0"}}></img>
                <img src={bg2} alt="" style={{right:"0"}}></img>
            </div> */}
    </div>
  );
};

export default YoungInnovatorMethodology;
