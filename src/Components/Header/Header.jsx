import { connect } from "react-redux";
import Button from "../Button/Button";
import Login from "../Login/Login";

const Header = (props) => {
  if (props.credentials?.user?.admin) {
    return (
      <div className="header">
        <div className="hcontainer">
          <div className="navbar">
            <Button view="HOME" url="/" />
            <Button view="MOVIES" url="/movies" />
            <Button view="USERS" url="/users" />
            <Button view="ORDERS" url="/orders" />
          </div>
          <div className="navlogin">
            <Login />
          </div>
        </div>
      </div>
    );
  } else if (props.credentials?.user?.name) {
    return (
      <div className="header">
        <div className="hcontainer">
          <div className="navbar">
            <Button view="HOME" url="/" />
            <Button view="MOVIES" url="/movies" />
          </div>
          <div className="navlogin">
            <Login />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="header">
        <div className="hcontainer">
          <div className="navbar">
            <Button view="HOME" url="/" />
            <Button view="REGISTER" url="/register" />
            <Button view="MOVIES" url="/movies" />
          </div>
          <div className="navlogin">
            <Login />
          </div>
        </div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
  state: state.state,
}))(Header);
