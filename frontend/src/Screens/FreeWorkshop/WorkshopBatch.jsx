import React, { useState } from "react";
import "./css/WorkshopBatch.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faDotCircle } from "@fortawesome/free-regular-svg-icons";

const WorkshopBatchItem = ({
  batch,
  durationPerWeek,
  noOfWeeks,
  isSelected,
  clickHandler,
  batchDateTimeString,
}) => {
  return (
    <div className="col-md-6">
      <div
        className="workshop-batch-item"
        onClick={() => (!isSelected ? clickHandler(batch) : "")}
      >
        <div>
          {!isSelected ? (
            <div>
              <FontAwesomeIcon
                className="icon"
                icon={faCircle}
                size="3x"
                color="#3CFAFF"
              />
            </div>
          ) : (
            <div>
              <FontAwesomeIcon
                className="icon"
                icon={faDotCircle}
                size="3x"
                color="#3CFAFF"
              />
            </div>
          )}

          <div className="name">{batchDateTimeString}</div>
        </div>
      </div>
    </div>
  );
};

const WorkshopBatches = ({ batch, schoolBatches }) => {
  const { durationInHours, durationPerWeek, noOfWeeks, batches } = batch;
  const [WorkshopBatch, setWorkshopBatch] = useState(
    batches.length ? batches[0] : ""
  );
  const clickHandler = (batc) => {
    setWorkshopBatch(batc);
  };
  const goToSignUp = () => {
    if (WorkshopBatch._id) {
      const urlString = `/freeclass?loginfor=workshop&school=${WorkshopBatch.school}&batch=${WorkshopBatch._id}&course=${WorkshopBatch.courseId}`;
      window.location.href = urlString;
    } else {
      alert("Select a batch first!");
    }
  };
  return (
    <>
      {schoolBatches.length > 0 && (
        <div className="workshop-batch" id="batches">
          <div className="name">PICK A BATCH</div>
          <div className="row">
            {schoolBatches.map((batch, bi) => {
              let batchDateTimeString = "";

              let from = new Date(batch.singleDate);
              let listFrom = from.toUTCString().split(" ");

              let to = new Date(batch.doubleDate);
              let listTo = to.toUTCString().split(" ");

              let hours =
                ((parseInt(batch.singleTime.toString().split(":")[0]) + 11) %
                  12) +
                1;
              var suffix =
                parseInt(batch.singleTime.toString().split(":")[0]) >= 12
                  ? "PM"
                  : "AM";

              let hoursEnd =
                ((parseInt(batch.singleTime.toString().split(":")[0]) +
                  2 +
                  11) %
                  12) +
                1;
              var suffixEnd =
                batch.singleTime.toString().split(":")[0] + 2 >= 12
                  ? "PM"
                  : "AM";

              batchDateTimeString =
                listFrom[1] +
                " " +
                listFrom[2] +
                " - " +
                (listTo[1] + " " + listTo[2]) +
                " | " +
                hours +
                suffix +
                " to " +
                hoursEnd +
                suffixEnd +
                " IST";
              return (
                <WorkshopBatchItem
                  key={bi}
                  batch={batch}
                  batchDateTimeString={batchDateTimeString}
                  durationPerWeek={durationPerWeek}
                  noOfWeeks={noOfWeeks}
                  isSelected={batch === WorkshopBatch}
                  clickHandler={clickHandler}
                />
              );
            })}
          </div>
          <div className="">
            <div className="btn enroll" onClick={goToSignUp}>
              ENROLL NOW
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkshopBatches;
