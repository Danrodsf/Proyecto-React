import axios from "axios";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { UPDATEORDERS } from "../../redux/types";
import Select from "../../Components/Select/Select";

const GetOrders = (props) => {
  let token = {
    headers: { Authorization: `Bearer ${props.credentials.token}` },
  };

  //HOOKS
  const [orders, setOrders] = useState([]);
  const [msgError, setmsgError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      getAllOrders();
    }, 2000);
  }, []);

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
  }, [props.data.filter, props.data.orders]);

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
        setOrders(res.data);
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

  if (props.credentials?.user?.admin) {
    if (orders[0]?.id) {
      return (
        <div className="view">
          <div className="container">
            <div className="orderNav">
              <Select />
              <div>{msgError}</div>
            </div>
            <div className="orderInfo">
              {orders.map((order) => {
                return (
                  <div key={order.id} className="orders">
                    <div>
                      <h4>Order Number: {JSON.stringify(order?.id)}</h4>
                      <p>User Name: {JSON.stringify(order?.user?.name)}</p>
                    </div>
                    <p>User ID: {JSON.stringify(order?.userId)}</p>
                    <p>Rented Movie: {JSON.stringify(order?.movie?.title)}</p>
                    <p>Movie ID: {JSON.stringify(order?.movieId)}</p>
                    <p>City: {JSON.stringify(order.user?.city)}</p>
                    <p>Rent Date: {JSON.stringify(order?.rentDate)}</p>
                    <p>Return Date: {JSON.stringify(order?.returnDate)}</p>
                    <div className="btn" onClick={() => deleteAlert(order.id)}>
                      Delete
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
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
  data: state.data,
}))(GetOrders);
