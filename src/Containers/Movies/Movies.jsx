import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { UPDATEMOVIES } from '../../redux/types';
import React, { useState, useEffect } from 'react';
import loading from '../../img/loading.gif'
import Select from '../../Components/Select/Select'

const GetMovies = (props) => {

    let navigate = useNavigate();

    let token = {
        headers: { Authorization: `Bearer ${props.credentials.token}` }
    };

    //HOOKS
    const [movies, setMovies] = useState([]);
    const [msgError, setmsgError] = useState("");

    useEffect(() => {

        getAllMovies();

    }, [])

    useEffect(() => {

        if (props.credentials.token !== '') {

            if (props.data.filter.select) {

                switch (props.data.filter.select) {

                    case 'id':
                        getMovieById(props.data.filter.filter)
                        break;
                    case 'title':
                        getMovieByTitle(props.data.filter.filter)
                        break;
                    case 'genre':
                        getMovieByGenre(props.data.filter.filter)
                        break;
                    case 'cast':
                        getMovieByCast(props.data.filter.filter)
                        break;
                    case 'city':
                        getMovieByCity(props.data.filter.filter)
                        break;

                    default:
                        break;
                }

            } else if (props.data.filter[0]) {

                setMovies(props.data.filter)

            } else {

                setMovies(props.data.movies)
            }

        } else if (props.data.filter[0]) {

            setMovies(props.data.filter)

        } else {

            setMovies(props.data.movies)
        }

    }, [props.data.filter, props.data.movies])

    const getAllMovies = async () => {

        try {

            let res = await axios.get("https://drs-proyecto-api.herokuapp.com/movies");
            setMovies(res.data);

            props.dispatch({ type: UPDATEMOVIES, payload: res.data });

        } catch (error) {

            setmsgError("Cannot get Movies");
            return;

        }

    }

    const getMovieById = async (id) => {

        let res = await axios.get(`https://drs-proyecto-api.herokuapp.com/movies/${id}`, token);
        setMovies(res.data);
        console.log(res.data);
    }

    const getMovieByTitle = async (title) => {
        let res = await axios.get(`https://drs-proyecto-api.herokuapp.com/movies/title/${title}`, token);
        setMovies(res.data);
        console.log(res.data);
    }

    const getMovieByCast = async (cast) => {
        let res = await axios.get(`https://drs-proyecto-api.herokuapp.com/movies/cast/${cast}`, token);
        setMovies(res.data);
        console.log(res.data);
    }

    const getMovieByGenre = async (genre) => {
        let res = await axios.get(`https://drs-proyecto-api.herokuapp.com/movies/genre/${genre}`, token);
        setMovies(res.data);
        console.log(res.data);
    }

    const getMovieByCity = async (city) => {
        let res = await axios.get(`https://drs-proyecto-api.herokuapp.com/movies/city/${city}`, token);
        setMovies(res.data);
        console.log(res.data);
    }

    const chooseMovie = (chosenMovie) => {

        localStorage.setItem("ChoosenMovie", JSON.stringify(chosenMovie));
        navigate("/movie");

    }

    if (movies[0]?.title) { //el " ? " sirve para que no se detenga mientras no encuentre el array

        return (
            <div className="view">
                <div className="container">
                    <div className="movieNav">
                        <Select name="Filter by:" />
                    </div>
                    <div className="movieInfo">
                        {movies.map((movie) => {
                            return (
                                <div key={movie.id} className="movies">
                                    <h3 className="posters" onClick={() => chooseMovie(movie)}>{movie.title}</h3>
                                </div>
                            )
                        })}
                    </div>
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
    credentials: state.credentials,
    data: state.data
}))(GetMovies);
