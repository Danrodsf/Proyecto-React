import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { UPDATEUSERS } from '../../redux/types';
import Select from '../../Components/Select/Select';
import loading from '../../img/loading.gif'

const GetUsers = (props) => {

    let token = {

        headers: { Authorization: `Bearer ${props.credentials.token}` }

    };

    //HOOKS
    const [users, setUsers] = useState([]);
    const [msgError, setmsgError] = useState("");

    //UseEffect

    useEffect(() => {

        getAllUsers();

    }, [])

    useEffect(() => {

        if (props.data.filter.select) {

            switch (props.data.filter.select) {

                case 'id':
                    getUsersById(parseInt(props.data.filter.filter));
                    break;
                case 'city':
                    getUsersByCity(props.data.filter.filter);
                    break;

                default:
                    break;
            }

        } else if (props.data.filter[0]) {

            setUsers(props.data.filter)

        } else {

            setUsers(props.data.users)
            setmsgError('')
        }

    }, [props.data.filter, props.data.users])

    const getAllUsers = async () => {

        try {

            let res = await axios.get("https://drs-proyecto-api.herokuapp.com/users/", token);
            setUsers(res.data)
            props.dispatch({ type: UPDATEUSERS, payload: res.data });

        }

        catch (error) {

            setmsgError("Cannot get users");

        }

    }

    const getUsersById = async (id) => {

        try {

            let res = await axios.get(`https://drs-proyecto-api.herokuapp.com/users/${id}`, token);
            setUsers([res.data]);
            setmsgError('User Found');

        } catch (error) {

            setmsgError(`${error}`);

        }

    }

    const getUsersByCity = async (city) => {

        try {

            let res = await axios.get(`https://drs-proyecto-api.herokuapp.com/users/city/${city}`, token);
            setUsers(res.data);
            setmsgError('Users Found')

        } catch (error) {

            setmsgError(`${error}`)

        }

    }

    if (props.credentials?.user?.admin) {

        if (users[0]?.id) {

            return (
                <div className="view">
                    <div className="container">
                        <div className="userNav">
                            <Select />
                            <div>{msgError}</div>
                        </div>
                        <div className="userInfo">
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
