import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { SETSTATE, INITSTATE, LOGIN, LOGOUT } from "../../redux/types";

const Login = (props) => {

    const navigate = useNavigate();

    //Hooks
    const [msgError, setmsgError] = useState("");
    const [creds, setCreds] = useState({ email: "", password: "" });

    //Handlers
    const inputHandler = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    };

    const loginBtn = () => {

        let data = {
            change: 0
        };

        props.dispatch({ type: SETSTATE, payload: data });

    };

    const logIn = async () => {

        let body = {
            email: creds.email,
            password: creds.password,
        };
        try {
            let res = await axios.post(
                "https://drs-proyecto-api.herokuapp.com/users/signin",
                body
            );
            let datos = res.data;
            props.dispatch({ type: LOGIN, payload: datos });
            console.log(props)

        } catch (error) {
            setmsgError("Cannot Log In");
            return;
        }
    };

    const logOut = () => {
        props.dispatch({ type: LOGOUT });
        props.dispatch({ type: INITSTATE })
        navigate('/');
    };

    if (props.state?.change !== "") {
        if (props.credentials?.token !== "") {
            return (
                <div className="loginView">
                    Logged in as {props.credentials?.user?.name}
                    <div className="Btn" onClick={() => logOut()}>
                        LOG OUT
                    </div>
                </div>
            );
        } else {
            return (
                <div className="loginView">
                    <input
                        type="email"
                        name="email"
                        title="email"
                        onChange={inputHandler}
                        lenght="30"
                        placeholder="email"
                    />
                    <input
                        type="password"
                        name="password"
                        title="password"
                        onChange={inputHandler}
                        lenght="30"
                        placeholder="Password"
                    />
                    <div className="Btn" onClick={() => logIn()}>
                        LOG IN
                    </div>
                    <div className="error">
                        <h3>{msgError}</h3>
                    </div>
                </div>
            );
        }
    } else {
        return (
            <div className="Btn" onClick={() => loginBtn()}>
                LOG IN
            </div>
        );
    }
};

export default connect((state) => ({
    credentials: state.credentials,
    state: state.state
}))(Login);
