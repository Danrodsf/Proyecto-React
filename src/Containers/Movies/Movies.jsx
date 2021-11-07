import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Movies.css';

const GetMovies = () => {

    //HOOKS
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getAllMovies();
    }, [])

    useEffect(() => {
        console.log(movies)
    })

    const getAllMovies = async () => {
        let res = await axios.get("https://drs-proyecto-api.herokuapp.com/movies/");
        setMovies((res.data));
    }

    return (
        <div className="moviesView">
            {movies.map((movie) => {
                return <div key={movie.id} className="movies">
                    <h4>Movie Number: {JSON.stringify(movie.id)}</h4>
                    <h2>{JSON.stringify(movie.title)}</h2>
                    <p>Genre: {JSON.stringify(movie.genre)}</p>
                    <p>Available City: {JSON.stringify(movie.city)}</p>
                    <p>Cast: {JSON.stringify(movie.cast)}</p>
                </div>
            })}
        </div>
    )
}

export default GetMovies;
