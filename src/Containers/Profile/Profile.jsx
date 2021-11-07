import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {

    //Hook 
    const [profileData, setprofileData] = useState(JSON.parse(localStorage.getItem("loginData")));

    useEffect(() => {
        console.log(profileData)
    }, [])

    return (
        <div className="profileView">
            <div className=""></div>
            <div>{profileData.name}</div>
            <div>{profileData.email}</div>
            <div>{profileData.city}</div>
        </div>
    )
};

export default Profile;