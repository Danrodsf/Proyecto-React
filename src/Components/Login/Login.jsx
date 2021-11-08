import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import './Login.css';

const Login = () => {

    const navigate = useNavigate();

    //Hooks
    const [msgError, setmsgError] = useState("");
    const [creds, setCreds] = useState({ email: '', password: '' });
    const [login, setLogin] = useState(false);

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

            localStorage.setItem("loginData", JSON.stringify(res.data.user));
            localStorage.setItem("token", (res.data.token));

            setTimeout(() => {

                navigate("/profile");

            }, 2000);

        }

        catch (error) {

            setmsgError("Cannot Log In");
            return;

        }

    }

    if (login) {

        return (
            <div className="loginView">
                <input type='email' name='email' title='email' onChange={inputHandler} lenght='30' placeholder="email" />
                <input type='password' name='password' title='password' onChange={inputHandler} lenght='30' placeholder="Password" />
                <div className="button" onClick={() => logIn()}>Login</div>
                <div className="error"><h3>{msgError}</h3></div>
            </div>
        )

    } else {

        return (
            <div className="loginIcon" onClick={() => setLogin(true)}>Login</div>
        )

    }

};

export default Login;