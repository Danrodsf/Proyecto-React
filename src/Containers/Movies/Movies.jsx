import axios from "axios";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { UPDATEMOVIES, SETSTATE } from "../../redux/types";
import React, { useState, useEffect } from "react";
import Select from "../../Components/Select/Select";
import FormInput from "../../Components/FormInputs/FormInputs";

const GetMovies = (props) => {
  let navigate = useNavigate();

  let token = {
    headers: { Authorization: `Bearer ${props.credentials.token}` },
  };

  let url = "https://image.tmdb.org/t/p/original/";

  //HOOKS
  const [movies, setMovies] = useState([]);
  const [msgError, setmsgError] = useState("");
  const [data, setData] = useState({
    title: "",
    genre: "",
    cast: "",
    city: "",
    overview: "",
    releaseDate: "",
    rating: "",
    posterPath: "",
    backdropPath: "",
  });

  const inputHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovie(props.state.id);
  };

  useEffect(() => {
    getAllMovies();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
  }, [props.data.filter, props.data.movies]); // eslint-disable-line react-hooks/exhaustive-deps

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
      setmsgError("Movie Found");
    } catch (error) {
      setmsgError("No movie Found");
    }
  };

  const getMovieByTitle = async (title) => {
    try {
      let res = await axios.get(
        `https://drs-proyecto-api.herokuapp.com/movies/name/${title}`,
        token
      );
      if (res.data.length === 0) {
        setmsgError("No movie Found");
      } else {
        setMovies(res.data);
        setmsgError(`Found ${res.data.length} movies`);
      }
    } catch (error) {
      setmsgError("No movie Found");
    }
  };

  const getMovieByCast = async (cast) => {
    try {
      let res = await axios.get(
        `https://drs-proyecto-api.herokuapp.com/movies/cast/${cast}`,
        token
      );
      if (res.data.length === 0) {
        setmsgError("No movie Found");
      } else {
        setMovies(res.data);
        setmsgError(`Found ${res.data.length} movies`);
      }
    } catch (error) {
      setmsgError("No movie Found");
    }
  };

  const getMovieByGenre = async (genre) => {
    try {
      let res = await axios.get(
        `https://drs-proyecto-api.herokuapp.com/movies/genre/${genre}`,
        token
      );
      if (res.data.length === 0) {
        setmsgError("No movie Found");
      } else {
        setMovies(res.data);
        setmsgError(`Found ${res.data.length} movies`);
      }
    } catch (error) {
      setmsgError("No movie Found");
    }
  };

  const getMovieByCity = async (city) => {
    try {
      let res = await axios.get(
        `https://drs-proyecto-api.herokuapp.com/movies/city/${city}`,
        token
      );
      if (res.data.length === 0) {
        setmsgError("No movie Found");
      } else {
        setMovies(res.data);
        setmsgError(`Found ${res.data.length} movies`);
      }
    } catch (error) {
      setmsgError("No movie Found");
      console.log(`${error.message}`);
    }
  };

  const updateMovie = async (id) => {
    let body = {
      title: data.title,
      genre: data.genre,
      cast: data.cast,
      city: data.city,
      overview: data.overview,
      releaseDate: data.releaseDate,
      rating: data.rating,
      posterPath: data.posterPath,
      backdropPath: data.backdropPath,
    };
    try {
      await axios.put(
        `https://drs-proyecto-api.herokuapp.com/movies/${id}`,
        body,
        token
      );
      setmsgError("Movie Updated");
      returnInitalState();
    } catch (error) {
      setmsgError("Movie Couldn't be Updated");
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

  const editBtn = (id) => {
    let data = {
      change: 1,
      id: id,
    };
    props.dispatch({ type: SETSTATE, payload: data });
  };

  const returnInitalState = () => {
    let data = {
      change: 0,
    };
    props.dispatch({ type: SETSTATE, payload: data });
    setmsgError("");
    getAllMovies();
  };

  const inputs = [
    {
      id: 1,
      name: "title",
      type: "text",
      placeholder: "Title",
      errorMessage: "Title should be 3-36 characters",
      label: "Title",
      pattern: "^.{3,36}$",
      required: true,
    },
    {
      id: 2,
      name: "genre",
      type: "text",
      placeholder: "genre",
      errorMessage:
        "Valid Genres are: Action|Adventure|Fantasy|Sci-fi (Case Sensitive)",
      label: "Genre",
      pattern: "Action|Adventure|Fantasy|Sci-fi",
      required: true,
    },
    {
      id: 3,
      name: "city",
      type: "text",
      placeholder: "City",
      errorMessage:
        "We are currently available only in Valencia, Madrid or Zaragoza",
      label: "City",
      pattern: "Valencia|Madrid|Zaragoza",
      required: true,
    },
    {
      id: 4,
      name: "cast",
      type: "text",
      placeholder: "Cast",
      errorMessage:
        "Cast should be 3-26 characters and shouldn't include any special character!",
      label: "Cast",
      pattern: "^[A-Za-z0-9 ]{3,26}$",
      required: true,
    },
    {
      id: 5,
      name: "overview",
      type: "text",
      placeholder: "overview",
      errorMessage: "Overview should be 10-255 characters",
      label: "Overview",
      pattern: "^.{10,255}$",
      required: true,
    },
    {
      id: 6,
      name: "rating",
      type: "number",
      placeholder: "rating",
      errorMessage: "Rating should be 1-4 characters and must be only Numbers",
      label: "Rating",
      pattern: "^[0-9]{1,4}$",
      step: "0.01",
      min: "0",
      max: "10",
      required: true,
    },
    {
      id: 7,
      name: "releaseDate",
      type: "date",
      placeholder: "Release Date",
      errorMessage:
        "ReleaseDate should be 1-4 characters and must be only Numbers",
      label: "Release Date",
      required: true,
    },
    {
      id: 8,
      name: "posterPath",
      type: "text",
      placeholder: "Poster Path",
      errorMessage: "Poster Path should be 5-50 characters",
      label: "Poster Path",
      pattern: "^.{10,50}$",
      required: true,
    },
    {
      id: 9,
      name: "backdropPath",
      type: "text",
      placeholder: "Backdrop Path",
      errorMessage: "Backdrop Path should be 5-50 characters",
      label: "Backdrop Path",
      pattern: "^.{10,50}$",
      required: true,
    },
  ];

  if (movies[0]?.title) {
    if (props.credentials?.user?.admin) {
      if (props.state.change === 1) {
        return (
          <div className="view">
            <div className="container">
              <div className="editInfo">
                <form onSubmit={handleSubmit}>
                  <h1>Edit Movie</h1>
                  {inputs.map((input) => (
                    <FormInput
                      key={input.id}
                      {...input}
                      onChange={inputHandler}
                    />
                  ))}
                  <button className="btnOrange">Submit</button>
                  <div
                    className="btnOrange"
                    onClick={() => returnInitalState()}
                  >
                    go back
                  </div>
                </form>
                <div>{msgError}</div>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className="view">
          <div className="container">
            <div className="movieNav">
              <div className="btnOrange" onClick={() => addNewMovie()}>
                Add New Movie
              </div>
              <Select />
              <div className="error">{msgError}</div>
            </div>
            <div className="movieInfo">
              {movies.map((movie) => {
                return (
                  <div key={movie.id} className="movieContainer">
                    <div className="movies">
                      <img
                        alt={movie.id}
                        className="poster"
                        loading="lazy"
                        onClick={() => chooseMovie(movie)}
                        src={`${url}${movie.posterPath}`}
                      />
                    </div>
                    <div className="buttons">
                      <div
                        className="btnOrange"
                        onClick={() => editBtn(movie.id)}
                      >
                        Update
                      </div>
                      <div
                        className="btnOrange"
                        onClick={() => deleteAlert(movie.id)}
                      >
                        Delete
                      </div>
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
                  <div key={movie.id} className="movieContainer">
                    <div className="movies">
                      <img
                        alt={movie.id}
                        className="poster"
                        onClick={() => chooseMovie(movie)}
                        src={`${url}${movie.posterPath}`}
                      />
                    </div>
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
                  <div key={movie.id} className="movieContainer">
                    <div className="movies">
                      <img
                        alt={movie.id}
                        className="poster"
                        onClick={() => chooseMovie(movie)}
                        src={`${url}${movie.posterPath}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  } else if (!msgError) {
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
  } else {
    return (
      <div className="view">
        <div className="container">{msgError}</div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
  state: state.state,
  data: state.data,
}))(GetMovies);
