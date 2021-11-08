import React from 'react';
import './Footer.css';
import Button from '../Button/Button';

const Footer = () => {

    return (
        <div className="footer">
            <Button view="Logout" url="/" />
        </div>
    )

};

export default Footer;