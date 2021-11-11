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

    let token = props.credentials.token;
    let config = {

        headers: { Authorization: `Bearer ${token}` }

    };

    const getAllOrders = async () => {

        try {

            let res = await axios.get("https://drs-proyecto-api.herokuapp.com/orders", config);
            setOrders((res.data));

        } catch (error) {

            setmsgError(orders.error || orders.message);
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
                            <p>Movie ID: {JSON.stringify(order.movieId)}</p>
                            <p>Rented Movie: {JSON.stringify(order.movie.title)}</p>
                            <p>City: {JSON.stringify(order.user.city)}</p>
                            <p>Rent Date: {JSON.stringify(order.rentDate)}</p>
                            <p>Return Date: {JSON.stringify(order.returnDate)}</p>
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