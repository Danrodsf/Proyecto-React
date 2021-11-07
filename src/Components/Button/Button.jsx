import React from 'react';
import './Button.css';
import { useNavigate } from 'react-router-dom';

const Button = (props) => {

    const link = useNavigate();

    const next = () => {
        link.push(props.url);
    }

    return (
        <div className="button" onClick={() => next()}>{props.view}</div>
    )
};

export default Button;