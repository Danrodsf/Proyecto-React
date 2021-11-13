import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { UPDATEORDERS } from '../../redux/types';
import loading from '../../img/loading.gif'

const GetOrders = (props) => {

    //HOOKS
    const [orders, setOrders] = useState([]);
    const [msgError, setmsgError] = useState("");

    useEffect(() => {

        getAllOrders();

    }, [])

    useEffect(() => {

        if (props.data.filter !== '') {

            setOrders(props.data.filter)

        } else {

            setOrders(props.data.orders)
        }

    }, [props.data.filter, props.data.orders])

    const getAllOrders = async () => {

        let token = props.credentials.token;
        let config = {

            headers: { Authorization: `Bearer ${token}` }

        };

        try {

            let res = await axios.get("https://drs-proyecto-api.herokuapp.com/orders", config);
            setOrders((res.data));

            props.dispatch({ type: UPDATEORDERS, payload: res.data });

        } catch (error) {

            setmsgError(orders.error || orders.message);
            return;

        }

    }

    const getOrderById = async () => {
        let id = props.data.filter
        let res = await axios.get(`https://drs-proyecto-api.herokuapp.com/orders/${id}`);
        setOrders(res.data);
    }

    const getOrderByUserId = async () => {
        let userId = props.data.filter
        let res = await axios.get(`https://drs-proyecto-api.herokuapp.com/orders/userId/${userId}`);
        setOrders(res.data);
    }

    if (props.credentials?.user?.admin) {

        if (orders[0]?.id) {

            return (
                <div className="view">
                    <div className="container">
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