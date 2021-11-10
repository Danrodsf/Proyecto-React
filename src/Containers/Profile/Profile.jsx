import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const Profile = (props) => {

    if (props.credentials?.token !== '') {

        return (
            <div className="view">
                <div className="container">
                    <div className="profiles">
                        <div><p>Name:</p>{props.credentials?.user?.name}</div>
                        <div><p>Email:</p>{props.credentials?.user?.email}</div>
                        <div><p>City:</p>{props.credentials?.user?.city}</div>
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

export default connect((state)=>({
    credentials: state.credentials
}))(Profile);