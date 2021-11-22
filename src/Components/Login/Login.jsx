import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { SETSTATE, INITSTATE, LOGIN, LOGOUT } from "../../redux/types";
import Button from "../Button/Button";

const Login = (props) => {
  const navigate = useNavigate();

  const [msgError, setmsgError] = useState("");
  const [creds, setCreds] = useState({ email: "", password: "" });

  const inputHandler = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn();
  };

  const loginBtn = () => {
    let data = {
      change: 0,
    };

    props.dispatch({ type: SETSTATE, payload: data });
  };

  const logIn = async () => {
    navigate("/");

    let data = {
      change: 3,
    };

    props.dispatch({ type: SETSTATE, payload: data });

    let body = {
      email: creds.email,
      password: creds.password,
    };

    try {
      let res = await axios.post(
        "https://drs-proyecto-api.herokuapp.com/users/signin",
        body
      );

      let datos = res.data;
      props.dispatch({ type: LOGIN, payload: datos });
    } catch (error) {
      setmsgError("Cannot Log In, verify that email and password are correct");
    }

    data = {
      change: 0,
    };

    props.dispatch({ type: SETSTATE, payload: data });
  };

  const logOut = () => {
    props.dispatch({ type: LOGOUT });
    props.dispatch({ type: INITSTATE });
    setmsgError("");
    navigate("/");
  };

  if (props.state?.change !== "") {
    if (props.credentials?.token !== "") {
      return (
        <div className="loginView">
          <div className="logged">
            LOGGED IN AS {props.credentials?.user?.name.toUpperCase()}
          </div>
          <div className="btn" onClick={() => logOut()}>
            LOG OUT
          </div>
          <div className="profile">
            <Button view="PROFILE" url="/profile" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="loginView">
          <form className="inputs" onSubmit={handleSubmit}>
            <h5 className="error">{msgError}</h5>
            <input
              type="email"
              name="email"
              title="email"
              onChange={inputHandler}
              lenght="40"
              placeholder="email"
            />
            <input
              type="password"
              name="password"
              title="Password should be 4-20 characters"
              onChange={inputHandler}
              lenght="30"
              pattern="^.{4,20}$"
              placeholder="Password"
            />
            <button className="btn">LOG IN</button>
          </form>
        </div>
      );
    }
  } else {
    return (
      <div className="btn" onClick={() => loginBtn()}>
        LOG IN
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
  state: state.state,
}))(Login);
