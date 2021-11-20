import axios from "axios";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { UPDATEMOVIES } from "../../redux/types";
import React, { useState, useEffect } from "react";
import Select from "../../Components/Select/Select";

const GetMovies = (props) => {
  let navigate = useNavigate();

  let token = {
    headers: { Authorization: `Bearer ${props.credentials.token}` },
  };

  //HOOKS
  const [movies, setMovies] = useState([]);
  const [msgError, setmsgError] = useState("");

  useEffect(() => {
    if (props.data.filter.filter) {
      return;
    } else {
      setTimeout(() => {
        getAllMovies();
      }, 2000);
    }
  }, []);

  useEffect(() => {
    if (props.credentials.token !== "") {
      if (props.data.filter.select) {
        switch (props.data.filter.select) {
          case "id":
            getMovieById(props.data.filter.filter);
            break;
          case "title":
            getMovieByTitle(props.data.filter.filter);
            break;
          case "genre":
            getMovieByGenre(props.data.filter.filter);
            break;
          case "cast":
            getMovieByCast(props.data.filter.filter);
            break;
          case "city":
            getMovieByCity(props.data.filter.filter);
            break;

          default:
            break;
        }
      } else if (props.data.filter[0]) {
        setMovies(props.data.filter);
      } else {
        setMovies(props.data.movies);
        setmsgError("");
      }
    } else if (props.data.filter[0]) {
      setMovies(props.data.filter);
    } else {
      setMovies(props.data.movies);
      setmsgError("");
    }
  }, [props.data.filter, props.data.movies]);

  const getAllMovies = async () => {
    try {
      let res = await axios.get(
        "https://drs-proyecto-api.herokuapp.com/movies"
      );
      setMovies(res.data);
      props.dispatch({ type: UPDATEMOVIES, payload: res.data });
    } catch (error) {
      setmsgError("Cannot get Movies");
    }
  };

  const getMovieById = async (id) => {
    try {
      let res = await axios.get(
        `https://drs-proyecto-api.herokuapp.com/movies/${id}`,
        token
      );
      setMovies([res.data]);
      setmsgError(`Movie Found`);
    } catch (error) {
      setmsgError(`No movie Found`);
    }
  };

  const getMovieByTitle = async (title) => {
    try {
      let res = await axios.get(
        `https://drs-proyecto-api.herokuapp.com/movies/name/${title}`,
        token
      );
      if (res.data.length === 0) {
        setmsgError(`No movie Found`);
      } else {
        setMovies(res.data);
        setmsgError(`Found ${res.data.length} movies`);
      }
    } catch (error) {
      setmsgError(`${error}`);
      console.log(`${error.message}`);
    }
  };

  const getMovieByCast = async (cast) => {
    try {
      let res = await axios.get(
        `https://drs-proyecto-api.herokuapp.com/movies/cast/${cast}`,
        token
      );
      if (res.data.length === 0) {
        setmsgError(`No movie Found`);
      } else {
        setMovies(res.data);
        setmsgError(`Found ${res.data.length} movies`);
      }
    } catch (error) {
      setmsgError(`No movie Found`);
      console.log(`${error.message}`);
    }
  };

  const getMovieByGenre = async (genre) => {
    try {
      let res = await axios.get(
        `https://drs-proyecto-api.herokuapp.com/movies/genre/${genre}`,
        token
      );
      if (res.data.length === 0) {
        setmsgError(`No movie Found`);
      } else {
        setMovies(res.data);
        setmsgError(`Found ${res.data.length} movies`);
      }
    } catch (error) {
      setmsgError(`No movie Found`);
      console.log(`${error.message}`);
    }
  };

  const getMovieByCity = async (city) => {
    try {
      let res = await axios.get(
        `https://drs-proyecto-api.herokuapp.com/movies/city/${city}`,
        token
      );
      if (res.data.length === 0) {
        setmsgError(`No movie Found`);
      } else {
        setMovies(res.data);
        setmsgError(`Found ${res.data.length} movies`);
      }
    } catch (error) {
      setmsgError(`No movie Found`);
      console.log(`${error.message}`);
    }
  };

  const addNewMovie = async () => {
    navigate("/newmovie");
  };

  const chooseMovie = (chosenMovie) => {
    localStorage.setItem("ChoosenMovie", JSON.stringify(chosenMovie));
    navigate("/movie");
  };

  const deleteMovie = async (id) => {
    try {
      await axios.delete(
        `https://drs-proyecto-api.herokuapp.com/movies/${id}`,
        token
      );
      setmsgError("Movie Deleted");
    } catch (error) {
      setmsgError(`${error}`);
    }
  };

  const deleteAlert = async (e) => {
    if (window.confirm("Are you sure you wish to delete this Movie?")) {
      await deleteMovie(e);
      await getAllMovies();
    } else {
      return;
    }
  };

  if (movies[0]?.title) {
    if (props.credentials?.user?.admin) {
      return (
        <div className="view">
          <div className="container">
            <div className="movieNav">
              <div className="btn" onClick={() => addNewMovie()}>
                Add New Movie
              </div>
              <Select />
              <div className="error">{msgError}</div>
            </div>
            <div className="movieInfo">
              {movies.map((movie) => {
                return (
                  <div key={movie.id} className="movies">
                    <h3 className="posters" onClick={() => chooseMovie(movie)}>
                      {movie.title}
                    </h3>
                    <div className="btn" onClick={() => deleteAlert(movie.id)}>
                      Delete
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    } else if (props.credentials?.user?.id) {
      return (
        <div className="view">
          <div className="container">
            <div className="movieNav">
              <Select />
              <div className="error">{msgError}</div>
            </div>
            <div className="movieInfo">
              {movies.map((movie) => {
                return (
                  <div key={movie.id} className="movies">
                    <h3 className="posters" onClick={() => chooseMovie(movie)}>
                      {movie.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="view">
          <div className="container">
            <div className="movieInfo">
              {movies.map((movie) => {
                return (
                  <div key={movie.id} className="movies">
                    <h3 className="posters" onClick={() => chooseMovie(movie)}>
                      {movie.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="view">
        <div className="container">
          <div className="dank-ass-loader">
            <div className="row">
              <div className="arrow up outer outer-18"></div>
              <div className="arrow down outer outer-17"></div>
              <div className="arrow up outer outer-16"></div>
              <div className="arrow down outer outer-15"></div>
              <div className="arrow up outer outer-14"></div>
            </div>
            <div className="row">
              <div className="arrow up outer outer-1"></div>
              <div className="arrow down outer outer-2"></div>
              <div className="arrow up inner inner-6"></div>
              <div className="arrow down inner inner-5"></div>
              <div className="arrow up inner inner-4"></div>
              <div className="arrow down outer outer-13"></div>
              <div className="arrow up outer outer-12"></div>
            </div>
            <div className="row">
              <div className="arrow down outer outer-3"></div>
              <div className="arrow up outer outer-4"></div>
              <div className="arrow down inner inner-1"></div>
              <div className="arrow up inner inner-2"></div>
              <div className="arrow down inner inner-3"></div>
              <div className="arrow up outer outer-11"></div>
              <div className="arrow down outer outer-10"></div>
            </div>
            <div className="row">
              <div className="arrow down outer outer-5"></div>
              <div className="arrow up outer outer-6"></div>
              <div className="arrow down outer outer-7"></div>
              <div className="arrow up outer outer-8"></div>
              <div className="arrow down outer outer-9"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
  data: state.data,
}))(GetMovies);
