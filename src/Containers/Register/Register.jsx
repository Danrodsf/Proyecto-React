import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {

    let navigate = useNavigate();

    //Hooks
    const [creds, setCreds] = useState({
        name: null,
        surname: null,
        dni: null,
        email: null,
        address: null,
        city: null,
        postalcode: null,
        phone: null,
        password: null,
        password2: null,
    });

    const [errorMsg, seterrorMsg] = useState('');

    //Handlers
    const userHandler = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }

    //funciones
    const reg = async () => {
        //Comprobar errores en los datos

        if (creds.password2 !== creds.password) {
            return seterrorMsg('Password does not match');
        }

        //Generacion del body
        let body = {
            name: creds.name,
            surname: creds.surname,
            dni: creds.dni,
            email: creds.email,
            address: creds.address,
            city: creds.city,
            postalcode: creds.postalcode,
            phone: creds.phone,
            password: creds.password
        };

        //Conexion a axios y envio de datos
        console.log('Sending to Axios', body)
        try {
            let res = await axios.post('https://drs-proyecto-api.herokuapp.com/users/signup', body)

            seterrorMsg('New User Registered')

            localStorage.setItem('loginData', JSON.stringify(res.data.user))
        }
        catch (error) {
            console.log(error);
            seterrorMsg('Unable to register new User');
            return;
        }

        //Recepción y guardado de datos
        setTimeout(() => {
            navigate('/profile');
        }, 2000);

    };

    return (
        <div className='register'>
            <pre>{JSON.stringify(creds, null, 2)}</pre>
            <input
                type='text'
                name='name'
                title='name'
                placeholder='Name'
                lenght='30'
                onChange={userHandler}
            />
            <input
                type='text'
                name='surname'
                title='surname'
                placeholder='Surname'
                lenght='30'
                onChange={userHandler}
            />
            <input
                type='text'
                name='dni'
                title='dni'
                placeholder='DNI'
                lenght='10'
                onChange={userHandler}
            />
            <input
                type='email'
                name='email'
                title='email'
                placeholder='Email'
                lenght='30'
                onChange={userHandler}
            />
            <input
                type='text'
                name='address'
                title='address'
                placeholder='Address'
                lenght='30'
                onChange={userHandler}
            />
            <input
                type='text'
                name='city'
                title='city'
                placeholder='City'
                lenght='30'
                onChange={userHandler}
            />
            <input
                type='number'
                name='postalcode'
                title='postalcode'
                placeholder='PostalCode'
                lenght='30'
                onChange={userHandler}
            />
            <input
                type='text'
                name='phone'
                title='phone'
                placeholder='Phone'
                lenght='12'
                onChange={userHandler}
            />
            <input
                type='text'
                name='password'
                title='password'
                placeholder='Password'
                lenght='30'
                onChange={userHandler}
            />
            <input
                type='text'
                name='password2'
                title='password2'
                placeholder='Repeat Password'
                lenght='30'
                onChange={userHandler}
            />
            <div className='sendBtn' onClick={() => reg()}>
                Register
            </div>
            <div className='error'>{errorMsg} </div>
        </div>
    );
};

export default Register;