import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loading from '../../img/loading.gif'

const GetMovies = () => {

    let navigate = useNavigate();

    //HOOKS
    const [movies, setMovies] = useState([]);
    const [msgError, setmsgError] = useState("");

    useEffect(() => {

        setTimeout(() => {

            getAllMovies();

        }, 1000);

    }, [])

    useEffect(() => {

        console.log(movies)

    })

    const getAllMovies = async () => {

        try {

            let res = await axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=51c1099989a6923f3d12154210fc2cf7&language=en-US&page=1");
            setMovies((res.data.results));

        } catch (error) {

            setmsgError("Cannot get Movies");
            return;

        }
    }

    const chooseMovie = (chosenMovie) => {

        localStorage.setItem("ChoosenMovie", JSON.stringify(chosenMovie));
        navigate("/movie");

    }

    if (movies[1]?.title) { //el " ? " sirve para que no se detenga mientras no encuentre el array

        return (
            <div className="view">
                <div className="container">
                    {movies.map((movie) => {

                        return (
                            <div key={movie.id} className="movies">
                                <img alt={movie.id} className="posters" onClick={() => chooseMovie(movie)} src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
                            </div>
                        )
                    })}

                </div>
            </div>
        )
    } else if (msgError) {

        return (
            <div className="view">
                <div className="container" >
                    {msgError}
                </div>
            </div>
        )

    } else {

        return (
            <div className="view">
                <div className="container">
                    <img src={loading} alt="Loading" />
                </div>
            </div>
        )
    }

}

export default GetMovies;
