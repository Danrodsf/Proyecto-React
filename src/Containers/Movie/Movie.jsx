import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";

const Movie = (props) => {
  let token = {
    headers: { Authorization: `Bearer ${props.credentials.token}` },
  };

  let url = "https://image.tmdb.org/t/p/original/";

  const [movie, setMovie] = useState(
    JSON.parse(localStorage.getItem("ChoosenMovie"))
  );
  const [msgError, setmsgError] = useState("");

  const createOrder = async () => {
    let body = {
      userId: props.credentials.user.id,
      movieId: movie.id,
    };

    if (props.credentials.user.city !== movie.city) {
      setmsgError("This movie is not available to rent in your city");
    } else {
      try {
        await axios.post(
          "https://drs-proyecto-api.herokuapp.com/orders",
          body,
          token
        );
        setmsgError("Movie Rented");
      } catch (error) {
        setmsgError(msgError);
        return;
      }
    }
  };

  const formatDate = (initialDate) => {
    let splitDate = initialDate.split(/[- : T .]/);
    let arrayDate = [splitDate[2], splitDate[1], splitDate[0]];
    let formattedDate = arrayDate.join("-");
    return formattedDate;
  };

  if (props.credentials?.user?.name) {
    return (
      <div className="view">
        <div className="container">
          <div
            className="background"
            style={{ backgroundImage: `url("${url + movie.backdropPath}")` }}
          >
            <div className="infoContainer">
              <img
                className="poster"
                src={`${url}${movie.posterPath}`}
                alt=""
              />
              <div className="info">
                <h2>{movie.title}</h2>
                <p>Genre: {movie.genre}</p>
                <p>Rating: {movie.rating}</p>
                <p>Cast: {movie.cast}</p>
                <p>Available City: {movie.city}</p>
                <p>Overview: {movie.overview}</p>
                <p>Release Date: {formatDate(movie.releaseDate)}</p>
                <div className="btnOrange" onClick={() => createOrder()}>
                  Rent
                </div>
              </div>
            </div>
          </div>
          <div className="error">{msgError}</div>
        </div>
      </div>
    );
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
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
}))(Movie);
