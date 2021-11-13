import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { UPDATEMOVIES } from '../../redux/types';
import React, { useState, useEffect } from 'react';
import loading from '../../img/loading.gif'

const GetMovies = (props) => {

    let navigate = useNavigate();

    //HOOKS
    const [movies, setMovies] = useState([]);
    const [msgError, setmsgError] = useState("");

    useEffect(() => {

        getAllMovies();

    }, [])

    useEffect(() => {

        if (props.data.filter !== '') {

            setMovies(props.data.filter)

        } else {

            setMovies(props.data.movies)
        }

    }, [props.data.filter, props.data.movies])

    const getAllMovies = async () => {

        try {

            let res = await axios.get("https://drs-proyecto-api.herokuapp.com/movies");
            setMovies((res.data));

            props.dispatch({ type: UPDATEMOVIES, payload: res.data });

        } catch (error) {

            setmsgError("Cannot get Movies");
            return;

        }

    }

    const chooseMovie = (chosenMovie) => {

        localStorage.setItem("ChoosenMovie", JSON.stringify(chosenMovie));
        navigate("/movie");

    }

    if (movies[0]?.title) { //el " ? " sirve para que no se detenga mientras no encuentre el array

        return (
            <div className="view">
                <div className="container">
                    {movies.map((movie) => {
                        return (
                            <div key={movie.id} className="movies">
                                <h3 className="posters" onClick={() => chooseMovie(movie)}>{movie.title}</h3>
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

    } else if (movies.length === 0) {

        return (
            <div className="view">
                <div className="container">
                    No movie Found
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

export default connect((state) => ({
    data: state.data
}))(GetMovies);
