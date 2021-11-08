import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Users.css';

const GetUsers = () => {

    //HOOKS
    const [Users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers();
    }, [])

    useEffect(() => {
        console.log(Users)
    })

    //RECUPERAMOS TOKEN
    let token = localStorage.getItem("token");

    //CREAMOS LA CONFIGURACIÓN DEL HEADER QUE SE VA A MANDAR
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const getAllUsers = async () => {
        let res = await axios.get("https://drs-proyecto-api.herokuapp.com/users/", config);
        setUsers((res.data));
    }

    return (
        <div className="usersView">
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
}

export default GetUsers;
