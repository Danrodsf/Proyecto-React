import { useState } from "react";
import { UPDATEFILTER } from "../../redux/types";
import { useLocation } from "react-router";
import { connect } from "react-redux";

const SearchBar = (props) => {
  let location = useLocation();

  //hooks
  const [search, setSearch] = useState("");
  const [msgError, setMsgError] = useState("");

  //handler
  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const submit = () => {
    switch (location.pathname) {
      case "/movies":
        let filteredMovies = props.data?.movies?.filter((movie) =>
          movie?.title?.toLowerCase().includes(search)
        );
        if (filteredMovies.length !== 0) {
          props.dispatch({ type: UPDATEFILTER, payload: filteredMovies });
          setMsgError(`Found ${filteredMovies.length} results`);
        } else {
          setMsgError("No movie found");
          console.log(msgError);
        }

        break;

      case "/users":
        let filteredUsers = props.data?.users?.filter((user) =>
          user?.name?.toLowerCase().startsWith(search)
        );
        if (filteredUsers.length !== 0) {
          props.dispatch({ type: UPDATEFILTER, payload: filteredUsers });
          setMsgError(`Found ${filteredUsers.length} results`);
        } else {
          setMsgError(`No User found`);
        }
        break;

      case "/orders":
        let filteredOrders = props.data?.orders?.filter(
          (order) =>
            order?.user?.name?.toLowerCase().startsWith(search) ||
            order.movie.title.toLowerCase().includes(search)
        );
        if (filteredOrders.length !== 0) {
          props.dispatch({ type: UPDATEFILTER, payload: filteredOrders });
          setMsgError(`Found ${filteredOrders.length} results`);
        } else {
          setMsgError("No Order found");
        }

        break;

      default:
        break;
    }
  };

  const reset = () => {
    props.dispatch({ type: UPDATEFILTER, payload: "" });
    setSearch("");
    setMsgError("");
  };

  switch (location.pathname) {
    case "/movies":
      return (
        <div className="searchBar">
          <div>{msgError}</div>
          <input
            type="text"
            name="data"
            onChange={searchHandler}
            value={search}
            placeholder="Search"
          />
          <div className="btn" onClick={() => submit()}>
            Search Movies
          </div>
          <div className="btn" onClick={() => reset()}>
            Reset
          </div>
        </div>
      );

    case "/users":
      return (
        <div className="searchBar">
          <div>{msgError}</div>
          <input
            type="text"
            name="data"
            onChange={searchHandler}
            value={search}
            placeholder="Search"
          />
          <div className="btn" onClick={() => submit()}>
            Search Users
          </div>
          <div className="btn" onClick={() => reset()}>
            Reset
          </div>
        </div>
      );

    case "/orders":
      return (
        <div className="searchBar">
          <div>{msgError}</div>
          <input
            type="text"
            name="data"
            onChange={searchHandler}
            value={search}
            placeholder="Search"
          />
          <div className="btn" onClick={() => submit()}>
            Search Orders
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
}))(SearchBar);
