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
      title: "Improves Logical Thinking",
    },
    {
      id: 2,
      img: problemsolving,
      title: "Sharpens Problem Solving",
    },
    {
      id: 3,
      img: focus,
      title: "Increases Focus And Concentration",
    },
    {
      id: 4,
      img: imagination,
      title: "Fosters Imagination And Creativity",
    },
    {
      id: 5,
      img: enhance,
      title: "Enhances Their Ability To Build",
    },
    {
      id: 6,
      img: inventor,
      title: "Turn Them Into Real Inventors",
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
