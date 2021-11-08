import React from 'react';
import './Header.css';
import Button from '../Button/Button';

const Header = () => {

    return (
        <div className="header">
            <Button view="Home" url="/" />
            <Button view="Login" url="/login" />
            <Button view="Register" url="/register" />
            <Button view="Profile" url="/profile" />
            <Button view="Movies" url="/movies" />
            <Button view="Users" url="/users" />
        </div>
    )

};

export default Header;