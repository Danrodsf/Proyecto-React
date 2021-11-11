import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import loading from '../../img/loading.gif'

const GetOrders = (props) => {

    //HOOKS
    const [orders, setOrders] = useState([]);
    const [msgError, setmsgError] = useState("");

    useEffect(() => {

        setTimeout(() => {

            getAllOrders();

        }, 1000);

    }, [])

    useEffect(() => {

        console.log(orders)

    })

    let token = props.credentials.token;
    let config = {

        headers: { Authorization: `Bearer ${token}` }

    };

    const getAllOrders = async () => {

        try {

            let res = await axios.get("https://drs-proyecto-api.herokuapp.com/orders", config);
            setOrders((res.data));

        } catch (error) {

            setmsgError("Cannot get Orders");
            return;

        }
    }


    if (props.credentials?.user?.admin) {

        return (
            <div className="view">
                <div className="container">
                    {orders.map((order) => {

                        return <div key={order.id} className="orders">
                            <h4>Order Number: {JSON.stringify(order.id)}</h4>
                            <p>User ID: {JSON.stringify(order.userId)}</p>
                            <p>Email: {JSON.stringify(order.movieId)}</p>
                            <p>Register Date: {JSON.stringify(order.createdAt)}</p>
                        </div>
                    })}

                </div>
            </div>
        )

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
                    <img src={loading} alt="Loading" />
                </div>
            </div>
        )

    }

};

export default connect((state) => ({
    credentials: state.credentials
}))(GetOrders);