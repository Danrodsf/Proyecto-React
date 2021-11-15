import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';

const Movie = (props) => {

    let token = {

        headers: { Authorization: `Bearer ${props.credentials.token}` }

    };

    const [movie, setMovie] = useState(JSON.parse(localStorage.getItem("ChoosenMovie")))
    const [msgError, setmsgError] = useState("");

    const createOrder = async () => {

        let body = {

            userId: props.credentials.user.id,
            movieId: movie.id

        }

        if (props.credentials.user.city !== movie.city) {

            setmsgError('This movie is not available to rent in your city')

        } else {

            try {

                await axios.post("https://drs-proyecto-api.herokuapp.com/orders", body, token);
                setmsgError('Movie Rented')

            } catch (error) {

                setmsgError(msgError);
                return;

            }

        }

    }

    if (props.credentials?.user?.name) {

        return (

            <div className="view">
                <div className="container">
                    <div className="movie">
                        <h2>{JSON.stringify(movie.title)}</h2>
                        <p>{movie.genre}</p>
                        <p>{movie.cast}</p>
                        <p>{movie.city}</p>
                        <button onClick={() => createOrder()}>Rent</button>
                        <div>{msgError}</div>
                    </div>
                </div>
            </div>
        )

    } else {

        return (
            <div className="view">
                <div className="container">
                    <div className="movie">
                        <h2>{JSON.stringify(movie.title)}</h2>
                        <p>{movie.genre}</p>
                        <p>{movie.cast}</p>
                        <p>{movie.city}</p>
                    </div>
                </div>
            </div>
        )
    }

};

export default connect((state) => ({
    credentials: state.credentials
}))(Movie);