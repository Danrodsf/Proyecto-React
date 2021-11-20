import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import FormInput from "../../Components/FormInputs/FormInputs";

const NewMovie = (props) => {
  let token = {
    headers: { Authorization: `Bearer ${props.credentials.token}` },
  };

  const [data, setData] = useState({
    title: null,
    genre: null,
    cast: null,
    city: null,
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
        "Valid Genres are: Action|Drama|Horror|Romance|Comedy|Thriller|Sci-fi|Adventure|Crime|Fantasy",
      label: "Genre",
      pattern:
        "Action|action|Drama|drama|Horror|horror|Romance|romance|Comedy|comedy|Thriller|thriller|Sci-fi|sci-fi|Adventure|adventure|Crime|crime|Fantasy|fantasy",
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
      pattern: "Valencia|valencia|Madrid|madrid|Zaragoza|zaragoza",
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
