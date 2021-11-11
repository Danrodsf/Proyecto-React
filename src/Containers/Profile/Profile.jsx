import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { UPDATE_USER } from '../../redux/types';
import axios from 'axios'

const Profile = (props) => {

    //Hooks
    const [creds, setCreds] = useState({
        name: props.credentials.user.name,
        email: props.credentials.user.email,
        city: props.credentials.user.city,
        password: props.credentials.user.password,
        password2: props.credentials.user.password 
    });

    const [semaforo, setSemaforo] = useState(false);
    const [errorMsg, seterrorMsg] = useState('');

    //Handlers
    const profileHandler = (e) => {

        setCreds({ ...creds, [e.target.name]: e.target.value })

    }

    const edit = async () => {
        //Comprobar errores en los datos

        if (creds.password2 !== creds.password) {

            return seterrorMsg('Password does not match');

        }

        //Generacion del body
        let body = {

            name: creds.name,
            email: creds.email,
            city: creds.city,
            password: creds.password

        };

            //RECUPERAMOS TOKEN
        let token = props.credentials.token;

    //CREAMOS LA CONFIGURACIÓN DEL HEADER QUE SE VA A MANDAR
        let config = {

        headers: { Authorization: `Bearer ${token}` }

    };

        //Conexion a axios y envio de datos
        try {

            let res = await axios.put(`https://drs-proyecto-api.herokuapp.com/users/${props.credentials.user.id}`, body, config);
            seterrorMsg('User updated')
            let datos = res.data;
            props.dispatch({ type: UPDATE_USER, payload: datos });

        }
        catch (error) {

            console.log(error);
            seterrorMsg('Unable to update User');
            return;

        }

    };

    if (props.credentials?.user.admin) {

        return (
            <div className="view">
                <div className="container">
                    <div className="profiles">
                        <div>PERFIL DE ADMINISTRADOR</div>
                        <div><p>Name:</p>{props.credentials?.user?.name}</div>
                        <div><p>Email:</p>{props.credentials?.user?.email}</div>
                        <div><p>City:</p>{props.credentials?.user?.city}</div>
                    </div>
                </div>
            </div>
        )

    } else if (props.credentials?.token !== '' && props.credentials?.token !== 0) {

        if (semaforo) {
            return (
                <div className="view">
                    <div className="container">
                        <div className="profiles">
                            <div>PERFIL DE USUARIO</div>
                            <div><p>Name:</p><input type="text" name='name' placeholder={creds?.name} onChange={profileHandler}/></div>
                            <div><p>Email:</p><input type="text" name='email' placeholder={creds?.email} onChange={profileHandler}/></div>
                            <div><p>City:</p><input type="text" name='city' placeholder={creds?.city} onChange={profileHandler}/></div>
                            <div><p>Password:</p><input type="password" name='password' placeholder={creds?.password} onChange={profileHandler}/></div>
                            <div><p>Repeat Password:</p><input type="password" name='password2' placeholder={creds?.password} onChange={profileHandler}/></div>
                            <div className="btn" onClick={()=>edit()}>Save</div>
                            <div>{errorMsg}</div>
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
                            <div className="btn" onClick={() => setSemaforo(true)}>Update Info</div>
                            <div>{errorMsg}</div>
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
    credentials: state.credentials
}))(Profile);