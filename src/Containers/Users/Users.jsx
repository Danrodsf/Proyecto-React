import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { UPDATEUSERS, SETSTATE } from "../../redux/types";
import Select from "../../Components/Select/Select";
import FormInput from "../../Components/FormInputs/FormInputs";

const GetUsers = (props) => {
  let token = {
    headers: { Authorization: `Bearer ${props.credentials.token}` },
  };

  const [users, setUsers] = useState([]);
  const [msgError, setmsgError] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    city: "",
  });

  const inputHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(props.state.id);
  };

  useEffect(() => {
    getAllUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (props.data.filter.select) {
      switch (props.data.filter.select) {
        case "id":
          getUsersById(parseInt(props.data.filter.filter));
          break;
        case "city":
          getUsersByCity(props.data.filter.filter);
          break;

        default:
          break;
      }
    } else if (props.data.filter[0]) {
      setUsers(props.data.filter);
    } else {
      setUsers(props.data.users);
      setmsgError("");
    }
  }, [props.data.filter, props.data.users]); // eslint-disable-line react-hooks/exhaustive-deps

  const getAllUsers = async () => {
    try {
      let res = await axios.get(
        "https://drs-proyecto-api.herokuapp.com/users/",
        token
      );
      setUsers(res.data);
      props.dispatch({ type: UPDATEUSERS, payload: res.data });
    } catch (error) {
      setmsgError("Cannot get users");
    }
  };

  const getUsersById = async (id) => {
    try {
      let res = await axios.get(
        `https://drs-proyecto-api.herokuapp.com/users/${id}`,
        token
      );
      if (res.data.length === 0) {
        setmsgError(`Order not Found`);
      } else {
        setUsers([res.data]);
        setmsgError("User Found");
      }
    } catch (error) {
      setmsgError("Cannot get user");
    }
  };

  const getUsersByCity = async (city) => {
    try {
      let res = await axios.get(
        `https://drs-proyecto-api.herokuapp.com/users/city/${city}`,
        token
      );
      setUsers(res.data);
      setmsgError("Users Found");
    } catch (error) {
      setmsgError("Cannot get user");
    }
  };

  const updateUser = async (id) => {
    let body = {
      name: data.name,
      email: data.email,
      city: data.city,
    };
    try {
      await axios.put(
        `https://drs-proyecto-api.herokuapp.com/users/${id}`,
        body,
        token
      );
      setmsgError("User Updated");
      returnInitalState();
    } catch (error) {
      setmsgError("User Couldn't be Updated");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `https://drs-proyecto-api.herokuapp.com/users/${id}`,
        token
      );
      setmsgError("User Deleted");
    } catch (error) {
      setmsgError("Cannot get user");
    }
  };

  const deleteAlert = async (e) => {
    if (window.confirm("Are you sure you wish to delete this User?")) {
      deleteUser(e);
      getAllUsers();
    } else {
      return;
    }
  };

  const editBtn = (id) => {
    let data = {
      change: 1,
      id: id,
    };
    props.dispatch({ type: SETSTATE, payload: data });
  };

  const returnInitalState = () => {
    let data = {
      change: 0,
    };
    props.dispatch({ type: SETSTATE, payload: data });
    setmsgError("");
    getAllUsers();
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
        "We are currently available only in Valencia, Madrid or Zaragoza (Case sensitive)",
      label: "City",
      pattern: "Valencia|Madrid|Zaragoza",
      required: true,
    },
  ];

  const formatDate = (initialDate) => {
    let splitDate = initialDate.split(/[- : T .]/);
    let arrayDate = [splitDate[2], splitDate[1], splitDate[0]];
    let formattedDate = arrayDate.join("-");
    return formattedDate;
  };

  if (props.credentials?.user?.admin) {
    if (users[0]?.id) {
      if (props.state.change === 1) {
        return (
          <div className="view">
            <div className="container">
              <div className="editInfo">
                <form onSubmit={handleSubmit}>
                  <h1>Edit User</h1>
                  {inputs.map((input) => (
                    <FormInput
                      key={input.id}
                      {...input}
                      onChange={inputHandler}
                    />
                  ))}
                  <button className="btnOrange">Submit</button>
                  <div
                    className="btnOrange"
                    onClick={() => returnInitalState()}
                  >
                    go back
                  </div>
                </form>
                <div>{msgError}</div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="view">
            <div className="container">
              <div className="userNav">
                <Select />
                <div className="error">{msgError}</div>
              </div>
              <div className="userInfo">
                {users.map((user) => {
                  return (
                    <div key={user.id} className="usersContainer">
                      <div className="users">
                        <h2>{user?.name}</h2>
                        <h4>User Number: {user?.id}</h4>
                        <p>Email: {user?.email}</p>
                        <p>Register Date: {formatDate(user?.createdAt)}</p>
                        <p>Last Update: {formatDate(user?.updatedAt)}</p>
                      </div>
                      <div className="buttons">
                        <div
                          className="btnOrange"
                          onClick={() => editBtn(user.id)}
                        >
                          Update
                        </div>
                        <div
                          className="btnOrange"
                          onClick={() => deleteAlert(user.id)}
                        >
                          Delete
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }
    } else if (!msgError) {
      return (
        <div className="view">
          <div className="container">
            <div className="dank-ass-loader">
              <div className="row">
                <div className="arrow up outer outer-18"></div>
                <div className="arrow down outer outer-17"></div>
                <div className="arrow up outer outer-16"></div>
                <div className="arrow down outer outer-15"></div>
                <div className="arrow up outer outer-14"></div>
              </div>
              <div className="row">
                <div className="arrow up outer outer-1"></div>
                <div className="arrow down outer outer-2"></div>
                <div className="arrow up inner inner-6"></div>
                <div className="arrow down inner inner-5"></div>
                <div className="arrow up inner inner-4"></div>
                <div className="arrow down outer outer-13"></div>
                <div className="arrow up outer outer-12"></div>
              </div>
              <div className="row">
                <div className="arrow down outer outer-3"></div>
                <div className="arrow up outer outer-4"></div>
                <div className="arrow down inner inner-1"></div>
                <div className="arrow up inner inner-2"></div>
                <div className="arrow down inner inner-3"></div>
                <div className="arrow up outer outer-11"></div>
                <div className="arrow down outer outer-10"></div>
              </div>
              <div className="row">
                <div className="arrow down outer outer-5"></div>
                <div className="arrow up outer outer-6"></div>
                <div className="arrow down outer outer-7"></div>
                <div className="arrow up outer outer-8"></div>
                <div className="arrow down outer outer-9"></div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="view">
          <div className="container">{msgError}</div>
        </div>
      );
    }
  } else {
    return (
      <div className="view">
        <div className="container">You need authorization to show Users</div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
  state: state.state,
  data: state.data,
}))(GetUsers);
