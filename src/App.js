import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Containers/Home/Home';
import Register from './Containers/Register/Register';
import Profile from './Containers/Profile/Profile';
import Movies from './Containers/Movies/Movies';
import Movie from './Containers/Movie/Movie';
import Users from './Containers/Users/Users';
import Orders from './Containers/Orders/Orders';
import './App.scss';
import './scss/main.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/users" element={<Users />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/orders" element={<Orders />} />

        </Routes>

        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
