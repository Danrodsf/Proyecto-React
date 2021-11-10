import React from 'react';
import Button from '../Button/Button';
import Login from '../Login/Login';

const Header = () => {

    return (
        <div className="header">
            <div className="hcontainer">
                <div className="navbar">
                    <Button view="HOME" url="/" />
                    <Button view="REGISTER" url="/register" />
                    <Button view="PROFILE" url="/profile" />
                    <Button view="MOVIES" url="/movies" />
                    <Button view="USERS" url="/users" />
                </div>
                <div className="navlogin">
                    <Login />
                </div>
            </div>


        </div>
    )

};

export default Header;