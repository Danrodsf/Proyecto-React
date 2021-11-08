import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Movies.css';

const GetMovies = () => {

    let navigate = useNavigate();

    //HOOKS
    const [movies, setMovies] = useState([]);

    useEffect(() => {

        setTimeout(() => {

            getAllMovies();

        }, 2000);

    }, [])

    useEffect(() => {

        console.log(movies)

    })

    const getAllMovies = async () => {

        let res = await axios.get("https://drs-proyecto-api.herokuapp.com/movies/");
        setMovies((res.data));
    }

    const chooseMovie = (chosenMovie) => {

        localStorage.setItem("ChoosenMovie", JSON.stringify(chosenMovie));
        navigate("/movie");

    }

    if (movies[1]?.title) { //el " ? " sirve para que no se detenga mientras no encuentre el array
        return (
            <div className="moviesView">
                <div className="container">
                    {movies.map((movie) => {
                        return <div key={movie.id} className="movies" onClick={() => chooseMovie(movie)} >
                            <h4>Movie Number: {JSON.stringify(movie.id)}</h4>
                            <h2>{JSON.stringify(movie.title)}</h2>
                            <p>Genre: {JSON.stringify(movie.genre)}</p>
                            <p>Available City: {JSON.stringify(movie.city)}</p>
                            <p>Cast: {JSON.stringify(movie.cast)}</p>
                        </div>
                    })}
                </div>

            </div>
        )
    } else {
        return (
            <div className="moviesView">
                <div className="container">
                    Buscando peliculas
                </div>
            </div>
        )
    }

}

export default GetMovies;
