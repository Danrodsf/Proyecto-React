import { connect } from "react-redux";
import logo from "../../img/logo.png";

const Home = (props) => {
  if (props.state.change <= 1) {
    return (
      <div className="view">
        <div className="container">
          <div className="logo">
            <img className="logopng" src={logo} alt="logo" />
            <h1>MovieAPP</h1>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="view">
        <div className="container">
          <div className="dank-ass-loader">
            <div className="row">
              <div className="arrow up outer outer-18"></div>
              <div className="arrow down outer outer-17"></div>
              <div className="arrow up outer outer-16"></div>
              <div className="arrow down outer outer-15"></div>
              <div className="arrow up outer outer-14"></div>
            </div>
            <div className="row">
              <div className="arrow up outer outer-1"></div>
              <div className="arrow down outer outer-2"></div>
              <div className="arrow up inner inner-6"></div>
              <div className="arrow down inner inner-5"></div>
              <div className="arrow up inner inner-4"></div>
              <div className="arrow down outer outer-13"></div>
              <div className="arrow up outer outer-12"></div>
            </div>
            <div className="row">
              <div className="arrow down outer outer-3"></div>
              <div className="arrow up outer outer-4"></div>
              <div className="arrow down inner inner-1"></div>
              <div className="arrow up inner inner-2"></div>
              <div className="arrow down inner inner-3"></div>
              <div className="arrow up outer outer-11"></div>
              <div className="arrow down outer outer-10"></div>
            </div>
            <div className="row">
              <div className="arrow down outer outer-5"></div>
              <div className="arrow up outer outer-6"></div>
              <div className="arrow down outer outer-7"></div>
              <div className="arrow up outer outer-8"></div>
              <div className="arrow down outer outer-9"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
  state: state.state,
}))(Home);
