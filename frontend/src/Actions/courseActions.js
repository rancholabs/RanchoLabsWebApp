import axios from "axios";

import {
  COURSE_GROUP_FAIL,
  COURSE_GROUP_SUCCESS,
  COURSE_GROUP_REQUEST,
  COURSE_GROUP_LIST_REQUEST,
  COURSE_GROUP_LIST_SUCCESS,
  COURSE_GROUP_LIST_FAIL,
} from "../Constants/courseConstants";

export const courseGroups = () => async (dispatch) => {
  try {
    dispatch({
      type: COURSE_GROUP_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("/api/course/group/", config);

    dispatch({
      type: COURSE_GROUP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_GROUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const courseGroupsList = () => async (dispatch) => {
  dispatch({
    type: COURSE_GROUP_LIST_REQUEST,
  });

  const userInfo = localStorage.getItem("userInfo");
  const token = userInfo ? JSON.parse(userInfo).token : "";
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  };

  Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
  };

  await axios
    .get("/api/course/group/courseList", config)
    .then((res) => {
      // var newArray = [...res.data];
      // newArray.sort((a, b) => {
      //   if (a.name < b.name) return -1;
      //   else if (a.name > b.name) return 1;
      //   else return 0;
      // });
      // var courseArray = [];
      // courseArray[0] = newArray.filter((cg) => cg.name === "Recommended")[0];
      // courseArray[1] = newArray.filter((cg) => cg.name === "Programming")[0];
      // courseArray[2] = newArray.filter((cg) => cg.name === "Robotics")[0];
      // courseArray[3] = newArray.filter(
      //   (cg) => cg.name === "Artificial Intelligence"
      // )[0];
      console.log(res.data);
      dispatch({
        type: COURSE_GROUP_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: COURSE_GROUP_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};

export const courseActiveGroupsList = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const data = await axios
    .get("/api/course/group/courseList", config)
    .then((res) => res.data)
    .catch((error) => []);

  return data;
};
