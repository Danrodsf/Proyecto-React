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

            }, 4000);

        }

        catch (error) {

            setmsgError("Cannot LogIn");

        }

    }


    return (

        <div className="login">
            <pre>{JSON.stringify(creds, null, 2)}</pre>
            <input type='email' name='email' title='email' onChange={inputHandler} lenght='30' />
            <input type='password' name='password' title='password' onChange={inputHandler} lenght='30' />
            <div className="sendBtn" onClick={() => logIn()}>Login</div>
            <div className="error">{msgError}</div>
        </div>
    )
};

export default Login;