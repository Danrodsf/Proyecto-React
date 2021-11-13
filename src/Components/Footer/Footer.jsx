import SearchBar from "../SearchBar/SearchBar";
import { connect } from "react-redux";
import { useLocation } from 'react-router-dom';

const Footer = (props) => {

    let location = useLocation();

    switch (location.pathname) {
        case '/':
            return (
                <div className="footer">Home</div>
            )
        case '/movies':
            return (
                <div className="footer">
                    <SearchBar />
                </div>
            )
        case '/users':
            return (
                <div className="footer">
                    <SearchBar />
                </div>
            )
        case '/orders':
            return (
                <div className="footer">
                    <SearchBar />
                </div>
            )
        default:
            return (
                <div className="footer">footer</div>
            )
    }

};

export default connect()(Footer);