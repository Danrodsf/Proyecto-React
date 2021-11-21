import SearchBar from "../SearchBar/SearchBar";
import { useLocation } from "react-router-dom";
import logo from "../../img/logo.png";

const Footer = () => {
  let location = useLocation();

  switch (location.pathname) {
    case "/":
    case "/register":
    case "/profile":
    case "/movie":
    case "/newmovie":
      return (
        <div className="footer">
          <div className="fcontainer">
            <div className="logo">
              <img className="logopng" src={logo} alt="logo" />
              <p>MovieApp</p>
            </div>
            <div className="copyright">
              <p>© COPYRIGHT 2021-2022 MOVIEAPP</p>
            </div>
            <div className="socialMedia">
              <div className="fa fa-facebook"></div>
              <div className="fa fa-twitter"></div>
              <div className="fa fa-google"></div>
              <div className="fa fa-instagram"></div>
              <div className="fa fa-android"></div>
            </div>
          </div>
        </div>
      );
    case "/movies":
      return (
        <div className="footer">
          <SearchBar />
        </div>
      );
    case "/users":
      return (
        <div className="footer">
          <SearchBar />
        </div>
      );
    case "/orders":
      return (
        <div className="footer">
          <SearchBar />
        </div>
      );
    default:
      return <div className="footer">footer</div>;
  }
};

export default Footer;
