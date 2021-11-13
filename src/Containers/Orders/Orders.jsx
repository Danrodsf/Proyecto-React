import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { UPDATEORDERS } from '../../redux/types';
import loading from '../../img/loading.gif'
import Select from '../../Components/Select/Select';

const GetOrders = (props) => {

    let token = {

        headers: { Authorization: `Bearer ${props.credentials.token}` }

    };

    //HOOKS
    const [orders, setOrders] = useState([]);
    const [msgError, setmsgError] = useState("");

    useEffect(() => {

        getAllOrders();

    }, [])

    useEffect(() => {

        if (props.data.filter.select) {

            switch (props.data.filter.select) {

                case 'id':
                    getOrderById(parseInt(props.data.filter.filter));
                    break;
                case 'userId':
                    getOrderByUserId(props.data.filter.filter);
                    break;

                default:
                    break;
            }

        } else if (props.data.filter[0]) {

            setOrders(props.data.filter)

        } else {

            setOrders(props.data.orders)
            setmsgError('')
        }

    }, [props.data.filter, props.data.orders])

    const getAllOrders = async () => {

        try {

            let res = await axios.get("https://drs-proyecto-api.herokuapp.com/orders", token);
            setOrders((res.data));

            props.dispatch({ type: UPDATEORDERS, payload: res.data });

        } catch (error) {

            setmsgError("Order not found");

        }

    }

    const getOrderById = async (Id) => {

        try {

            let res = await axios.get(`https://drs-proyecto-api.herokuapp.com/orders/${Id}`, token);
            setOrders([res.data]);
            setmsgError("Order found");

        } catch (error) {

            setmsgError("Order not found");

        }

    }

    const getOrderByUserId = async (userId) => {

        try {

            let res = await axios.get(`https://drs-proyecto-api.herokuapp.com/orders/userId/${userId}`, token);
            setOrders(res.data);
            setmsgError("Order found");

        } catch (error) {

            setmsgError("Order not found");

        }

    }

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

                                return <div key={order.id} className="orders">
                                    <h4>Order Number: {JSON.stringify(order?.id)}</h4>
                                    <p>User Name: {JSON.stringify(order?.user?.name)}</p>
                                    <p>User ID: {JSON.stringify(order?.userId)}</p>
                                    <p>Rented Movie: {JSON.stringify(order?.movie?.title)}</p>
                                    <p>Movie ID: {JSON.stringify(order?.movieId)}</p>
                                    <p>City: {JSON.stringify(order.user?.city)}</p>
                                    <p>Rent Date: {JSON.stringify(order?.rentDate)}</p>
                                    <p>Return Date: {JSON.stringify(order?.returnDate)}</p>
                                </div>

                            })}
                        </div>
                    </div>
                </div>
            )

        } else {

            return (
                <div className="view">
                    <div className="container">
                        <img src={loading} alt="Loading" />
                    </div>
                </div>
            )

        }

    } else if (msgError) {

        return (
            <div className="view">
                <div className="container" >
                    {msgError}
                </div>
            </div>
        )

    } else {

        return (
            <div className="view">
                <div className="container">
                    You need authorization to show Orders
                </div>
            </div>
        )

    }

};

export default connect((state) => ({
    credentials: state.credentials,
    data: state.data
}))(GetOrders);