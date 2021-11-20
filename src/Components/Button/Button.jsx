import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UPDATEFILTER } from "../../redux/types";

const Button = (props) => {
  const navigate = useNavigate();

  const next = () => {
    props.dispatch({ type: UPDATEFILTER, payload: "" });
    navigate(props.url);
  };

  return (
    <div className="btn" onClick={() => next()}>
      {props.view}
    </div>
  );
};

export default connect((state) => ({
  credentials: state.credentials,
  data: state.data,
}))(Button);
