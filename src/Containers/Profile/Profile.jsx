import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { SETSTATE, UPDATE_USER } from "../../redux/types";
import ProfOrders from "../../Components/ProfOrders/ProfOrders";
import FormInput from "../../Components/FormInputs/FormInputs";
import axios from "axios";

const Profile = (props) => {
  let token = {
    headers: { Authorization: `Bearer ${props.credentials.token}` },
  };

  //Hooks
  const [creds, setCreds] = useState(props.credentials.user);
  const [msgError, setmsgError] = useState("");

  //Handlers
  const profileHandler = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    edit();
  };

  useEffect(() => {
    setCreds(props.credentials.user);
  }, [props.credentials]);

  const editBtn = () => {
    let data = {
      change: 1,
    };

    props.dispatch({ type: SETSTATE, payload: data });
  };

  const returnInitalState = () => {
    let data = {
      change: 0,
    };

    props.dispatch({ type: SETSTATE, payload: data });
    setmsgError("");
  };

  const edit = async () => {
    let body = {
      name: creds.name,
      email: creds.email,
      city: creds.city,
    };

    try {
      let res = await axios.put(
        `https://drs-proyecto-api.herokuapp.com/users/${props.credentials.user.id}`,
        body,
        token
      );
      setmsgError(res.data.message);

      setTimeout(() => {
        returnInitalState();
        props.dispatch({ type: UPDATE_USER, payload: creds });
      }, 1000);
    } catch (error) {
      setmsgError("Unable to update User");
      return;
    }
  };

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9 ]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "city",
      type: "text",
      placeholder: "City",
      errorMessage:
        "We are currently available only in Valencia, Madrid or Zaragoza",
      label: "City",
      pattern: "Valencia|valencia|Madrid|madrid|Zaragoza|zaragoza",
      required: true,
    },
  ];

  if (props.credentials?.user?.admin && props.state?.change !== "") {
    if (props.state?.change === 1) {
      return (
        <div className="view">
          <div className="container">
            <div className="profiles">
              <form onSubmit={handleSubmit}>
                <h1>Update Info</h1>
                {inputs.map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={creds[input.name]}
                    onChange={profileHandler}
                  />
                ))}
                <button className="btnOrange">Submit</button>
              </form>
              <div>{msgError}</div>
            </div>
            <div className="profileOrders">
              <ProfOrders />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="view">
          <div className="container">
            <div className="profiles">
              <h2>PERFIL DE ADMINISTRADOR</h2>
              <h3>{props.credentials?.user?.name}</h3>
              <div>
                <p>Email:</p>
                {props.credentials?.user?.email}
              </div>
              <div>
                <p>City:</p>
                {props.credentials?.user?.city}
              </div>
              <div>
                <p>Registered since:</p>
                {props.credentials?.user?.createdAt}
              </div>
              <div>
                <p>Last Update:</p>
                {props.credentials?.user?.updatedAt}
              </div>
              <div className="btnOrange" onClick={() => editBtn()}>
                Update Info
              </div>
              <div>{msgError}</div>
            </div>
            <div className="profileOrders">
              <ProfOrders />
            </div>
          </div>
        </div>
      );
    }
  } else if (props.credentials?.token !== "" && props.state?.change !== "") {
    if (props.state?.change === 1) {
      return (
        <div className="view">
          <div className="container">
            <div className="profiles">
              <form onSubmit={handleSubmit}>
                <h1>Update Info</h1>
                {inputs.map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={creds[input.name]}
                    onChange={profileHandler}
                  />
                ))}
                <button className="btnOrange">Submit</button>
              </form>
              <div>{msgError}</div>
            </div>
            <div className="profileOrders">
              <ProfOrders />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="view">
          <div className="container">
            <div className="profiles">
              <div>PERFIL DE USUARIO</div>
              <div>
                <p>Name:</p>
                {props.credentials?.user?.name}
              </div>
              <div>
                <p>Email:</p>
                {props.credentials?.user?.email}
              </div>
              <div>
                <p>City:</p>
                {props.credentials?.user?.city}
              </div>
              <div>
                <p>Registered since:</p>
                {props.credentials?.user?.createdAt}
              </div>
              <div>
                <p>Last Update:</p>
                {props.credentials?.user?.updatedAt}
              </div>
              <div className="btnOrange" onClick={() => editBtn()}>
                Update Info
              </div>
              <div>{msgError}</div>
            </div>
            <div className="profileOrders">
              <ProfOrders />
            </div>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="view">
        <div className="container">You are not logged in</div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
  state: state.state,
}))(Profile);
