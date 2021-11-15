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

    const [msgError, setmsgError] = useState('');

    //Handlers
    const userHandler = (e) => {

        setCreds({ ...creds, [e.target.name]: e.target.value })

    }


    const reg = async () => {


        if (creds.password2 !== creds.password) {

            return setmsgError('Password does not match');

        }


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


        try {

            let res = await axios.post('https://drs-proyecto-api.herokuapp.com/users/signup', body);
            setCreds(res.data);
            setmsgError('New User Registered')

        }
        catch (error) {

            setmsgError(error.message);

        }

        setTimeout(() => {

            navigate('/profile');

        }, 2000);

    };

    // // Esto es para checkeo de Input y va antes del 1er input
    // <pre>{JSON.stringify(creds, null, 2)}</pre> 

    return (
        <div className='view'>
            <div className="container">
                <div className="registerInfo">
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
                    </div>
                    <div className='btn' onClick={() => reg()}>
                        Register
                    </div>
                    <div className='error'>{msgError} </div>
                </div>
            </div>
        </div>
    );

};

export default Register;