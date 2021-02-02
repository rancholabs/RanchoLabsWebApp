import React from "react";
import liveClass from "./img/liveclass.png";
import problemsolving from "./img/problemsolving.png";
import focus from "./img/focus.png";
import enhance from "./img/enhance.png";
import imagination from "./img/imagination.png";
import inventor from "./img/inventor.png";

import "./css/YoungInnovatorWhy.css";

function YoungInnovatorWhy() {
  const gridData = [
    {
      id: 1,
      img: liveClass,
      title: "Lays strong foundation in technological trends",
    },
    {
      id: 2,
      img: problemsolving,
      title: "Ubiquitous knowledge facilitators to ease all your doubts",
    },
    {
      id: 3,
      img: focus,
      title: "Project-based learning to get real time understanding",
    },
    {
      id: 4,
      img: imagination,
      title: "Innovation-oriented approach to attain critical skills",
    },
    {
      id: 5,
      img: enhance,
      title: "Enriches students to address real-life solutions",
    },
    {
      id: 6,
      img: inventor,
      title: "Provides future-proof skill sets for students",
    },
  ];
  return (
    <div className="youngInnovatorWhy">
      <h3>Why This Program?</h3>
      <div className="youngInnovatorWhy__grid">
        {gridData.map((card) => {
          return (
            <div key={"card" + card.id} className="youngInnovatorWhy__card">
              <img src={card.img} />
              <p>{card.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default YoungInnovatorWhy;
