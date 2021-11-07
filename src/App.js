import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Containers/Home/Home';
import Header from './Components/Header/Header';
import Login from './Containers/Login/Login';
import Register from './Containers/Register/Register';
import Footer from './Containers/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />

        </Routes>

        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
