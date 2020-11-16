import React, { useState } from "react";
import "./AdminNewCurriculum.css";
import axios from "axios";

function AdminNewCurriculum() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [categoryImageURL, setCategoryImageURL] = useState("");
  const [journey, setJourney] = useState([
    {
      topic: "",
      no_of_classes: 0,
      image: null,
    },
    {
      topic: "",
      no_of_classes: 0,
      image: null,
    },
    {
      topic: "",
      no_of_classes: 0,
      image: null,
    },
    {
      topic: "",
      no_of_classes: 0,
      image: null,
    },
    {
      topic: "",
      no_of_classes: 0,
      image: null,
    },
  ]);
  const [journeyImageURL, setJourneyImageURL] = useState(["", "", "", "", ""]);

  const saveCurriculum = () => {
    const body = {
      name: categoryName,
      image: categoryImage,
      journey: journey,
    };

    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    axios
      .post("/api/course/group", body, config)
      .then((res) => console.log(res.data));

    // let bodyFormData = new FormData();

    // bodyFormData.append("categoryImage", categoryImage);

    // journey.forEach((jour, index) => {
    //   bodyFormData.append("journeyImage" + index, jour.image);
    // });

    // axios({
    //   method: "post",
    //   url: "/api/file",
    //   data: bodyFormData,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     authorization: token,
    //   },
    // })
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     //handle error
    //     console.log(err);
    //   });
  };

  const handleCategoryimageUpload = (e) => {
    if (e.target.files[0]) {
      setCategoryImage(e.target.files[0]);
      setCategoryImageURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleJourneyTopicChange = (e, index) => {
    const newJourney = [...journey];
    newJourney[index].topic = e.target.value;
    setJourney(newJourney);
  };

  const handleJourneyClassesChange = (e, index) => {
    const newJourney = [...journey];
    newJourney[index].no_of_classes = e.target.value;
    setJourney(newJourney);
  };

  const handleJourneyFileChange = (e, index) => {
    if (e.target.files[0]) {
      const newJourney = [...journey];
      newJourney[index].image = e.target.files[0];
      setJourney(newJourney);
      const newJourneyImages = [...journeyImageURL];
      newJourneyImages[index] = URL.createObjectURL(e.target.files[0]);
      setJourneyImageURL(newJourneyImages);
    }
  };

  console.log(journey);
  console.log(journeyImageURL);

  return (
    <div className="adminNewCurriculum">
      <div className="adminNewCurriculum__body">
        <div className="adminNewCurriculum__details">
          <div className="adminNewCurriculum__detailsSingle">
            <label>Category Name</label>
            <input
              type="text"
              onChange={(e) => setCategoryName(e.target.value)}
              value={categoryName}
            ></input>
          </div>
          <label>Add Illustration</label>
          <div
            className="adminNewCurriculum__illustration"
            onClick={() => document.getElementById("categoryImage").click()}
            style={{ backgroundImage: `url(${categoryImageURL})` }}
          >
            <input
              id="categoryImage"
              type="file"
              onChange={handleCategoryimageUpload}
            ></input>
            <h3>+</h3>
            <label>Attach file</label>
            <p>
              Only jpeg or png <br /> File not more than 2mb
            </p>
          </div>
        </div>
        <div className="adminNewCurriculum__journey">
          <label className="adminNewCurriculum__journeyHeader">
            Journey Section Details
          </label>
          <div className="adminNewCurriculum__journeyCardContainer">
            {journey.map((jour, index) => {
              return (
                <div className="adminNewCurriculum__journeyCard">
                  <div className="adminNewCurriculum__journeyContent">
                    <div>
                      <h3>Workshop</h3>
                      <input
                        type="text"
                        onChange={(e) => handleJourneyTopicChange(e, index)}
                        value={jour.topic}
                      ></input>
                    </div>
                    <div>
                      <h3>No. of classes</h3>
                      <input
                        type="text"
                        onChange={(e) => handleJourneyClassesChange(e, index)}
                        value={jour.no_of_classes}
                      ></input>
                    </div>
                  </div>
                  <div className="adminNewCurriculum__journeyIllustration">
                    <h3>Illustration</h3>
                    <div
                      className="adminNewCurriculum__journeyIllustrationCard"
                      onClick={() =>
                        document.getElementById("journeyImage" + index).click()
                      }
                      style={{
                        backgroundImage: `url(${journeyImageURL[index]})`,
                      }}
                    >
                      <input
                        type="file"
                        onChange={(e) => handleJourneyFileChange(e, index)}
                        id={"journeyImage" + index}
                      ></input>
                      <h3>+</h3>
                      <label>Attach file</label>
                      <p>jpeg or png only</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <button
        className="adminNewCurriculum__saveButton"
        onClick={saveCurriculum}
      >
        Save Details
      </button>
    </div>
  );
}

export default AdminNewCurriculum;
