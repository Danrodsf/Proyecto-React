import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Login.css';

const Login = () => {

    const navigate = useNavigate();

    //Hooks
    const [msgError, setmsgError] = useState("");
    const [creds, setCreds] = useState({ email: '', password: '' });

    //Handlers
    const inputHandler = (e) => {

        setCreds({ ...creds, [e.target.name]: e.target.value });

    }

    const logIn = async () => {

        let body = {

            email: creds.email,
            password: creds.password

        };

        try {

            let res = await axios.post("https://drs-proyecto-api.herokuapp.com/users/signin", body);
            setmsgError(`Hello again ${res.data.user.name}....`);

            localStorage.setItem("loginData", JSON.stringify(res.data.user));

            setTimeout(() => {

                navigate("/profile");

            }, 2000);

        }

        catch (error) {

            setmsgError("Cannot Log In");

        }

    }

    // // Esto es para checkeo de Input y va antes del 1er input
    // <pre>{JSON.stringify(creds, null, 2)}</pre> 

    return (

        <div className="loginView">
            Email:<input type='email' name='email' title='email' onChange={inputHandler} lenght='30' />
            Password:<input type='password' name='password' title='password' onChange={inputHandler} lenght='30' />
            <div className="sendBtn" onClick={() => logIn()}>Login</div>
            <div className="error"><h3>{msgError}</h3></div>
        </div>
    )
};

export default Login;