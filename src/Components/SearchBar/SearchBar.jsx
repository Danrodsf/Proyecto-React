import { useState } from "react";
import { UPDATEFILTER } from "../../redux/types";
import { useLocation } from "react-router";
import { connect } from "react-redux";

const SearchBar = (props) => {

    let location = useLocation();
    //hooks
    const [search, setSearch] = useState('');

    //handler
    const searchHandler = (e) => {
        setSearch(e.target.value)
    }

    const submit = () => {

        switch (location.pathname) {
            case '/movies':
                let filteredMovies = props.data?.movies?.filter((movie) => movie?.title?.toLowerCase().startsWith(search));
                props.dispatch({ type: UPDATEFILTER, payload: filteredMovies })
                break;
            case '/users':
                let filteredUsers = props.data?.users?.filter((user) => user?.name?.toLowerCase().startsWith(search));
                props.dispatch({ type: UPDATEFILTER, payload: filteredUsers })
                break;
            case '/orders':
                let filteredOrders = props.data?.orders?.filter((order) => (order?.user?.name?.toLowerCase().startsWith(search) || order.user.name.toLowerCase().startsWith(search)));
                props.dispatch({ type: UPDATEFILTER, payload: filteredOrders })
                break;

            default:
                break;
        }
    }

    const reset = () => {

        props.dispatch({ type: UPDATEFILTER, payload: '' });

    };

    return (

        <div>
            <input type="text" name='data' onChange={searchHandler} value={search} placeholder="Search" />
            <div className="btn" onClick={() => submit()}>Search</div>
            <div className="btn" onClick={() => reset()}>Reset</div>
        </div>

    );

}

export default connect((state) => ({
    data: state.data
}))(SearchBar);
