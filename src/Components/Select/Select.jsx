import { useState, useEffect } from "react";
import { UPDATEFILTER } from "../../redux/types";
import { useLocation } from "react-router";
import { connect } from "react-redux";

const Select = (props) => {
  let location = useLocation();

  //hooks
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("id");
  const [msgError, setmsgError] = useState("");

  //handler
  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const selectHandler = (e) => {
    setSelect(e.target.value);
  };

  useEffect(() => {
    setSearch("");
    setSelect("id");
    setmsgError("");
  }, []);

  const submit = () => {
    let data = {
      filter: search,
      select: select,
    };

    if (search.length < 1) {
      setmsgError("Content cannot be empty");
    } else if (search <= 0) {
      setmsgError("Invalid content");
    } else {
      props.dispatch({ type: UPDATEFILTER, payload: data });
      setmsgError("");
    }
  };

  const reset = () => {
    props.dispatch({ type: UPDATEFILTER, payload: "" });
    setSearch("");
    setSelect("id");
    setmsgError("");
  };

  switch (location.pathname) {
    case "/movies":
      return (
        <div className="select">
          <div className="input">
            <input
              type="text"
              name="data"
              onChange={searchHandler}
              value={search}
              placeholder="Search"
            />
            <div className="error">{msgError}</div>
          </div>
          <div className="options">
            <select name="select" value={select} onChange={selectHandler}>
              <option value="id">Id</option>
              <option value="title">Title</option>
              <option value="genre">Genre</option>
              <option value="cast">Cast</option>
              <option value="city">City</option>
            </select>
          </div>
          <div className="buttons">
            <div className="btn" onClick={() => submit()}>
              Search
            </div>
            <div className="btn" onClick={() => reset()}>
              Reset
            </div>
          </div>
        </div>
      );

    case "/users":
      return (
        <div className="select">
          <input
            type="text"
            name="data"
            onChange={searchHandler}
            value={search}
            placeholder="Search"
          />
          <select name="select" value={select} onChange={selectHandler}>
            <option value="id">Id</option>
            <option value="city">City</option>
          </select>
          <div className="btn" onClick={() => submit()}>
            Search
          </div>
          <div className="btn" onClick={() => reset()}>
            Reset
          </div>
          <div className="error">{msgError}</div>
        </div>
      );

    case "/orders":
      return (
        <div className="select">
          <input
            type="text"
            name="data"
            onChange={searchHandler}
            value={search}
            placeholder="Search"
          />
          <select name="select" value={select} onChange={selectHandler}>
            <option value="id">Id</option>
            <option value="userId">UserId</option>
          </select>
          <div className="btn" onClick={() => submit()}>
            Search
          </div>
          <div className="btn" onClick={() => reset()}>
            Reset
          </div>
          <div className="error">{msgError}</div>
        </div>
      );

    default:
      break;
  }
};

export default connect((state) => ({
  data: state.data,
}))(Select);
