import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { UPDATEUSERS } from "../../redux/types";
import Select from "../../Components/Select/Select";

const GetUsers = (props) => {
  let token = {
    headers: { Authorization: `Bearer ${props.credentials.token}` },
  };

  //HOOKS
  const [users, setUsers] = useState([]);
  const [msgError, setmsgError] = useState("");

  //UseEffect

  useEffect(() => {
    if (props.data.filter.filter) {
      return;
    } else {
      setTimeout(() => {
        getAllUsers();
      }, 2000);
    }
  }, []);

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
  }, [props.data.filter, props.data.users]);

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
      setUsers([res.data]);
      setmsgError("User Found");
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

  const deleteAlert = (e) => {
    if (window.confirm("Are you sure you wish to delete this User?")) {
      deleteUser(e);
      getAllUsers();
    } else {
      return;
    }
  };

  if (props.credentials?.user?.admin) {
    if (users[0]?.id) {
      return (
        <div className="view">
          <div className="container">
            <div className="userNav">
              <Select />
            </div>
            <div className="userInfo">
              {users.map((user) => {
                return (
                  <div key={user.id} className="users">
                    <h2>{user?.name}</h2>
                    <h4>User Number: {user?.id}</h4>
                    <p>Email: {user?.email}</p>
                    <p>Register Date: {user?.createdAt}</p>
                    <p>Last Update: {user?.updatedAt}</p>
                    <div
                      className="btnOrange"
                      onClick={() => deleteAlert(user.id)}
                    >
                      Delete
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
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
  data: state.data,
}))(GetUsers);
