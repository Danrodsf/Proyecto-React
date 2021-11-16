import { useState } from "react";
import { UPDATEFILTER } from "../../redux/types";
import { useLocation } from "react-router";
import { connect } from "react-redux";

const Select = (props) => {
  let location = useLocation();

  //hooks
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("id");

  //handler
  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const selectHandler = (e) => {
    setSelect(e.target.value);
  };

  const submit = () => {
    let data = {
      filter: search,
      select: select,
    };

    props.dispatch({ type: UPDATEFILTER, payload: data });
  };

  const reset = () => {
    props.dispatch({ type: UPDATEFILTER, payload: "" });
    setSearch("");
    setSelect("");
  };

  switch (location.pathname) {
    case "/movies":
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
            <option value="title">Title</option>
            <option value="genre">Genre</option>
            <option value="cast">Cast</option>
            <option value="city">City</option>
          </select>
          <div className="btn" onClick={() => submit()}>
            Search
          </div>
          <div className="btn" onClick={() => reset()}>
            Reset
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
        </div>
      );

    default:
      break;
  }
};

export default connect((state) => ({
  data: state.data,
}))(Select);
