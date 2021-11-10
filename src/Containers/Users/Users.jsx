import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import loading from '../../img/loading.gif'

const GetUsers = (props) => {

    //HOOKS
    const [Users, setUsers] = useState([]);
    const [msgError, setmsgError] = useState("");

    useEffect(() => {

        setTimeout(() => {

            getAllUsers();

        }, 500);

    }, [])

    //RECUPERAMOS TOKEN
    let token = props.credentials.token;

    //CREAMOS LA CONFIGURACIÓN DEL HEADER QUE SE VA A MANDAR
    let config = {

        headers: { Authorization: `Bearer ${token}` }

    };

    const getAllUsers = async () => {

        try {

            let res = await axios.get("https://drs-proyecto-api.herokuapp.com/users/", config);
            setUsers((res.data))

        }

        catch (error) {
            setmsgError("Cannot get users");
            return;
        }

    }

    if (props.credentials?.token !== "") {

        return (
            <div className="view">
                <div className="container">
                    {Users.map((user) => {

                        return <div key={user.id} className="users">
                            <h4>user Number: {JSON.stringify(user.id)}</h4>
                            <h2>{JSON.stringify(user.name)}</h2>
                            <p>email: {JSON.stringify(user.email)}</p>
                            <p>Register Date: {JSON.stringify(user.createdAt)}</p>
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

}

export default connect((state)=>({
    credentials: state.credentials
}))(GetUsers);
