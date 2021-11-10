import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios'

const Profile = (props) => {

    const update = () => {
        const edit = document.querySelectorAll('.edit');
        const hidden = document.querySelector('.btn2');

        edit.forEach(element => {
            element.removeAttribute('readOnly')
            element.classList.remove("hide");
        });

        hidden.classList.remove('hidden');

    }

    const update2 = () => {
        const edit = document.querySelectorAll('.edit');
        const hidden = document.querySelector('.btn2');

        const body = {

            name: edit[0].value,
            email: edit[1].value,
            city: edit[2].value

        }

        edit.forEach(element => {
            element.setAttribute('readOnly', 'readOnly')
            element.classList.add("hide");
        });

        hidden.classList.add('hidden');

    }

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

        return (
            <div className="view">
                <div className="container">
                    <div className="profiles">
                        <div>PERFIL DE USUARIO</div>
                        <div><p>Name:</p><input type="text" readOnly="readOnly" className="edit hide" placeholder={props.credentials?.user?.name}></input></div>
                        <div><p>Email:</p><input type="text" readOnly="readOnly" className="edit hide" placeholder={props.credentials?.user?.email}></input></div>
                        <div><p>City:</p><input type="text" readOnly="readOnly" className="edit hide" placeholder={props.credentials?.user?.city}></input></div>
                        <div><p>Registered since:</p>{props.credentials?.user?.createdAt}</div>
                        <div className="btn1" onClick={() => update()}>Update Info</div>
                        <div className="btn2 hidden" onClick={() => update2()}>Save</div>
                    </div>
                </div>
            </div>
        )

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