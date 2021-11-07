import React from 'react';
import './Button.css';
import { useNavigate } from 'react-router-dom';

const Button = (props) => {

    const navigate = useNavigate();

    const next = () => {
        navigate(props.url);
    }

    return (
        <div className="button" onClick={() => next()}>{props.view}</div>
    )
};

export default Button;