import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { validateToken } from "../../Actions/userAction";
import queryString from "query-string";
import ResetPass from "./ResetPass";

const ValidateResetLink = ({ location }) => {
  const { isValid, error } = useSelector((state) => state.userValidateToken);
  const { token } = useParams();
  const dispatch = useDispatch();

  const params = queryString.parse(location.search);

  console.log(error);
  useEffect(() => {
    dispatch(validateToken(params.account));
  }, []);
  return (
    <div>
      {isValid ? (
        <ResetPass />
      ) : isValid !== undefined ? (
        <div className="text-danger text-center">{error}</div>
      ) : (
        <div className="text-warning">Loading...</div>
      )}
    </div>
  );
};

export default ValidateResetLink;
