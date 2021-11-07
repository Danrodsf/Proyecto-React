import React from 'react';
import './Header.css';
import Button from '../Button/Button';

const Header = () => {

    return (
        <div className="header">
            <Button view="Home" url="/" />
            <Button view="Login" url="/login" />
            <Button view="Registro" url="/register" />
        </div>
    )

};

export default Header;