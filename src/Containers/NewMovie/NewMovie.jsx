import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';

const NewMovie = (props) => {

    let token = {

        headers: { Authorization: `Bearer ${props.credentials.token}` }

    };

    const [data, setData] = useState({

        title: null,
        genre: null,
        cast: null,
        city: null

    });

    const [msgError, setmsgError] = useState("");

    const userHandler = (e) => {

        setData({ ...data, [e.target.name]: e.target.value })

    }

    const addMovie = async () => {

        let body = {

            title: data.title,
            genre: data.genre,
            cast: data.cast,
            city: data.city
        }

        try {

            await axios.post("https://drs-proyecto-api.herokuapp.com/movies", body, token);
            setmsgError('Movie Rented')

        } catch (error) {

            setmsgError(msgError);
            return;

        }

    }

    if (props.credentials?.user?.admin) {

        return (

            <div className="view">
                <div className="container">
                    <div className="newMovieInfo">
                        <div className="inputs">
                            Tilte: <input
                                type='text'
                                name='title'
                                title='title'
                                placeholder='Title'
                                lenght='30'
                                onChange={userHandler}
                            />
                            Genre:<input
                                type='text'
                                name='genre'
                                title='genre'
                                placeholder='Genre'
                                lenght='10'
                                onChange={userHandler}
                            />
                            Cast:<input
                                type='text'
                                name='cast'
                                title='cast'
                                placeholder='Cast'
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
                        </div>
                        <div className='btn' onClick={() => addMovie()}>
                            Register
                        </div>
                        <div className='error'>{msgError} </div>
                    </div>
                </div>
            </div>
        )

    } else {

        return (
            <div className="view">
                <div className="container">
                    <div className="newMovieInfo">
                        You need authorization to add a new movie
                    </div>
                </div>
            </div>
        )
    }

};

export default connect((state) => ({
    credentials: state.credentials
}))(NewMovie);