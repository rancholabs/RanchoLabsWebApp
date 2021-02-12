import React from "react";
import "./css/YoungInnovatorVideo.css";

function YoungInnovatorVideo() {
  return (
    <div className="youngInnovatorVideo">
      <div className="youngInnovatorVideo__video">
        {window.screen.width <= 600 ? <iframe height="200" width={window.screen.width} className="iframe"
        src='https://www.youtube.com/embed/7wcJ5K-uPZo'>
      </iframe> : <iframe className="iframe" height="400" width={window.screen.width} 
        src='https://www.youtube.com/embed/7wcJ5K-uPZo'>
      </iframe> }</div>
      <div className="youngInnovatorVideo__body">
        <h3>The Need of The Hour</h3>
        <hr />
        <p>
          The future is all about automation, programming, robots and computers.
          It’s time to take the right step forward now.
        </p>
      </div>
    </div>
  );
}

export default YoungInnovatorVideo;
