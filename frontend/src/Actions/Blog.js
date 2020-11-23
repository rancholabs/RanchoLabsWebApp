import axios from "axios";

import { BLOG_REQUEST, BLOG_SUCCESS, BLOG_FAIL } from "../Constants/Blog";

export const blogList = () => async (dispatch) => {
  dispatch({
    type: BLOG_REQUEST,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  await axios
    .get("/api/blog/", config)
    .then((res) => {
      dispatch({
        type: BLOG_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: BLOG_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};
