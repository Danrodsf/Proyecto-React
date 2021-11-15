import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { SETSTATE, UPDATE_USER } from '../../redux/types';
import axios from 'axios'
import Orders from '../../Components/Orders/Orders';

const Profile = (props) => {

    let token = {

        headers: { Authorization: `Bearer ${props.credentials.token}` }

    };

    //Hooks
    const [creds, setCreds] = useState(props.credentials.user);
    const [msgError, setmsgError] = useState('')

    //Handlers
    const profileHandler = (e) => {

        setCreds({ ...creds, [e.target.name]: e.target.value })

    }

    useEffect(() => {

        setCreds(props.credentials.user);

    }, [props.credentials]);

    const editBtn = () => {

        let data = {
            change: 1
        };

        props.dispatch({ type: SETSTATE, payload: data });
    };

    const returnInitalState = () => {
        let data = {
            change: 0
        };

        props.dispatch({ type: SETSTATE, payload: data });
        setmsgError('')

    }

    const edit = async () => {

        let body = {

            name: creds.name,
            email: creds.email,
            city: creds.city

        };


        try {

            let res = await axios.put(`https://drs-proyecto-api.herokuapp.com/users/${props.credentials.user.id}`, body, token);
            setmsgError(res.data.message)

            setTimeout(() => {

                returnInitalState();
                props.dispatch({ type: UPDATE_USER, payload: creds });

            }, 1000);

        }

        catch (error) {

            setmsgError('Unable to update User');
            return;

        }

    };

    if (props.credentials?.user?.admin && props.state?.change !== '') {

        if (props.state?.change === 1) {

            return (
                <div className="view">
                    <div className="container">
                        <div className="profiles">
                            <div>PERFIL DE ADMINISTRADOR</div>
                            <div><p>Name:</p><input type="text" name='name' placeholder={creds?.name} onChange={profileHandler} /></div>
                            <div><p>Email:</p><input type="text" name='email' placeholder={creds?.email} onChange={profileHandler} /></div>
                            <div><p>City:</p><input type="text" name='city' placeholder={creds?.city} onChange={profileHandler} /></div>
                            <div className="btn" onClick={() => edit()}>Save</div>
                            <div>{msgError}</div>
                        </div>
                        <div className="profileOrders">
                            <Orders />
                        </div>
                    </div>
                </div>
            )

        } else {

            return (
                <div className="view">
                    <div className="container">
                        <div className="profiles">
                            <h2>PERFIL DE ADMINISTRADOR</h2>
                            <h3>{props.credentials?.user?.name}</h3>
                            <div><p>Email:</p>{props.credentials?.user?.email}</div>
                            <div><p>City:</p>{props.credentials?.user?.city}</div>
                            <div><p>Registered since:</p>{props.credentials?.user?.createdAt}</div>
                            <div><p>Last Update:</p>{props.credentials?.user?.updatedAt}</div>
                            <div className="btn" onClick={() => editBtn()}>Update Info</div>
                            <div>{msgError}</div>
                        </div>
                        <div className="profileOrders">
                            <Orders />
                        </div>
                    </div>
                </div>
            )
        }

    } else if (props.credentials?.token !== '' && props.state?.change !== '') {

        if (props.state?.change === 1) {
            return (
                <div className="view">
                    <div className="container">
                        <div className="profiles">
                            <div>PERFIL DE USUARIO</div>
                            <div><p>Name:</p><input type="text" name='name' placeholder={creds?.name} onChange={profileHandler} /></div>
                            <div><p>Email:</p><input type="text" name='email' placeholder={creds?.email} onChange={profileHandler} /></div>
                            <div><p>City:</p><input type="text" name='city' placeholder={creds?.city} onChange={profileHandler} /></div>
                            <div className="btn" onClick={() => edit()}>Save</div>
                            <div>{msgError}</div>
                        </div>
                    </div>
                </div>
            )

        } else {

            return (
                <div className="view">
                    <div className="container">
                        <div className="profiles">
                            <div>PERFIL DE USUARIO</div>
                            <div><p>Name:</p>{props.credentials?.user?.name}</div>
                            <div><p>Email:</p>{props.credentials?.user?.email}</div>
                            <div><p>City:</p>{props.credentials?.user?.city}</div>
                            <div><p>Registered since:</p>{props.credentials?.user?.createdAt}</div>
                            <div><p>Last Update:</p>{props.credentials?.user?.updatedAt}</div>
                            <div className="btn" onClick={() => editBtn()}>Update Info</div>
                            <div>{msgError}</div>
                        </div>
                        <div className="profileOrders">
                            <Orders />
                        </div>
                    </div>
                </div>
            )
        }

    } else {

        return (
            <div className="view">
                <div className="container">
                    You are not logged in
                </div>
            </div>
        )
    }

};

export default connect((state) => ({
    credentials: state.credentials,
    state: state.state
}))(Profile);