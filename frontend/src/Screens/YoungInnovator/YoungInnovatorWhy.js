import React from "react";
import problemsolving from "./img/problemsolving.png";
import thinking from "./img/logicalThinking.png";
import focus from "./img/focus.png";
import ideas from "./img/ideas2.png";
import dreamReality from "./img/dreamReality.png";
import innovation from "./img/innovation.png";

import "./css/YoungInnovatorWhy.css";

function YoungInnovatorWhy() {
  const gridData = [
    {
      id: 1,
      img: thinking,
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
      img: dreamReality,
      title: "Fosters Imagination And Creativity",
    },
    {
      id: 5,
      img: ideas,
      title: "Enhances Their Ability To Build",
    },
    {
      id: 6,
      img: innovation,
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
              <img src={card.img} className={"img-".concat(card.id)} />
              <p className={"para".concat(card.id)}>{card.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default YoungInnovatorWhy;
