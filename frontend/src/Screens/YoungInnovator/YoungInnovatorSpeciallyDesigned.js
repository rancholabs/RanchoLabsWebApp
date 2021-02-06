import React from "react";
import "./css/YoungInnovatorSpeciallyDesigned.css";
import thinking from "./img/thinking.png";
import coding from "./img/coding.png";
import gamedev from "./img/gamedev.png";
import appdev from "./img/appdev.png";
import robotics from "./img/Robotics.jpg";

function YoungInnovatorSpeciallyDesigned() {
  const cards = [
    {
      id: 1,
      img: thinking,
      title: "Logical Thinking",
    },
    {
      id: 2,
      img: coding,
      title: "Coding Skills",
    },
    {
      id: 3,
      img: gamedev,
      title: "Game Development",
    },
    {
      id: 4,
      img: appdev,
      title: "App Development",
    },
    {
      id: 5,
      img: robotics,
      title: "Robotics",
    }
  ];
  return (
    <div className="youngInnovatorSpeciallyDesigned">
      <h3>
        Specially Designed Curriculum To Create <br /> Young Innovators
      </h3>
      <div className="youngInnovatorSpeciallyDesigned__cards">
        {cards.map((card) => {
          return (
            <div
              key={"cardspecial" + card.id}
              className="youngInnovatorSpeciallyDesigned__card"
            >
              <img class={"img"+card.id} src={card.img} />
              <p class={"para"+card.id}>{card.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default YoungInnovatorSpeciallyDesigned;
