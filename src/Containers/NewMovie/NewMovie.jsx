import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import FormInput from "../../Components/FormInputs/FormInputs";

const NewMovie = (props) => {
  let token = {
    headers: { Authorization: `Bearer ${props.credentials.token}` },
  };

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

  const [msgError, setmsgError] = useState("");

  const inputHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie();
  };

  const addMovie = async () => {
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
      await axios.post(
        "https://drs-proyecto-api.herokuapp.com/movies",
        body,
        token
      );
      setmsgError("Movie Added");
    } catch (error) {
      setmsgError(msgError);
      return;
    }
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

  if (props.credentials?.user?.admin) {
    return (
      <div className="view">
        <div className="container">
          <div className="newMovieInfo">
            <form onSubmit={handleSubmit}>
              <h1>Add New Movie</h1>
              {inputs.map((input) => (
                <FormInput key={input.id} {...input} onChange={inputHandler} />
              ))}
              <button className="btnOrange">Submit</button>
            </form>
            <div>{msgError}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="view">
        <div className="container">
          <div className="newMovieInfo">
            You need authorization to add a new movie
          </div>
        </div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
}))(NewMovie);
