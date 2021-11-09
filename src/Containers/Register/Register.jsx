import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
            localStorage.setItem('loginData', JSON.stringify(res.data.user))
            seterrorMsg('New User Registered')

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

    // // Esto es para checkeo de Input y va antes del 1er input
    // <pre>{JSON.stringify(creds, null, 2)}</pre> 

    return (
        <div className='view'>
            <div className="container">
                <div className="inputs">
                    Name: <input
                        type='text'
                        name='name'
                        title='name'
                        placeholder='Name'
                        lenght='30'
                        onChange={userHandler}
                    />
                    Surname:<input
                        type='text'
                        name='surname'
                        title='surname'
                        placeholder='Surname'
                        lenght='30'
                        onChange={userHandler}
                    />
                    DNI:<input
                        type='text'
                        name='dni'
                        title='dni'
                        placeholder='DNI'
                        lenght='10'
                        onChange={userHandler}
                    />
                    Email:<input
                        type='email'
                        name='email'
                        title='email'
                        placeholder='Email'
                        lenght='30'
                        onChange={userHandler}
                    />
                    Address:<input
                        type='text'
                        name='address'
                        title='address'
                        placeholder='Address'
                        lenght='30'
                        onChange={userHandler}
                    />
                    City:<input
                        type='text'
                        name='city'
                        title='city'
                        placeholder='City'
                        lenght='30'
                        onChange={userHandler}
                    />
                    Postal Code:<input
                        type='number'
                        name='postalcode'
                        title='postalcode'
                        placeholder='PostalCode'
                        lenght='30'
                        onChange={userHandler}
                    />
                    Phone:<input
                        type='text'
                        name='phone'
                        title='phone'
                        placeholder='Phone'
                        lenght='12'
                        onChange={userHandler}
                    />
                    Password:<input
                        type='text'
                        name='password'
                        title='password'
                        placeholder='Password'
                        lenght='30'
                        onChange={userHandler}
                    />
                    Repeat Password<input
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

            </div>
        </div>
    );

};

export default Register;