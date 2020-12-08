import axios from "axios";
import {
  INSTRUCTOR_INFO_REQUEST,
  INSTRUCTOR_INFO_SUCCESS,
  INSTRUCTOR_INFO_FAIL,
  INSTRUCTOR_SCHEDULE_FAIL,
  INSTRUCTOR_SCHEDULE_SUCCESS,
  INSTRUCTOR_SCHEDULE_REQUEST,
  INSTRUCTOR_BATCH_SUCCESS,
  INSTRUCTOR_NOTE,
  INSTRUCTOR_UPDATE_REQUEST,
  INSTRUCTOR_UPDATE_SUCCESS,
  INSTRUCTOR_UPDATE_FAIL,
  INSTRUCTOR_UPDATEBATCHCLASS_FAIL,
  INSTRUCTOR_UPDATEBATCHCLASS_SUCCESS,
  INSTRUCTOR_UPDATEBATCHCLASS_REQUEST,
  INSTRUCTOR_CLASSLINK_UPDATE_REQUEST,
  INSTRUCTOR_CLASSLINK_UPDATE_SUCCESS,
  INSTRUCTOR_CLASSLINK_UPDATE_FAIL,
} from "../Constants/Instructor";

export const instructorInfo = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: INSTRUCTOR_INFO_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: userInfo.token,
      },
    };

    const { data } = await axios.get("/api/instructor", config);

    dispatch({
      type: INSTRUCTOR_INFO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INSTRUCTOR_INFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const instructorSchedule = (date, batch) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: INSTRUCTOR_SCHEDULE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: userInfo.token,
      },
    };

    const { data } = await axios.post(
      "/api/instructor/schedule",
      { date, batch },
      config
    );

    dispatch({
      type: INSTRUCTOR_SCHEDULE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INSTRUCTOR_SCHEDULE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const instructorUpdate = (update) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INSTRUCTOR_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: userInfo.token,
      },
    };

    console.log(update);

    const { data } = await axios.put("/api/instructor/update", update, config);

    dispatch({
      type: INSTRUCTOR_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INSTRUCTOR_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const instructorUpdateBatchClass = (update, batchId, classId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: INSTRUCTOR_UPDATEBATCHCLASS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: userInfo.token,
      },
    };

    const { data } = await axios.put(
      `/api/batch/${batchId}/${classId}`,
      update,
      config
    );

    dispatch({
      type: INSTRUCTOR_UPDATEBATCHCLASS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INSTRUCTOR_UPDATEBATCHCLASS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const instructorUpdateBatchProject = (
  update,
  batchId,
  projectId
) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: userInfo.token,
      },
    };

    const { data } = await axios.put(
      `/api/batch/project/${batchId}/${projectId}`,
      update,
      config
    );
  } catch (error) {}
};

export const updateClassLink = (updates, classId) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: INSTRUCTOR_CLASSLINK_UPDATE_REQUEST,
  });

  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: userInfo.token,
    },
  };

  await axios
    .get(`/api/course/class/${classId}`, config, updates)
    .then((res) => {
      dispatch({
        type: INSTRUCTOR_CLASSLINK_UPDATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: INSTRUCTOR_CLASSLINK_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};

export const instructorBatch = (b) => (dispatch) => {
  dispatch({ type: INSTRUCTOR_BATCH_SUCCESS, payload: b });
};

export const instructorNote = (note) => (dispatch) => {
  dispatch({
    type: INSTRUCTOR_NOTE,
    payload: note,
  });
  localStorage.setItem("instructotNote", JSON.stringify(note));
};
