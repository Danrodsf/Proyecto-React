import React from 'react';
import './Header.css';
import Button from '../Button/Button';
import Login from '../Login/Login';

const Header = () => {

    return (
        <div className="header">
            <div className="hcontainer">
                <div className="navbar">
                    <Button view="Home" url="/" />
                    <Button view="Register" url="/register" />
                    <Button view="Profile" url="/profile" />
                    <Button view="Movies" url="/movies" />
                    <Button view="Users" url="/users" />
                </div>
                <div className="navlogin">
                    <Login />
                </div>
            </div>


        </div>
    )

};

export default Header;