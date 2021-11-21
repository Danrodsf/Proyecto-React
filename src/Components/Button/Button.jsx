import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UPDATEFILTER, SETSTATE } from "../../redux/types";

const Button = (props) => {
  const navigate = useNavigate();

  const next = () => {
    if (props.state.change >= 1) {
      let data = {
        change: 0,
      };
      props.dispatch({ type: SETSTATE, payload: data });
      props.dispatch({ type: UPDATEFILTER, payload: "" });
      navigate(props.url);
    } else {
      props.dispatch({ type: UPDATEFILTER, payload: "" });
      navigate(props.url);
    }
  };

  return (
    <div className="btn" onClick={() => next()}>
      {props.view}
    </div>
  );
};

export default connect((state) => ({
  credentials: state.credentials,
  state: state.state,
  data: state.data,
}))(Button);
