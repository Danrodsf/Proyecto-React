import { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

const Orders = (props) => {
  let token = {
    headers: { Authorization: `Bearer ${props.credentials.token}` },
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrderByUserId(props.credentials.user.id);
  }, []);

  const getOrderByUserId = async (userId) => {
    try {
      let res = await axios.get(
        `https://drs-proyecto-api.herokuapp.com/orders/userId/${userId}`,
        token
      );
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ordersInfo">
      {orders.map((order) => {
        return (
          <div key={order.id} className="orders">
            <div>
              <h4>Order Number: {order?.id}</h4>
              <p>User Name: {order?.user?.name}</p>
            </div>
            <p>Rented Movie: {order?.movie?.title}</p>
            <p>City: {order.user?.city}</p>
            <p>Rent Date: {order?.rentDate}</p>
            <p>Return Date: {order?.returnDate}</p>
          </div>
        );
      })}
    </div>
  );
};

export default connect((state) => ({
  credentials: state.credentials,
  data: state.data,
}))(Orders);
