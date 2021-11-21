import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import FormInput from "../../Components/FormInputs/FormInputs";
import axios from "axios";

const Register = (props) => {
  let navigate = useNavigate();

  const [creds, setCreds] = useState({
    name: "",
    email: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const [msgError, setmsgError] = useState("");

  const inputHandler = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    reg();
  };

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Username",
      value: "",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      value: "",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "city",
      type: "text",
      placeholder: "City",
      value: "",
      errorMessage:
        "We are currently available only in Valencia, Madrid or Zaragoza (case sensitive)",
      label: "City",
      pattern: "Valencia|Madrid|Zaragoza",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      value: "",
      errorMessage: "Password should be 4-20 characters",
      label: "Password",
      pattern: "^.{4,20}$",
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      value: "",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: creds.password,
      required: true,
    },
  ];

  const reg = async () => {
    let body = {
      name: creds.name,
      email: creds.email,
      city: creds.city,
      password: creds.password,
    };

    try {
      let res = await axios.post(
        "https://drs-proyecto-api.herokuapp.com/users/signup",
        body
      );
      setCreds(res.data);
      setmsgError("New User Registered");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setmsgError("Cannot Register User");
    }
  };

  if (props.credentials.token !== "") {
    navigate("/");

    return (
      <div className="view">
        <div className="container">
          <div>You are already registered. Redirecting...</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="view">
        <div className="container">
          <div className="registerInfo">
            <form onSubmit={handleSubmit}>
              <h1>Register</h1>
              {inputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={creds[input.name]}
                  autoComplete="on"
                  onChange={inputHandler}
                />
              ))}
              <button className="btnOrange">Submit</button>
            </form>
            <div>{msgError}</div>
          </div>
        </div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
}))(Register);
