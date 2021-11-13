import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { UPDATEUSERS } from '../../redux/types';
import loading from '../../img/loading.gif'

const GetUsers = (props) => {

    //HOOKS
    const [users, setUsers] = useState([]);
    const [msgError, setmsgError] = useState("");

    //UseEffect

    useEffect(() => {

        getAllUsers();

    }, [])

    useEffect(() => {

        if (props.data.filter !== '') {

            setUsers(props.data.filter)

        } else {

            setUsers(props.data.users)
        }

    }, [props.data.filter, props.data.users])

    const getAllUsers = async () => {

        let token = props.credentials.token;
        let config = {

            headers: { Authorization: `Bearer ${token}` }

        };

        try {

            let res = await axios.get("https://drs-proyecto-api.herokuapp.com/users/", config);
            setUsers((res.data))

            props.dispatch({ type: UPDATEUSERS, payload: res.data });

        }

        catch (error) {
            setmsgError("Cannot get users");
            return;
        }

    }

    const getUsersById = async () => {
        let id = props.data.filter
        let res = await axios.get(`https://drs-proyecto-api.herokuapp.com/users/${id}`);
        setUsers(res.data);
    }

    const getUsersByCity = async () => {
        let city = props.data.filter
        let res = await axios.get(`https://drs-proyecto-api.herokuapp.com/users/${city}`);
        setUsers(res.data);
    }

    if (props.credentials?.user?.admin) {

        if (users[0]?.id) {

            return (
                <div className="view">
                    <div className="container">
                        {users.map((user) => {

                            return <div key={user.id} className="users">
                                <h4>User Number: {JSON.stringify(user?.id)}</h4>
                                <h2>{JSON.stringify(user?.name)}</h2>
                                <p>Email: {JSON.stringify(user?.email)}</p>
                                <p>Register Date: {JSON.stringify(user?.createdAt)}</p>
                                <p>Last Update: {JSON.stringify(user?.updatedAt)}</p>
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
                    You need authorization to show Users
                </div>
            </div>
        )

    }

}

export default connect((state) => ({
    credentials: state.credentials,
    data: state.data
}))(GetUsers);
