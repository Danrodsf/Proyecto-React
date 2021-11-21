import axios from "axios";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { UPDATEORDERS, SETSTATE } from "../../redux/types";
import Select from "../../Components/Select/Select";
import FormInput from "../../Components/FormInputs/FormInputs";

const GetOrders = (props) => {
  let token = {
    headers: { Authorization: `Bearer ${props.credentials.token}` },
  };

  const [orders, setOrders] = useState([]);
  const [msgError, setmsgError] = useState("");
  const [data, setData] = useState({
    userId: "",
    movieId: "",
  });

  const inputHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateOrder(props.state.id);
  };

  useEffect(() => {
    getAllOrders();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (props.data.filter.select) {
      switch (props.data.filter.select) {
        case "id":
          getOrderById(parseInt(props.data.filter.filter));
          break;
        case "userId":
          getOrderByUserId(props.data.filter.filter);
          break;

        default:
          break;
      }
    } else if (props.data.filter[0]) {
      setOrders(props.data.filter);
    } else {
      setOrders(props.data.orders);
      setmsgError("");
    }
  }, [props.data.filter, props.data.orders]); // eslint-disable-line react-hooks/exhaustive-deps

  const getAllOrders = async () => {
    try {
      let res = await axios.get(
        "https://drs-proyecto-api.herokuapp.com/orders",
        token
      );
      setOrders(res.data);
      props.dispatch({ type: UPDATEORDERS, payload: res.data });
    } catch (error) {
      setmsgError("Order not found");
    }
  };

  const getOrderById = async (Id) => {
    try {
      let res = await axios.get(
        `https://drs-proyecto-api.herokuapp.com/orders/${Id}`,
        token
      );
      if (res.data.length === 0) {
        setmsgError(`Order not Found`);
      } else {
        setOrders([res.data]);
        setmsgError(`Order Found`);
      }
    } catch (error) {
      setmsgError("Order not found");
    }
  };

  const getOrderByUserId = async (userId) => {
    try {
      let res = await axios.get(
        `https://drs-proyecto-api.herokuapp.com/orders/userId/${userId}`,
        token
      );
      if (res.data.length === 0) {
        setmsgError(`Order not Found`);
      } else {
        setOrders(res.data);
        setmsgError(`Order Found`);
      }
    } catch (error) {
      setmsgError("Order not found");
    }
  };

  const updateOrder = async (id) => {
    let body = {
      userId: data.userId,
      movieId: data.movieId,
    };
    try {
      await axios.put(
        `https://drs-proyecto-api.herokuapp.com/orders/${id}`,
        body,
        token
      );
      setmsgError("Order Updated");
      returnInitalState();
    } catch (error) {
      setmsgError("Order Couldn't be Updated");
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(
        `https://drs-proyecto-api.herokuapp.com/orders/${id}`,
        token
      );
      setmsgError("Order Deleted");
    } catch (error) {
      setmsgError(`${error}`);
    }
  };

  const deleteAlert = (e) => {
    if (window.confirm("Are you sure you wish to delete this order?")) {
      deleteOrder(e);
      getAllOrders();
    } else {
      return;
    }
  };

  const editBtn = (orderId) => {
    let data = {
      change: 1,
      id: orderId,
    };
    props.dispatch({ type: SETSTATE, payload: data });
  };

  const returnInitalState = () => {
    let data = {
      change: 0,
    };
    props.dispatch({ type: SETSTATE, payload: data });
    setmsgError("");
    getAllOrders();
  };

  const inputs = [
    {
      id: 1,
      name: "userId",
      type: "number",
      placeholder: "UserId",
      errorMessage: "UserId should be 1-3 characters",
      label: "UserId",
      min: "0",
      pattern: "^.{1,3}$",
      required: true,
    },
    {
      id: 2,
      name: "movieId",
      type: "number",
      placeholder: "MovieId",
      errorMessage: "MovieId should be 1-3 characters",
      label: "MovieId",
      min: "0",
      pattern: "^.{1,3}$",
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
    if (orders[0]?.id) {
      if (props.state.change === 1) {
        return (
          <div className="view">
            <div className="container">
              <div className="editInfo">
                <form onSubmit={handleSubmit}>
                  <h1>Edit Order</h1>
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
              <div className="orderNav">
                <Select />
                <div className="error">{msgError}</div>
              </div>
              <div className="orderInfo">
                {orders.map((order) => {
                  return (
                    <div key={order.id} className="ordersContainer">
                      <div className="orders">
                        <h4>Order Number: {order?.id}</h4>
                        <p>User Name: {order?.user?.name}</p>
                        <p>User ID: {order?.userId}</p>
                        <p>Rented Movie: {order?.movie?.title}</p>
                        <p>Movie ID: {order?.movieId}</p>
                        <p>City: {order.user?.city}</p>
                        <p>Rent Date: {formatDate(order?.rentDate)}</p>
                        <p>Return Date: {formatDate(order?.returnDate)}</p>
                      </div>
                      <div className="buttons">
                        <div
                          className="btnOrange"
                          onClick={() => editBtn(order.id)}
                        >
                          Update
                        </div>
                        <div
                          className="btnOrange"
                          onClick={() => deleteAlert(order.id)}
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
        <div className="container">You need authorization to show Orders</div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
  state: state.state,
  data: state.data,
}))(GetOrders);
