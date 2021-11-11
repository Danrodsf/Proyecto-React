import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';

const Movie = (props) => {

    let genre = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Science Fiction",
        10770: "TV Movie",
        53: "Thriller",
        10752: "War",
        37: "Western"
    }

    const [movie, setMovie] = useState(JSON.parse(localStorage.getItem("ChoosenMovie")))
    const [msgError, setmsgError] = useState("");

    let token = props.credentials.token;
    let config = {

        headers: { Authorization: `Bearer ${token}` }

    };

    const createOrder = async () => {
        console.log(props.credentials.user.id)
        console.log(movie.id)
        let body = {
            userId: props.credentials.user.id,
            movieId: movie.id
        }

        try {

            let res = await axios.post("https://drs-proyecto-api.herokuapp.com/orders", body, config);
            setmsgError(res.data.error || res.data.message)
            console.log(msgError)

        } catch (error) {

            setmsgError(msgError);
            return;

        }
    }

    if (props.credentials?.user?.name) {
        return (
            <div className="view">
                <div className="movie_container">
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
                <div className="movie_container">
                    <div className="movie">
                        <h2>{JSON.stringify(movie.title)}</h2>
                        <p>Release Date: {JSON.stringify(movie.release_date)}</p>
                        <p>Vote Avg: {JSON.stringify(movie.vote_average)}</p>
                    </div>
                </div>
            </div>
        )
    }

};

export default connect((state) => ({
    credentials: state.credentials
}))(Movie);