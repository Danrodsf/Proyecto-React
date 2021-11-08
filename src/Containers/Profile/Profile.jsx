import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {

    //Hook 
    const [profileData, setprofileData] = useState(JSON.parse(localStorage.getItem("loginData")));

    useEffect(() => {

        console.log(profileData)

    }, [])

    if (profileData) {

        return (
            <div className="profileView">
                <div className="container">
                    <div className="profiles">
                        <div><p>Name:</p>{profileData.name}</div>
                        <div><p>Email:</p>{profileData.email}</div>
                        <div><p>City:</p>{profileData.city}</div>
                    </div>
                </div>
            </div>
        )

    } else {
        return (
            <div className="profileView">
                <div className="container">
                    You are not logged in
                </div>
            </div>
        )
    }



};

export default Profile;